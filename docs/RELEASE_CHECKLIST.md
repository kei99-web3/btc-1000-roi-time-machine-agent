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
- [x] `INJECTIVE_MCP_COMMAND` / `INJECTIVE_MCP_ARGS` are not configured in the current Codex process, so no real Injective MCP/testnet action was attempted.
- [ ] Public URLs are still placeholders until public repo/demo approval.
- [ ] External actions are still blocked on user approval.

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

- [ ] Create public repo only after user approval.
- [ ] Push source.
- [ ] Verify GitHub Actions pass.
- [ ] Add topics: `bitcoin`, `backtesting`, `trading-bot`, `overfitting`, `injective`, `ai-agent`, `erc-8004`, `joke`.
- [ ] Create Release `v0.1.0`.

## Injective

- [ ] Replace demo URL in Agent Card.
- [ ] Replace GitHub URL in Agent Card.
- [ ] Run `inj-agent register --dry-run`.
- [ ] Register on testnet only after user approval.
- [ ] Save agentId and scan URL.

## X Launch

- [ ] User selects one X launch post.
- [ ] Confirm no investment advice or guaranteed-live-performance wording.
- [ ] Post/schedule only after explicit approval.
