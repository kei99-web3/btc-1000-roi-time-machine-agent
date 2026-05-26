# Live Trading Mode

This project is a joke. Live trading is not the joke.

The 1000% ROI result comes from historical hindsight. It cannot be used to predict the next candle. If you connect this repo to live trading infrastructure, you are no longer running the time-machine backtest. You are manually calling real trading tools.

## Default state

Live order execution is disabled by default.

Cloning the repo only gives you:

- The joke backtest.
- Local tests.
- A static visual demo.
- A generic MCP bridge that refuses live tool calls until explicitly enabled.

It does not give you:

- An Injective wallet.
- Faucet funds.
- Private-key handling.
- A configured Injective MCP server.
- A working trading account.
- Permission to place orders.

## What live mode does

The repo includes a generic MCP bridge:

- `npm run live:tools` lists tools exposed by your Injective MCP server.
- `npm run live:call` calls a named MCP tool with JSON arguments.

This is intentionally generic because Injective MCP tool schemas may change. The bridge uses MCP's standard stdio transport, where JSON-RPC messages are newline-delimited JSON. Users must inspect the current tool list and pass arguments that match their installed MCP server.

## What live mode does not do

Live mode does not:

- Predict BTC.
- Recreate the 1000% ROI.
- Automatically choose profitable trades.
- Hide the fact that the backtest used future data.
- Manage your wallet, keys, leverage, liquidation risk, or tax records.

## Setup outline

1. Install Injective's MCP server from its official repository.
2. Configure it according to the official docs.
3. Point this repo at the MCP server:

```bash
export INJECTIVE_MCP_COMMAND=node
export INJECTIVE_MCP_ARGS='["/absolute/path/to/mcp-server/dist/mcp/server.js"]'
```

4. Inspect tools:

```bash
npm run live:tools
```

5. If you still want to call a live tool, set the explicit acknowledgement:

```bash
export BTC_1000_ROI_ENABLE_LIVE_ORDERS=I_UNDERSTAND_THIS_JOKE_BOT_CAN_PLACE_REAL_ORDERS_AND_LOSE_MONEY
```

6. Call a tool only after checking the installed schema:

```bash
npm run live:call -- --i-understand-live-risk --tool trade_open --args '{"example":"replace-with-real-schema"}'
```

## Strong recommendation

Use testnet first. Use tiny size if you move to mainnet. Do not give this project funds you care about.

The correct mental model is:

> The backtest is a joke. The order button is real.
