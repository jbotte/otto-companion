# Otto Companion — Build Plan

Owner: John (LunarLyra LLC). Started 2026-11-04. Status: **M0 scaffold in workspace/otto-companion**.

## 1. What it is

A desktop app (Mac / Linux / Windows) that lives on John's machine and gives Otto two capabilities there:

1. **Agent-driven browser** — a real browser UI John can also use, with named **profiles** (isolated cookie/login stores), a built-in **dev console** (console messages + network log + activity feed), and a control API for Otto: navigate, click, type, scroll, scrape (HTML/text/screenshot), read console & network, and gated arbitrary JS via CDP.
2. **Designated folders** — an allow-list of folders on John's machine that Otto can read/write via a scoped, token-authenticated transfer API (HTTP now; SFTP/scp mode planned).

### Relationship to Otto's built-in desktop
Otto already has its own Linux desktop + Chromium (`otto_computer_*` tools). The companion is **not a duplicate**: it puts the same "Otto drives a browser" power on **John's own machine**, inside **his logged-in profiles**, touching **his files** — with his eyes on the screen and Allow/Deny gates he controls.

## 2. Framework decision: Electron (Tauri 2 considered)

| Requirement | Electron | Tauri 2 |
| --- | --- | --- |
| Full browser control via CDP (click/type/scrape/console) | ✅ bundled Chromium, `webContents.debugger` = first-party CDP | ⚠️ system webviews: WKWebView (macOS) & WebKitGTK (Linux) have **no CDP**; WebView2 only on Windows. Would need a bundled side Chromium + screenshot streaming |
| Browser profiles | ✅ `persist:<id>` partitions | ⚠️ webview-dependent, inconsistent |
| Dev console panel | ✅ `console-message` + `webRequest` hooks | ⚠️ limited per-webview |
| Binary size / RAM | ❌ ~90–120 MB installed | ✅ ~10 MB |
| Proven path here | ✅ TTS Save Importer ships on all 3 OSes via Electron + GH Actions matrix | new ground |

**Decision: Electron.** The browser *is* the product; on Tauri 2 that core feature means shipping a separate Chromium anyway, which forfeits the size advantage. If a thin-Tauri UI in front of an external CDP Chromium ever wins, the agent protocol below is framework-neutral and ports unchanged.

## 3. Architecture

```
John's machine                                        Otto device (Linux, tailnet)
┌───────────────────────────────┐                     ┌─────────────────────────┐
│ Otto Companion (Electron)     │                     │  me (Otto agent)        │
│ ┌───────────┐ ┌─────────────┐ │   ws JSON-RPC       │  tools/agent-cli.js     │
│ │ Browser UI│ │ BrowserMgr  │ │◄──────────────────► │  (today)                │
│ │ tabs/url/ │ │ WebContents │ │   token auth        │  MCP connector          │
│ │ console/  │ │ View+CDP    │ │                     │  (M2, first-class tools)│
│ │ network   │ │ profiles=   │ │   http (token)      │                         │
│ └───────────┘ │ persist:ptn │ │◄──────────────────► │  curl / web_fetch       │
│ ┌───────────┐ └─────────────┘ │                     │  (file ops)             │
│ │ Agent ws  │ ┌─────────────┐ │                     └─────────────────────────┘
│ │ server    │ │ FileShare   │ │
│ │ approvals │ │ allow-list  │ │
│ └───────────┘ └─────────────┘ │
└───────────────────────────────┘
```

- **Companion dials nothing out in v0** — Otto connects inbound (ws + http). Both machines on the tailnet (`jllc-otto-767582.tailb44de.ts.net` side) make this work through NAT without port-forwarding. Flip **Bind → LAN/tailnet** in the sidebar; default stays localhost.
- **M1 alternative considered:** reverse-connect (companion → Otto) so the companion needs no inbound reachability. Deferred — tailnet covers it.

## 4. Agent protocol v0 (live in scaffold)

WebSocket, one JSON message per frame. Auth: `?token=*** (generated on first run, shown masked in UI, rotatable).

- In: `{ "id": 1, "method": "browser.click", "params": { "tab": "3", "selector": "#login" } }`
- Out: `{ "id": 1, "ok": true, "result": ... }` / `{ "id": 1, "ok": false, "error": "..." }`
- Broadcasts: `{ "event": ... }` — the same events the UI renders (call log, approvals, console).

Methods: see README table. `tab` omitted = active tab. Input uses real CDP events (`Input.dispatchMouseEvent`, `Input.insertText`) so React/Vue sites behave normally. `browser.evaluate` and all `fs.*` mutations require an **in-app Allow/Deny dialog**.

## 5. Profiles

- A profile = `persist:<id>` partition: own cookies, localStorage, cache, logins.
- UI: sidebar profile list, create button; tabs are born in the selected profile.
- Planned: per-profile **site rules** (auto-allow Otto for work profile, always-ask on banking/personal), per-profile agent pause.

## 6. File sharing

- v0: scoped HTTP API — `/status /list /read /download /write /mkdir /delete`, folder allow-list, `readOnly` flags, path-escape guards, token auth.
- M2: **SFTP mode** (embedded `ssh2` server, chrooted to shared folders, Otto's pubkey managed in-app) for people who want literal `scp`/`sshfs`. HTTP mode stays as default (no port/host keys to babysit).

## 7. Security model

- Default localhost bind; explicit opt-in to LAN/tailnet; single shared token (rotation in UI); timing-safe compare.
- Approval gates: `browser.evaluate`, `fs.read/write/mkdir/delete`. Plan: remember-per-session option, and a **kill switch** (Pause Agent button stops dispatching while connected).
- Planned hardening: audit log export (JSONL), per-site deny list (block agent on banking domains), redact password fields from logs/screenshots, signed builds + notarization for macOS.

## 8. Milestones

- **M0 — scaffold (now)**: Electron app, tabs+profiles, console/network panels, ws agent server with CDP input, scoped file share, CLI bridge. Acceptance: `npm start` on Mac; `agent-cli.js tabs.open/browser.text` from Otto box works end-to-end over tailnet.
- **M1 — browsing polish**: Pause-Agent kill switch, `waitForSelector`, file uploads via CDP `DOM.setFileInputFiles`, dialog handling, per-profile site rules, screenshot redaction option.
- **M2 — Otto integration + files**: MCP connector exposing these tools natively to me (via Otto's Add-connector flow, companion runs the bridge), SFTP mode, file diff preview before write approval.
- **M3 — packaging**: electron-builder + GitHub Actions matrix (reuse the TTS Save Importer `build.yml` pattern; remember the `NODE_ENV=production` devDeps gotcha → `npm ci --include=dev`), macOS notarization, auto-update.
- **M4 — extras**: per-site rules UI, audit log viewer, session replay (rrweb) of agent actions, profile import from existing Chrome.

## 9. Open questions for John

1. Which machine first — Mac (probably) and is it already on the tailnet? (We can verify by pinging it from the Otto.)
2. Should the browser be **usable by you too** (it is in v0 — real tabs, you can log in by hand into each profile) or agent-only locked?
3. Approval friction: every `evaluate`/file-write popped today — want "allow for this session" buttons?
4. Repo: private under `jbotte` (like tts-save-importer)?
5. Name is placeholder "Otto Companion" — rename freely.
