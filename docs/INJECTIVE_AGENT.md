# Injective Agent Registration Plan

Goal: register **BTC 1000%ROI Time-Machine Agent** as an on-chain joke AI agent identity.

## Recommended first registration

Use testnet first.

Register as a simulation/data/joke agent rather than a serious trading agent until the public README, demo URL, and Agent Card are final.

Suggested identity:

- Name: `BTC 1000%ROI Time-Machine Agent`
- Type: `data` or `other`
- Builder code: `btc-1000-roi`
- Description: `A simulation-only joke agent that reaches 1000% ROI by openly using hindsight. Not financial advice.`
- Services:
  - GitHub repo URL
  - Static demo URL
  - Optional MCP endpoint only if a hosted read-only/demo endpoint exists

## Dry-run first

The Injective Agent CLI supports dry-run registration in the SDK/CLI docs. The public release should document a dry-run command before any on-chain registration.

Example shape:

```bash
inj-agent register \
  --name "BTC 1000%ROI Time-Machine Agent" \
  --type other \
  --builder-code btc-1000-roi \
  --wallet 0xYourWallet \
  --description "Simulation-only joke agent. It gets 1000% ROI by reading historical BTC candles after the fact." \
  --uri "https://your-demo-host/agent-card.json" \
  --dry-run \
  --json
```

## Mainnet rule

Do not register on mainnet until:

- Public repo is reviewed.
- Agent Card is final.
- Demo URL is stable.
- Wallet/key handling is user-approved.
- The description clearly says the 1000% ROI comes from hindsight.

## Agent Card draft

See:

```text
agent-card/btc-1000-roi-time-machine-agent.card.json
```
