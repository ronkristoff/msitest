/**
 * Simple Convex client for the Worker CLI.
 * Uses the Convex HTTP API directly — no generated type imports needed.
 */
export class ConvexClient {
  private url: string;

  constructor(options: { url: string }) {
    this.url = options.url;
  }

  private async call(
    path: string,
    args: Record<string, unknown>,
    method = "POST",
  ): Promise<unknown> {
    const response = await fetch(`${this.url}/api/${path}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(args),
    });
    if (!response.ok) {
      const text = await response.text().catch(() => "Unknown error");
      throw new Error(`Convex error (${response.status}): ${text.slice(0, 200)}`);
    }
    return response.json();
  }

  private async mutation(name: string, args: Record<string, unknown>): Promise<unknown> {
    return this.call(`mutation/${name}`, args);
  }

  private async query(name: string, args: Record<string, unknown>): Promise<unknown> {
    return this.call(`query/${name}`, args);
  }

  async registerWorker(name: string, type: string): Promise<string> {
    return (await this.mutation("workers:registerWorker", { name, type })) as string;
  }

  async heartbeat(workerId: string): Promise<void> {
    await this.mutation("workers:heartbeat", { workerId });
  }

  async unregisterWorker(workerId: string): Promise<void> {
    await this.mutation("workers:unregisterWorker", { workerId });
  }

  async getPendingFeatures(featureMapId: string): Promise<string[]> {
    return (await this.query("explore:getPendingFeatures", { featureMapId })) as string[];
  }

  async reportFeatureStatus(
    featureMapId: string,
    featureName: string,
    status: string,
  ): Promise<void> {
    await this.mutation("explore:reportFeatureStatus", {
      featureMapId,
      featureName,
      status,
    });
  }

  async getFeatureMaps(projectId: string): Promise<
    Array<{ _id: string; projectId: string; features: Array<{ name: string }>; explorationStatus?: Record<string, string> }>
  > {
    return (await this.query("feature_maps_mutations:listByProject", { projectId })) as unknown as Array<{ _id: string; projectId: string; features: Array<{ name: string }>; explorationStatus?: Record<string, string> }>;
  }

  async getProject(projectId: string): Promise<{ name: string; baseUrl: string } | null> {
    return (await this.query("projects:getProject", { projectId })) as { name: string; baseUrl: string } | null;
  }
}
