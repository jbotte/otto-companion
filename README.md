# Otto Companion

An app for your Mac / Linux / Windows machine that gives Otto two superpowers there:

1. **A browser Otto fully drives** — real Chromium tabs with named **profiles** (separate logins/cookies), a built-in **dev console** (console + network panels), and an agent API: navigate, click, type, scroll, scrape HTML/text, screenshots, console tail, network log, and gated JS `evaluate` via CDP.
2. **Designated folders** — only folders you explicitly share become reachable by Otto through a token-authenticated API (list / read / write / download / delete, per-folder read-only toggles). SFTP ("real scp") mode is planned.

Everything listens on **127.0.0.1 by default** and requires a **token**; dangerous ops (`evaluate`, file reads/writes/deletes) pop an **Allow/Deny dialog** on your machine.

## Quick start

```bash
npm install --include=dev   # NOTE: --include=dev matters on machines with NODE_ENV=production
npm start
```

The first run generates an agent token and writes it to the app's userData dir
(`~/.config/otto-companion/agent.json` on Linux, `~/Library/Application Support/otto-companion/agent.json` on macOS, `%APPDATA%\otto-companion\agent.json` on Windows).

## Talking to it from Otto (the device)

`tools/agent-cli.js` is a zero-dependency Node 22 client. Copy it to the Otto box and:

```bash
node agent-cli.js ping
node agent-cli.js tabs.open '{"url":"https://news.ycombinator.com"}'
node agent-cli.js browser.text
node agent-cli.js browser.screenshot > shot.json
node agent-cli.js browser.console '{"tail":50}'
node agent-cli.js fs.list '{"folder":"<id>","path":"docs"}'
```

For cross-machine use set `OTTO_AGENT_HOST` (put both machines on Tailscale and use the tailnet name/IP), and switch **Bind → LAN / tailnet** in the sidebar.

## Agent methods (v0)

| Group | Methods | Approval? |
| --- | --- | --- |
| profiles | `profiles.list`, `profiles.create` | no |
| tabs | `tabs.list`, `tabs.open`, `tabs.close`, `tabs.activate` | no |
| browse | `browser.navigate`, `browser.reload`, `browser.back`, `browser.forward`, `browser.html`, `browser.text`, `browser.screenshot`, `browser.console`, `browser.network`, `browser.click`, `browser.type`, `browser.scroll` | no |
| power | `browser.evaluate` (arbitrary JS) | **yes** |
| files | `fs.folders`, `fs.list` | no |
| files | `fs.read`, `fs.write`, `fs.mkdir`, `fs.delete` | **yes** |

Protocol: WebSocket JSON-RPC — send `{id, method, params}` → get `{id, ok, result|error}`, plus `{event}` broadcasts. See `src/main/agent-server.js`.

## Layout

```
src/main/       Electron main process (window, tabs, agent server, file share)
src/preload/    contextBridge API for the UI
src/renderer/   the app UI (tabs bar, URL bar, console/network panels, sidebar)
tools/          agent-cli.js — Otto-side client
PROJECT_PLAN.md architecture, decisions, milestones
```

## Security posture (v0)

- Token auth on both agent (ws) and file share (http); timing-safe compare.
- Localhost bind unless you flip the toggle; token rotation button in the sidebar.
- Approval dialogs for `evaluate` + all file read/write/delete.
- Shares are allow-listed folders with path-escape checks; per-folder read-only.

This is a **v0 scaffold** — see PROJECT_PLAN.md for the hardening list (per-site rules, audit log export, secret redaction, SFTP mode) before running anything sensitive over a network.
