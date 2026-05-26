import { fetchBinanceKlines } from "./binance.js";
import { closeToCloseReturns, evaluatePath, optimizeHindsightPath } from "./hindsight.js";
import { assertLiveTradingAllowed, requiredAckValue } from "./live/guard.js";
import { mcpCommandFromEnv, StdioMcpClient } from "./live/mcpClient.js";

function argValue(name: string, fallback: string): string {
  const index = process.argv.indexOf(name);
  if (index === -1) return fallback;
  const value = process.argv[index + 1];
  if (value === undefined || value.startsWith("--")) {
    throw new Error(`Missing value for ${name}.`);
  }
  return value;
}

function hasFlag(name: string): boolean {
  return process.argv.includes(name);
}

function numberArg(name: string, fallback: string, validate: (value: number) => boolean): number {
  const raw = argValue(name, fallback);
  const value = Number(raw);
  if (!Number.isFinite(value) || !validate(value)) {
    throw new Error(`Invalid value for ${name}: ${raw}`);
  }
  return value;
}

function parseJsonObject(raw: string, label: string): Record<string, unknown> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(`Invalid JSON for ${label}: ${detail}`);
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new Error(`${label} must be a JSON object.`);
  }
  return parsed as Record<string, unknown>;
}

async function runBacktest(): Promise<void> {
  const symbol = argValue("--symbol", "BTCUSDT");
  const interval = argValue("--interval", "4h");
  const start = argValue("--start", "2022-05-26");
  const end = argValue("--end", "2026-05-26");
  const leverage = numberArg("--leverage", "1", (value) => value > 0);
  const feePerSide = numberArg("--fee-per-side", "0.0004", (value) => value >= 0);
  const targetMultiple = numberArg("--target-multiple", "11", (value) => value > 1);

  const candles = await fetchBinanceKlines({ symbol, interval, start, end });
  if (candles.length < 2) {
    throw new Error(`Need at least 2 candles to backtest; received ${candles.length}.`);
  }
  const returns = closeToCloseReturns(candles);
  const positions = optimizeHindsightPath(returns, { leverage, feePerSide });
  const uncapped = evaluatePath(candles, positions, { leverage, feePerSide });
  const targetCapped = evaluatePath(candles, positions, { leverage, feePerSide }, targetMultiple);
  const firstClose = candles[0].close;
  const lastClose = candles[candles.length - 1].close;

  console.log(
    JSON.stringify(
      {
        joke: "This result uses hindsight. The agent wins because it reads the answer key.",
        symbol,
        interval,
        start,
        end,
        rows: candles.length,
        buyHoldReturnPct: (lastClose / firstClose - 1) * 100,
        targetCapped,
        uncapped,
      },
      null,
      2,
    ),
  );
}

async function runLiveTools(): Promise<void> {
  const { command, args } = mcpCommandFromEnv();
  const client = new StdioMcpClient(command, args);
  await client.start();
  try {
    console.log(JSON.stringify(await client.listTools(), null, 2));
  } finally {
    client.stop();
  }
}

async function runLiveCall(): Promise<void> {
  assertLiveTradingAllowed(hasFlag("--i-understand-live-risk"));
  const toolName = argValue("--tool", "");
  const argsRaw = argValue("--args", "{}");
  if (!toolName) {
    throw new Error("Missing --tool. Example: --tool trade_open");
  }
  const toolArgs = parseJsonObject(argsRaw, "--args");
  const { command, args } = mcpCommandFromEnv();
  const client = new StdioMcpClient(command, args);
  await client.start();
  try {
    console.log(JSON.stringify(await client.callTool(toolName, toolArgs), null, 2));
  } finally {
    client.stop();
  }
}

async function main(): Promise<void> {
  const command = process.argv[2] ?? "backtest";
  if (command === "backtest") return runBacktest();
  if (command === "live-tools") return runLiveTools();
  if (command === "live-call") return runLiveCall();
  if (command === "ack") {
    console.log(requiredAckValue());
    return;
  }
  throw new Error(`Unknown command: ${command}`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
