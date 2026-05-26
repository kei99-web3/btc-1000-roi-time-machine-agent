# Public Release Approval Gates

This file separates work that is already ready locally from actions that require the user's explicit approval.

## Local Status

Completed locally on 2026-05-26:

- `npm ci`
- `npm run typecheck`
- `npm test`
- `npm run backtest`
- Secret-like file scan for `.env`, wallet, key, secret, mnemonic, and seed filenames, excluding `node_modules`
- README / docs caveat scan for hindsight, non-repeatability, and no-financial-advice wording
- X review queue prepared but not posted or scheduled
- User approved public repo creation and public GitHub Pages demo. X posting remains human-run.

Known remaining placeholders:

- `docs/INJECTIVE_AGENT.md`
  - `0xYourWallet` example only

## User Approval Required

The user must explicitly approve these external actions before Codex performs them:

1. Public GitHub release
   - Proposed repo: `kei99-web3/btc-1000-roi-time-machine-agent`
   - Visibility: public
   - Status: approved by user.

2. Public demo URL
   - Proposed default: GitHub Pages from the public repo.
   - Status: approved by user.

3. X launch post
   - Proposed first choice: Post A in `channels/x_crypto/review_queue/2026-05-26_btc_1000_roi_time_machine_agent_launch.md`.
   - Status: user will run manually; Codex must not post or schedule.

4. Injective testnet registration
   - Requires a user-approved wallet/testnet setup.
   - Current environment status: `INJECTIVE_MCP_COMMAND` / `INJECTIVE_MCP_ARGS` are not configured in this Codex process.
   - Actions after approval and setup: configure Injective MCP/CLI path without exposing secrets, run dry-run first, then register on testnet only if separately approved.

5. Live order testing
   - Not required for the joke release.
   - Requires explicit approval, testnet-first preference, MCP configuration, and the live-order acknowledgement env var.

## Suggested Reply

To continue with the default public-launch path, reply with:

```text
approve public repo kei99-web3/btc-1000-roi-time-machine-agent
approve GitHub Pages demo
approve X post A
Injective testnetはまだ待つ
live order testはまだ待つ
```
