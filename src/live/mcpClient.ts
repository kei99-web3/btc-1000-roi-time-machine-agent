import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";

interface PendingRequest {
  resolve: (value: unknown) => void;
  reject: (reason: Error) => void;
  timeout: NodeJS.Timeout;
}

export class StdioMcpClient {
  private child: ChildProcessWithoutNullStreams | null = null;
  private nextId = 1;
  private buffer = "";
  private readonly pending = new Map<number, PendingRequest>();

  constructor(
    private readonly command: string,
    private readonly args: string[],
    private readonly options: { requestTimeoutMs?: number } = {},
  ) {}

  async start(): Promise<void> {
    this.child = spawn(this.command, this.args, {
      stdio: ["pipe", "pipe", "pipe"],
      env: process.env,
    });

    this.child.stdout.on("data", (chunk: Buffer) => {
      try {
        this.readChunk(chunk);
      } catch (error) {
        this.rejectAll(error instanceof Error ? error : new Error(String(error)));
        this.stop();
      }
    });
    this.child.stderr.on("data", (chunk: Buffer) => process.stderr.write(chunk));
    this.child.on("error", (error) => {
      this.rejectAll(error);
    });
    this.child.on("exit", (code) => {
      this.rejectAll(new Error(`MCP server exited with code ${code}`));
    });

    await this.request("initialize", {
      protocolVersion: "2024-11-05",
      capabilities: {},
      clientInfo: { name: "btc-1000-roi-time-machine-agent", version: "0.1.0" },
    });
    this.notify("notifications/initialized", {});
  }

  async listTools(): Promise<unknown> {
    return this.request("tools/list", {});
  }

  async callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
    return this.request("tools/call", { name, arguments: args });
  }

  stop(): void {
    this.child?.kill();
    this.child = null;
  }

  private request(method: string, params: Record<string, unknown>): Promise<unknown> {
    const id = this.nextId++;
    const payload = { jsonrpc: "2.0", id, method, params };
    this.write(payload);
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`MCP request timed out: ${method}`));
      }, this.options.requestTimeoutMs ?? 10_000);
      this.pending.set(id, { resolve, reject, timeout });
    });
  }

  private notify(method: string, params: Record<string, unknown>): void {
    this.write({ jsonrpc: "2.0", method, params });
  }

  private write(payload: unknown): void {
    if (!this.child) throw new Error("MCP client has not started.");
    this.child.stdin.write(`${JSON.stringify(payload)}\n`, "utf8");
  }

  private readChunk(chunk: Buffer): void {
    this.buffer += chunk.toString("utf8");
    while (true) {
      const lineEnd = this.buffer.indexOf("\n");
      if (lineEnd === -1) return;
      const line = this.buffer.slice(0, lineEnd).replace(/\r$/, "");
      this.buffer = this.buffer.slice(lineEnd + 1);
      if (!line.trim()) continue;
      this.handleMessage(JSON.parse(line) as { id?: number; result?: unknown; error?: { message?: string } });
    }
  }

  private handleMessage(message: { id?: number; result?: unknown; error?: { message?: string } }): void {
    if (message.id === undefined) return;
    const pending = this.pending.get(message.id);
    if (!pending) return;
    this.pending.delete(message.id);
    clearTimeout(pending.timeout);
    if (message.error) {
      pending.reject(new Error(message.error.message ?? "MCP request failed"));
      return;
    }
    pending.resolve(message.result);
  }

  private rejectAll(error: Error): void {
    for (const request of this.pending.values()) {
      clearTimeout(request.timeout);
      request.reject(error);
    }
    this.pending.clear();
  }
}

export function mcpCommandFromEnv(env: NodeJS.ProcessEnv = process.env): { command: string; args: string[] } {
  if (!env.INJECTIVE_MCP_COMMAND && !env.INJECTIVE_MCP_ARGS) {
    throw new Error("Missing MCP configuration. Set INJECTIVE_MCP_COMMAND and INJECTIVE_MCP_ARGS before using live tools.");
  }

  const command = env.INJECTIVE_MCP_COMMAND ?? "node";
  let args: unknown;
  try {
    args = env.INJECTIVE_MCP_ARGS ? JSON.parse(env.INJECTIVE_MCP_ARGS) : [];
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(`INJECTIVE_MCP_ARGS must be a valid JSON array of strings: ${detail}`);
  }
  if (!Array.isArray(args) || args.some((item) => typeof item !== "string")) {
    throw new Error("INJECTIVE_MCP_ARGS must be a JSON array of strings.");
  }
  if (command === "node" && args.length === 0) {
    throw new Error("INJECTIVE_MCP_ARGS must point to the Injective MCP server entrypoint when INJECTIVE_MCP_COMMAND is node.");
  }
  return { command, args };
}
