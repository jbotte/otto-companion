#!/usr/bin/env bash
# Otto Companion admin entrypoint — the REAL script; lives in the git repo and
# is invoked by the tiny shim at ~/bin/otto-companion-admin.sh (authorized_keys
# forced command). Improvements land via `git pull` in deploy/update.
# Accepts: deploy|update|restart|status|logs|smoke|doctor
set -uo pipefail
DIR="${OTTO_COMPANION_HOME:-$HOME/otto-companion}"
cmd="${1:-${SSH_ORIGINAL_COMMAND:-status}}"
case "$cmd" in deploy|update|restart|status|logs|smoke|doctor) : ;; *) echo "otto-companion-admin: usage: deploy|update|restart|status|logs|smoke|doctor"; exit 2 ;; esac

# ---- PATH bootstrap for locked-down forced-command sessions (non-login shell) ----
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"
for base in "$HOME/.nvm/versions/node" "$HOME/.fnm/node-versions" "$HOME/.local/share/fnm/node-versions"; do
  newest=$(ls -1 "$base" 2>/dev/null | sort -V | tail -1)
  [ -n "$newest" ] && PATH="$base/$newest/bin:$PATH"
done
for d in "$HOME/.volta/bin" "$HOME/.asdf/shims" "$HOME/.local/bin"; do [ -d "$d" ] && PATH="$d:$PATH"; done
export PATH

# ---- private Node fallback (no sudo, isolated to this project) ----
ensure_node() {
  command -v node >/dev/null 2>&1 && return 0
  local a ver url
  ver="v22.14.0"
  case "$(uname -m)" in arm64) a=arm64 ;; *) a=x64 ;; esac
  if [ ! -x "$DIR/.node/bin/node" ]; then
    echo "no system node found -> downloading private $ver ($a)"
    url="https://nodejs.org/dist/$ver/node-$ver-darwin-$a.tar.gz"
    curl -fsSL "$url" -o /tmp/otto-node.tgz || { echo "node download failed"; return 1; }
    mkdir -p "$DIR/.node" && tar xzf /tmp/otto-node.tgz -C "$DIR/.node" --strip-components=1 || return 1
  fi
  export PATH="$DIR/.node/bin:$PATH"
  command -v node >/dev/null 2>&1
}

start_app() {
  cd "$DIR"
  pkill -f "otto-companion/node_modules/electron" 2>/dev/null || true
  nohup npm start > /tmp/otto-companion.log 2>&1 &
}

case "$cmd" in
  deploy)
    if [ ! -d "$DIR/.git" ]; then
      git clone "${OTTO_COMPANION_REPO:-https://github.com/jbotte/otto-companion.git}" "$DIR" || exit 1
    else
      git -C "$DIR" fetch -q origin && git -C "$DIR" reset --hard -q origin/main
    fi
    ensure_node || exit 1
    cd "$DIR" && npm install --include=dev --no-audit --no-fund || exit 1
    node test/smoke.js || exit 1
    start_app
    echo DEPLOYED
    ;;
  update)
    git -C "$DIR" fetch -q origin && git -C "$DIR" reset --hard -q origin/main
    ensure_node || exit 1
    cd "$DIR" && npm install --include=dev --no-audit --no-fund && node test/smoke.js && start_app
    echo UPDATED
    ;;
  restart) ensure_node && start_app && echo RESTARTED ;;
  status)
    pgrep -fl "otto-companion/node_modules/electron" || echo "not running"
    cat "$HOME/Library/Application Support/otto-companion/agent.json" 2>/dev/null || true
    ;;
  logs) tail -n 200 /tmp/otto-companion.log ;;
  smoke) ensure_node && cd "$DIR" && node test/smoke.js ;;
  doctor)
    echo "dir=$DIR  node=$(command -v node || echo MISSING)  npm=$(command -v npm || echo MISSING)"
    echo "shim=$0"
    node -v 2>/dev/null || true
    ;;
esac
