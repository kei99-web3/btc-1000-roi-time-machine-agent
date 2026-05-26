# Release Checklist

Use this before creating the public GitHub repo.

## Current Local Status

Checked on 2026-05-26:

- [x] `npm ci`
- [x] `npm run typecheck`
- [x] `npm test`
- [x] `npm run backtest`
- [x] README says the 1000% ROI comes from hindsight.
- [x] Live trading docs require explicit opt-in.
- [x] Secret-like filename scan found no `.env`, wallet, key, secret, mnemonic, or seed files outside `node_modules`.
- [x] `INJECTIVE_MCP_COMMAND` / `INJECTIVE_MCP_ARGS` are not configured in the current Codex process, so no live Injective MCP order action was attempted.
- [x] Public GitHub URL and working public demo URL are filled in.
- [x] User approved public repo creation and public demo.
- [x] X launch is explicitly human-run; Codex did not post or schedule.
- [x] Live order testing remains disabled by user request.
- [x] Injective testnet registration completed after user wallet/testnet setup and explicit confirmation.

## Local

- [ ] `npm ci`
- [ ] `npm run typecheck`
- [ ] `npm test`
- [ ] `npm run backtest`
- [ ] Open `src/web/index.html` on desktop and mobile viewport.
- [ ] Confirm README says the 1000% ROI comes from hindsight.
- [ ] Confirm live trading docs require explicit opt-in.
- [ ] Confirm `.env`, keys, wallet files, screenshots with private data, and local cache files are absent.

## Public GitHub

- [x] Create public repo only after user approval.
- [x] Push source.
- [ ] Verify GitHub Actions pass. Current status: workflows are active, but GitHub did not create workflow runs from the initial pushes and workflow dispatch returned HTTP 500 during verification.
- [x] Add topics: `bitcoin`, `backtesting`, `trading-bot`, `overfitting`, `injective`, `ai-agent`, `erc-8004`, `joke`.
- [x] Create Release `v0.1.0`.

## Injective

- [x] Replace demo URL in Agent Card.
- [x] Replace GitHub URL in Agent Card.
- [x] Run `inj-agent register --dry-run`.
- [x] Register on testnet only after user approval.
- [x] Save agentId and scan URL.

## X Launch

- [ ] User selects one X launch post.
- [ ] Confirm no investment advice or guaranteed-live-performance wording.
- [ ] Post/schedule only after explicit approval.
