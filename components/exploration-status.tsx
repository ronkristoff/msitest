"use client";

const statusIcons: Record<string, string> = {
  pending: "—",
  explored: "✓",
  blocked: "✗",
  failed: "!",
};

const statusColors: Record<string, string> = {
  pending: "bg-muted text-muted-foreground",
  explored: "bg-success-bg text-success",
  blocked: "bg-warning/10 text-warning",
  failed: "bg-error-bg text-error",
};

type ExplorationStatusProps = {
  features: Array<{ name: string; useCases: string[]; category: string }>;
  explorationStatus?: Record<string, string>;
};

export function ExplorationStatus({ features, explorationStatus }: ExplorationStatusProps) {
  const pending = features.filter((f) => !explorationStatus?.[f.name] || explorationStatus[f.name] === "pending").length;
  const explored = features.filter((f) => explorationStatus?.[f.name] === "explored").length;
  const blocked = features.filter((f) => explorationStatus?.[f.name] === "blocked").length;
  const failed = features.filter((f) => explorationStatus?.[f.name] === "failed").length;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <h3 className="text-lg font-semibold text-pitch-black">Exploration Status</h3>
        <div className="flex gap-3 text-xs">
          {explored > 0 && (
            <span className="text-success">{explored} explored</span>
          )}
          {blocked > 0 && (
            <span className="text-warning">{blocked} blocked</span>
          )}
          {failed > 0 && (
            <span className="text-error">{failed} failed</span>
          )}
          {pending > 0 && (
            <span className="text-muted-foreground">{pending} pending</span>
          )}
        </div>
      </div>

      <div className="grid gap-2">
        {features.map((feature) => {
          const status = explorationStatus?.[feature.name] || "pending";
          return (
            <div
              key={feature.name}
              className="flex items-center gap-3 px-4 py-2 border border-oatmeal rounded-interactiveelements bg-ghost-white"
            >
              <span
                className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${statusColors[status]}`}
              >
                {statusIcons[status]}
              </span>
              <span className="text-sm text-pitch-black flex-1">{feature.name}</span>
              <span className="text-[10px] text-muted-foreground capitalize">{feature.category.replace("_", " ")}</span>
            </div>
          );
        })}
      </div>

      {explored === features.length && features.length > 0 && (
        <p className="text-xs text-success">All features explored successfully.</p>
      )}
    </div>
  );
}
