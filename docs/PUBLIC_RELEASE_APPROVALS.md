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
- Third-party smoke test from a fresh public Git clone passed: `npm ci`, `npm run typecheck`, `npm test`, and `npm run backtest`.

Third-party capability boundary:

- Works after clone: static demo, tests, and hindsight backtest.
- Requires user setup: Injective testnet registration, Injective MCP, wallet/faucet/private-key handling, and live/testnet order execution.
- Disabled by default: live MCP order calls.

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
   - Working URL: `https://raw.githack.com/kei99-web3/btc-1000-roi-time-machine-agent/main/index.html`
   - GitHub Pages URL was configured, but the Pages build returned 404/errored during initial verification.
   - Status: approved by user and working RawGitHack URL verified.

3. X launch post
   - Proposed first choice: Post A in `channels/x_crypto/review_queue/2026-05-26_btc_1000_roi_time_machine_agent_launch.md`.
   - Status: user will run manually; Codex must not post or schedule.

4. Injective testnet registration
   - Completed on 2026-05-26 JST after user approval.
   - Agent ID: `26`
   - Registry view: <https://8004scan.io/agent/eip155:1439:0x8004A818BFB912233c491871b3d84c89A494BD9e:26>
   - Live order testing remains separate and disabled.

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
