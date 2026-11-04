#!/usr/bin/env bash
# Otto Companion — one-line installer for macOS (also works on Linux dev boxes)
# Usage:  bash <(curl -fsSL https://raw.githubusercontent.com/jbotte/otto-companion/main/scripts/install-mac.sh)
set -euo pipefail
REPO="${OTTO_COMPANION_REPO:-https://github.com/jbotte/otto-companion.git}"
DIR="${OTTO_COMPANION_HOME:-$HOME/otto-companion}"

echo "==> Installing Otto Companion into $DIR"
if [ -d "$DIR/.git" ]; then
  git -C "$DIR" pull --ff-only
else
  git clone "$REPO" "$DIR"
fi

cd "$DIR"
echo "==> npm install (electron is a devDep — --include=dev matters)"
npm install --include=dev --no-audit --no-fund

echo "==> smoke test (agent server + file share logic)"
node test/smoke.js

echo "==> launching Otto Companion (log: /tmp/otto-companion.log)"
pkill -f "otto-companion/node_modules/electron" 2>/dev/null || true
nohup npm start > /tmp/otto-companion.log 2>&1 &

sleep 2
if [ -d "$HOME/Library/Application Support/otto-companion" ]; then
  echo "==> Agent endpoint info:"
  cat "$HOME/Library/Application Support/otto-companion/agent.json" 2>/dev/null || true
  echo
fi
echo "Done. The Otto Companion window should be open on this Mac."
