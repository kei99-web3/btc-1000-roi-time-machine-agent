# BTC 1000%ROI Time-Machine Agent Project Map

Public release candidate for a joke Injective AI agent.

## Purpose

Package the BTC hindsight overfit backtest as a public, star-friendly GitHub repo candidate.

Core framing:

- Name includes `1000%ROI`.
- The 1000% ROI is produced by hindsight optimization over historical BTC data.
- It is a joke/time-machine agent, not an investment strategy.
- Live order capability exists only behind explicit opt-in guards for users who intentionally connect Injective tooling.

## Key Files

| Path | Purpose |
| --- | --- |
| `README.md` | Public-facing GitHub first screen |
| `src/hindsight.ts` | Hindsight dynamic-programming optimizer |
| `src/binance.ts` | Public Binance kline fetcher |
| `src/cli.ts` | CLI commands |
| `src/live/` | Explicitly gated live-order bridge via MCP |
| `src/web/index.html` | Static visual demo |
| `agent-card/` | Injective Agent Card draft |
| `docs/LIVE_TRADING.md` | Live trading warning and setup |
| `docs/INJECTIVE_AGENT.md` | Injective registration plan |

## Approval Boundary

Allowed autonomously:

- Local files, tests, docs, HTML demo, Agent Card draft, release checklist.

Requires explicit user approval:

- New public GitHub repo creation.
- Public push or release.
- Injective testnet/mainnet registration.
- Wallet/private-key/faucet/IPFS token setup.
- Actual live order execution.
- X posting or scheduling.
