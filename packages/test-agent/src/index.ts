#!/usr/bin/env node
import { Explorer } from "./explorer.js";
import { ConvexClient } from "./convex-client.js";

const MODE = process.argv.includes("--mode") 
  ? process.argv[process.argv.indexOf("--mode") + 1] 
  : "explore";

async function main() {
  console.log(`[test-agent] Starting in ${MODE} mode...`);

  const client = new ConvexClient({
    url: process.env.CONVEX_URL || "http://127.0.0.1:3212",
  });

  // Register worker
  const workerId = await client.registerWorker(`test-agent-${Date.now()}`, "local");
  console.log(`[test-agent] Registered as worker ${workerId}`);

  // Heartbeat loop
  const heartbeatInterval = setInterval(async () => {
    try {
      await client.heartbeat(workerId);
    } catch (e) {
      console.error("[test-agent] Heartbeat failed:", e);
    }
  }, 30_000);

  // Cleanup on exit
  const cleanup = async () => {
    clearInterval(heartbeatInterval);
    await client.unregisterWorker(workerId);
    console.log("[test-agent] Shut down");
    process.exit(0);
  };
  process.on("SIGINT", cleanup);
  process.on("SIGTERM", cleanup);

  if (MODE === "explore") {
    const explorer = new Explorer(client);
    await explorer.run(workerId);
  }

  await cleanup();
}

main().catch((e) => {
  console.error("[test-agent] Fatal error:", e);
  process.exit(1);
});
