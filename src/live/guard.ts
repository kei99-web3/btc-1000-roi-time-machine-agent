const REQUIRED_ACK = "I_UNDERSTAND_THIS_JOKE_BOT_CAN_PLACE_REAL_ORDERS_AND_LOSE_MONEY";

export function assertLiveTradingAllowed(extraAck: boolean, env: NodeJS.ProcessEnv = process.env): void {
  if (!extraAck) {
    throw new Error("Missing --i-understand-live-risk flag.");
  }
  if (env.BTC_1000_ROI_ENABLE_LIVE_ORDERS !== REQUIRED_ACK) {
    throw new Error(
      `Live order bridge is disabled. Set BTC_1000_ROI_ENABLE_LIVE_ORDERS=${REQUIRED_ACK} only if you intentionally want real order tooling.`,
    );
  }
}

export function requiredAckValue(): string {
  return REQUIRED_ACK;
}
