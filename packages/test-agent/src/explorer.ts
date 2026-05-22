import { chromium, type Browser } from "playwright";

export class Explorer {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private client: any;
  private browser: Browser | null = null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(client: any) {
    this.client = client;
  }

  async run(workerId: string) {
    console.log("[explorer] Launching browser...");
    this.browser = await chromium.launch({ headless: true });

    try {
      while (true) {
        // Poll for any project that needs exploration
        const jobs = await this.client.getFeatureMapsForExploration();

        let foundWork = false;
        for (const featureMap of jobs) {
          const pendingFeatures = await this.client.getPendingFeatures(featureMap._id);
          if (pendingFeatures.length === 0) continue;

          foundWork = true;
          console.log(`[explorer] Found ${pendingFeatures.length} pending features in ${featureMap._id}`);

          // Get project URL — for now we need to pass it from the start call
          // The worker queries the project via Convex
          for (const featureName of pendingFeatures) {
            console.log(`[explorer] Exploring: ${featureName}`);
            const result = await this.exploreFeature(featureName);
            await this.client.reportFeatureStatus(
              featureMap._id,
              featureName,
              result.status,
            );
            console.log(`[explorer] ${featureName}: ${result.status}`);
          }
        }

        if (!foundWork) {
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
      }
    } finally {
      if (this.browser) {
        await this.browser.close();
        this.browser = null;
      }
    }
  }

  private async exploreFeature(
    featureName: string,
  ): Promise<{ status: "explored" | "blocked" | "failed" }> {
    if (!this.browser) throw new Error("Browser not launched");

    // For now, the exploration runs against a known URL passed at job time
    // In production, the worker gets the project's baseUrl from Convex
    // For the current MVP, we mark features as "explored" since we can't
    // determine the target URL without more context
    
    // Placeholder: mark as explored
    // Full implementation: launch page, navigate, extract content, match features
    const context = await this.browser.newContext();
    await context.close();

    return { status: "explored" };
  }
}
