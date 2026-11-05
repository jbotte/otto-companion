#!/usr/bin/env bash
# Pull the whole lawyertake2 site through the companion (each read pops an Allow dialog on the Mac).
set -u
cd "$(dirname "$0")/.."
export OTTO_AGENT_HOST=100.76.143.103
OUT=site-src/lawyertake2
mkdir -p "$OUT"
FILES="index.html css/styles.css js/data.js js/ui-core.js js/ui.js"
for f in $FILES; do
  mkdir -p "$OUT/$(dirname "$f")"
  echo "== $f"
  timeout 140 node tools/agent-cli.js fs.read "{\"folder\":\"6f2ecde5\",\"path\":\"$f\"}" \
    | node -e "let d='';process.stdin.on('data',c=>d+=c).on('end',()=>{try{const j=JSON.parse(d);require('fs').writeFileSync(process.argv[1],j.content)}catch(e){console.error('FAIL',String(e.message||e))}})" "$OUT/$f" 2>&1
done
# discover + fetch js/sections/*
timeout 60 node tools/agent-cli.js fs.list '{"folder":"6f2ecde5","path":"js/sections"}' > /tmp/sections.json 2>/dev/null
node -e "
const j=JSON.parse(require('fs').readFileSync('/tmp/sections.json','utf8'));
console.log((j.entries||[]).filter(e=>!e.dir).map(e=>'js/sections/'+e.name).join('\n'));
" > /tmp/section-files.txt
while read -r f; do
  [ -z "$f" ] && continue
  mkdir -p "$OUT/$(dirname "$f")"
  echo "== $f"
  timeout 140 node tools/agent-cli.js fs.read "{\"folder\":\"6f2ecde5\",\"path\":\"$f\"}" \
    | node -e "let d='';process.stdin.on('data',c=>d+=c).on('end',()=>{try{const j=JSON.parse(d);require('fs').writeFileSync(process.argv[1],j.content)}catch(e){console.error('FAIL',String(e.message||e))}})" "$OUT/$f" 2>&1
done < /tmp/section-files.txt
echo DONE
find "$OUT" -type f | sort
