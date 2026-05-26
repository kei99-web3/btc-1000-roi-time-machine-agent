import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { assertLiveTradingAllowed, requiredAckValue } from "../src/live/guard.js";
import { mcpCommandFromEnv } from "../src/live/mcpClient.js";

describe("live trading safety rails", () => {
  it("requires both the CLI flag and explicit environment acknowledgement", () => {
    assert.throws(() => assertLiveTradingAllowed(false, {}), /Missing --i-understand-live-risk/);
    assert.throws(() => assertLiveTradingAllowed(true, {}), /Live order bridge is disabled/);

    assert.doesNotThrow(() =>
      assertLiveTradingAllowed(true, {
        BTC_1000_ROI_ENABLE_LIVE_ORDERS: requiredAckValue(),
      }),
    );
  });

  it("fails clearly when MCP launch configuration is missing", () => {
    assert.throws(() => mcpCommandFromEnv({}), /Missing MCP configuration/);
    assert.throws(() => mcpCommandFromEnv({ INJECTIVE_MCP_COMMAND: "node" }), /INJECTIVE_MCP_ARGS/);
    assert.throws(
      () => mcpCommandFromEnv({ INJECTIVE_MCP_COMMAND: "node", INJECTIVE_MCP_ARGS: "not-json" }),
      /valid JSON array/,
    );

    assert.deepEqual(
      mcpCommandFromEnv({
        INJECTIVE_MCP_COMMAND: "node",
        INJECTIVE_MCP_ARGS: "[\"/tmp/server.js\"]",
      }),
      { command: "node", args: ["/tmp/server.js"] },
    );
  });
});
