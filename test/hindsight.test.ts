import assert from "node:assert/strict";
import test from "node:test";
import { closeToCloseReturns, evaluatePath, optimizeHindsightPath } from "../src/hindsight.js";
import type { Candle } from "../src/types.js";

test("hindsight optimizer chooses profitable direction on known future moves", () => {
  const candles: Candle[] = [
    { openTime: 0, open: 100, high: 100, low: 100, close: 100, volume: 1 },
    { openTime: 1, open: 110, high: 110, low: 110, close: 110, volume: 1 },
    { openTime: 2, open: 99, high: 99, low: 99, close: 99, volume: 1 },
    { openTime: 3, open: 120, high: 120, low: 120, close: 120, volume: 1 },
  ];
  const returns = closeToCloseReturns(candles);
  const path = optimizeHindsightPath(returns, { leverage: 1, feePerSide: 0 });
  assert.deepEqual(path, [1, -1, 1]);
  const result = evaluatePath(candles, path, { leverage: 1, feePerSide: 0 });
  assert.equal(result.finalEquityMultiple > 1.4, true);
});
