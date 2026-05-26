import assert from "node:assert/strict";
import { it } from "node:test";
import { StdioMcpClient } from "../src/live/mcpClient.js";

it("talks to a newline-delimited MCP stdio server", async () => {
  const fakeServer = `
    process.stdin.setEncoding("utf8");
    let buffer = "";
    process.stdin.on("data", (chunk) => {
      buffer += chunk;
      let lineEnd;
      while ((lineEnd = buffer.indexOf("\\n")) >= 0) {
        const line = buffer.slice(0, lineEnd).trim();
        buffer = buffer.slice(lineEnd + 1);
        if (!line) continue;
        const message = JSON.parse(line);
        if (message.method === "initialize") {
          process.stdout.write(JSON.stringify({
            jsonrpc: "2.0",
            id: message.id,
            result: {
              protocolVersion: "2024-11-05",
              capabilities: {},
              serverInfo: { name: "fake", version: "0.0.0" }
            }
          }) + "\\n");
        }
        if (message.method === "tools/list") {
          process.stdout.write(JSON.stringify({
            jsonrpc: "2.0",
            id: message.id,
            result: { tools: [{ name: "ping", inputSchema: { type: "object" } }] }
          }) + "\\n");
        }
      }
    });
  `;

  const client = new StdioMcpClient(process.execPath, ["-e", fakeServer], { requestTimeoutMs: 1_000 });
  await client.start();
  try {
    assert.deepEqual(await client.listTools(), {
      tools: [{ name: "ping", inputSchema: { type: "object" } }],
    });
  } finally {
    client.stop();
  }
});
