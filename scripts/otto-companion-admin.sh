#!/usr/bin/env bash
# Otto Companion admin entrypoint — safe to wire into ~/.ssh/authorized_keys as
# a forced command so Otto's key can ONLY run these subcommands, never a shell.
#   command="$HOME/bin/otto-companion-admin.sh",no-port-forwarding,no-agent-forwarding,no-X11-forwarding,no-pty ssh-ed25519 ...
# Usage: otto-companion-admin.sh <deploy|update|restart|status|logs|smoke>
# When launched via an authorized_keys forced command, the subcommand arrives
# as SSH_ORIGINAL_COMMAND (what ssh passes is otherwise ignored).
set -uo pipefail
DIR="${OTTO_COMPANION_HOME:-$HOME/otto-companion}"
cmd="${1:-${SSH_ORIGINAL_COMMAND:-status}}"

start_app() {
  cd "$DIR"
  pkill -f "otto-companion/node_modules/electron" 2>/dev/null || true
  nohup npm start > /tmp/otto-companion.log 2>&1 &
}

case "$cmd" in
  deploy)
    if [ ! -d "$DIR/.git" ]; then
      if [ -n "${OTTO_BUNDLE_URL:-}" ]; then
        mkdir -p "$DIR"; curl -fsSL "$OTTO_BUNDLE_URL" | tar xz -C "$DIR" --strip-components=1
      else
        git clone "${OTTO_COMPANION_REPO:-https://github.com/jbotte/otto-companion.git}" "$DIR"
      fi
    else
      git -C "$DIR" pull --ff-only || true
    fi
    cd "$DIR" && npm install --include=dev --no-audit --no-fund && node test/smoke.js && start_app
    echo DEPLOYED
    ;;
  update)
    cd "$DIR" && git pull --ff-only && npm install --include=dev --no-audit --no-fund && node test/smoke.js && start_app
    echo UPDATED
    ;;
  restart) start_app; echo RESTARTED ;;
  status)
    pgrep -fl "otto-companion/node_modules/electron" || echo "not running"
    cat "$HOME/Library/Application Support/otto-companion/agent.json" 2>/dev/null || true
    ;;
  logs) tail -n 200 /tmp/otto-companion.log ;;
  smoke) cd "$DIR" && node test/smoke.js ;;
  *) echo "otto-companion-admin: usage: deploy|update|restart|status|logs|smoke"; exit 2 ;;
esac
