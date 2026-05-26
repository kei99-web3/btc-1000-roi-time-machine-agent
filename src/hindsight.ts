import type { Candle, EvaluationSummary, OptimizerOptions, Position } from "./types.js";

const POSITIONS: Position[] = [-1, 0, 1];

export function optimizeHindsightPath(returns: number[], options: OptimizerOptions): Position[] {
  let dp = new Map<Position, number>([
    [0, 0],
    [-1, Number.NEGATIVE_INFINITY],
    [1, Number.NEGATIVE_INFINITY],
  ]);
  const parents: Map<Position, Position>[] = [];

  for (const candleReturn of returns) {
    const next = new Map<Position, number>();
    const parent = new Map<Position, Position>();
    for (const position of POSITIONS) {
      next.set(position, Number.NEGATIVE_INFINITY);
    }

    for (const [previousPosition, previousScore] of dp.entries()) {
      if (!Number.isFinite(previousScore)) continue;
      for (const position of POSITIONS) {
        const turnover = Math.abs(position - previousPosition);
        const factor = 1 + options.leverage * position * candleReturn - options.feePerSide * options.leverage * turnover;
        if (factor <= 0) continue;
        const score = previousScore + Math.log(factor);
        if (score > (next.get(position) ?? Number.NEGATIVE_INFINITY)) {
          next.set(position, score);
          parent.set(position, previousPosition);
        }
      }
    }

    dp = next;
    parents.push(parent);
  }

  let bestPosition = 0 as Position;
  let bestScore = Number.NEGATIVE_INFINITY;
  for (const [position, score] of dp.entries()) {
    if (score > bestScore) {
      bestPosition = position;
      bestScore = score;
    }
  }

  const path: Position[] = [];
  let current = bestPosition;
  for (let index = returns.length - 1; index >= 0; index -= 1) {
    path.push(current);
    current = parents[index].get(current) ?? 0;
  }
  return path.reverse();
}

export function evaluatePath(
  candles: Candle[],
  positions: Position[],
  options: OptimizerOptions,
  targetMultiple?: number,
): EvaluationSummary {
  const returns = closeToCloseReturns(candles);
  let equity = 1;
  let peak = 1;
  let maxDrawdown = 0;
  let previousPosition: Position = 0;
  let positionChanges = 0;
  let turnoverUnits = 0;
  let activeBars = 0;
  let profitableBars = 0;
  let hitIndex: number | null = null;

  for (let index = 0; index < returns.length; index += 1) {
    let position = positions[index] ?? 0;
    if (targetMultiple !== undefined && hitIndex !== null) {
      position = 0;
    }

    const turnover = Math.abs(position - previousPosition);
    if (position !== previousPosition) positionChanges += 1;
    turnoverUnits += turnover;

    const factor = 1 + options.leverage * position * returns[index] - options.feePerSide * options.leverage * turnover;
    if (factor <= 0) {
      throw new Error(`Equity factor became non-positive at bar ${index}: ${factor}`);
    }

    equity *= factor;
    if (position !== 0) activeBars += 1;
    if (factor > 1) profitableBars += 1;
    if (targetMultiple !== undefined && hitIndex === null && equity >= targetMultiple) {
      hitIndex = index;
    }

    peak = Math.max(peak, equity);
    maxDrawdown = Math.max(maxDrawdown, (peak - equity) / peak);
    previousPosition = position;
  }

  return {
    finalEquityMultiple: equity,
    returnPct: (equity - 1) * 100,
    maxDrawdownPct: maxDrawdown * 100,
    positionChanges,
    turnoverUnits,
    activeBars,
    profitableBars,
    barCount: returns.length,
    hitIndex,
    hitTimeUtc: hitIndex === null ? null : new Date(candles[hitIndex + 1].openTime).toISOString(),
  };
}

export function closeToCloseReturns(candles: Candle[]): number[] {
  const returns: number[] = [];
  for (let index = 0; index < candles.length - 1; index += 1) {
    returns.push(candles[index + 1].close / candles[index].close - 1);
  }
  return returns;
}
