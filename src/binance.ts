import type { Candle } from "./types.js";

const DEFAULT_BASE_URL = "https://api.binance.com/api/v3/klines";
const RETRYABLE_STATUSES = new Set([418, 429, 500, 502, 503, 504]);

export async function fetchBinanceKlines(options: {
  symbol: string;
  interval: string;
  start: string;
  end: string;
  baseUrl?: string;
}): Promise<Candle[]> {
  const baseUrl = options.baseUrl ?? DEFAULT_BASE_URL;
  const startMs = Date.parse(`${options.start}T00:00:00.000Z`);
  const endMs = Date.parse(`${options.end}T00:00:00.000Z`);
  if (!Number.isFinite(startMs) || !Number.isFinite(endMs)) {
    throw new Error("start and end must be YYYY-MM-DD dates");
  }
  if (endMs <= startMs) {
    throw new Error("end must be after start");
  }

  const candles: Candle[] = [];
  let cursor = startMs;
  while (cursor < endMs) {
    const url = new URL(baseUrl);
    url.searchParams.set("symbol", options.symbol);
    url.searchParams.set("interval", options.interval);
    url.searchParams.set("startTime", String(cursor));
    url.searchParams.set("endTime", String(endMs));
    url.searchParams.set("limit", "1000");

    const response = await fetchWithRetry(url);
    if (!response.ok) {
      throw new Error(`Binance kline request failed: ${response.status} ${response.statusText}`);
    }
    const payload = (await response.json()) as unknown[][];
    if (payload.length === 0) break;

    for (const item of payload) {
      candles.push({
        openTime: Number(item[0]),
        open: Number(item[1]),
        high: Number(item[2]),
        low: Number(item[3]),
        close: Number(item[4]),
        volume: Number(item[5]),
      });
    }

    cursor = Number(payload[payload.length - 1][0]) + 1;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  const deduped = new Map<number, Candle>();
  for (const candle of candles) {
    deduped.set(candle.openTime, candle);
  }
  return [...deduped.values()].sort((a, b) => a.openTime - b.openTime);
}

async function fetchWithRetry(url: URL, attempts = 3): Promise<Response> {
  let lastResponse: Response | null = null;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const response = await fetch(url);
    if (response.ok || !RETRYABLE_STATUSES.has(response.status) || attempt === attempts - 1) {
      return response;
    }
    lastResponse = response;
    await new Promise((resolve) => setTimeout(resolve, 250 * (attempt + 1)));
  }
  if (lastResponse) return lastResponse;
  throw new Error("Binance kline request did not produce a response");
}
