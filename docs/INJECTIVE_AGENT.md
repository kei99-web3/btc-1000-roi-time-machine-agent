# Injective Agent Registration Plan

Goal: register **BTC 1000%ROI Time-Machine Agent** as an on-chain joke AI agent identity.

This does not work automatically after cloning. The repo contains the Agent Card draft and setup instructions only. The user must provide their own testnet wallet, official CLI/SDK setup, faucet funds, and explicit confirmation before any registration.

## Recommended first registration

Use testnet first.

Register as a simulation/data/joke agent rather than a serious trading agent until the public README, demo URL, and Agent Card are final.

Suggested identity:

- Name: `BTC 1000%ROI Time-Machine Agent`
- Type: `data` or `other`
- Builder code: `btc-1000-roi`
- Description: `A simulation-only joke agent that reaches 1000% ROI by openly using hindsight. Not financial advice.`
- Services:
  - GitHub repo URL: `https://github.com/kei99-web3/btc-1000-roi-time-machine-agent`
  - Static demo URL: `https://raw.githack.com/kei99-web3/btc-1000-roi-time-machine-agent/main/index.html`
  - Optional MCP endpoint only if a hosted read-only/demo endpoint exists

Registration URI:

```text
https://raw.githubusercontent.com/kei99-web3/btc-1000-roi-time-machine-agent/main/agent-card/btc-1000-roi-time-machine-agent.card.json
```

## User-side setup steps

Codex should not handle wallet secrets or private keys. Use this sequence when the user is ready:

1. Create or choose a testnet-only wallet.
2. Fund it only with testnet funds from an official faucet.
3. Install the current Injective Agent SDK/CLI from official Injective documentation.
4. Save the Agent Card JSON somewhere publicly reachable, or use the public repo copy if the CLI accepts that URL.
5. Run dry-run registration first.
6. Review the dry-run output: name, description, URLs, chain, fees, and wallet address.
7. Register on testnet only after explicitly confirming the dry-run result.
8. Save the returned agent ID and scan URL.
9. Do not run mainnet registration until the testnet identity has been inspected.

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
  --uri "https://raw.githubusercontent.com/kei99-web3/btc-1000-roi-time-machine-agent/main/agent-card/btc-1000-roi-time-machine-agent.card.json" \
  --dry-run \
  --json
```

If the installed CLI rejects an HTTPS metadata URI, set `PINATA_JWT` in the CLI `.env` and register without `--uri` so the CLI can upload the generated card to IPFS. Keep `--dry-run` or the equivalent enabled for the first attempt.

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
