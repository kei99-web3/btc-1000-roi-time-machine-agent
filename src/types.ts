export type Position = -1 | 0 | 1;

export interface Candle {
  openTime: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface OptimizerOptions {
  leverage: number;
  feePerSide: number;
}

export interface BacktestSummary {
  symbol: string;
  interval: string;
  start: string;
  end: string;
  rows: number;
  firstClose: number;
  lastClose: number;
  buyHoldReturnPct: number;
  targetCapped: EvaluationSummary;
  uncapped: EvaluationSummary;
}

export interface EvaluationSummary {
  finalEquityMultiple: number;
  returnPct: number;
  maxDrawdownPct: number;
  positionChanges: number;
  turnoverUnits: number;
  activeBars: number;
  profitableBars: number;
  barCount: number;
  hitIndex: number | null;
  hitTimeUtc: string | null;
}
