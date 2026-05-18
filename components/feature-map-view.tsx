"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

const categoryBorderColors: Record<string, string> = {
  functional: "border-l-blueberry-deep",
  security: "border-l-dragonfruit-pink",
  error_handling: "border-l-tangerine",
};

const categoryBadgeClass: Record<string, string> = {
  functional: "bg-blueberry-deep/10 text-blueberry-deep",
  security: "bg-dragonfruit-pink/10 text-dragonfruit-pink",
  error_handling: "bg-tangerine/10 text-tangerine",
};

type FeatureMapViewProps = {
  projectId: Id<"projects">;
};

export function FeatureMapView({ projectId }: FeatureMapViewProps) {
  const featureMaps = useQuery(api.feature_maps_mutations.listByProject, { projectId });

  if (featureMaps === undefined) {
    return (
      <div className="text-center py-8 text-muted-foreground text-sm">
        Loading feature maps...
      </div>
    );
  }

  if (featureMaps.length === 0) {
    return null;
  }

  const latest = featureMaps[0];
  const grouped = latest.features.reduce(
    (acc, f) => {
      acc[f.category] = [...(acc[f.category] || []), f];
      return acc;
    },
    {} as Record<string, typeof latest.features>,
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold text-pitch-black">Feature Map</h3>
        <span className="text-xs text-inkwell">
          {latest.features.length} features extracted
        </span>
      </div>

      {(["functional", "security", "error_handling"] as const).map((category) => {
        const features = grouped[category];
        if (!features || features.length === 0) return null;

        return (
          <div key={category}>
            <h4 className="text-sm font-medium text-inkwell mb-3 capitalize">
              {category.replace("_", " ")}
            </h4>
            <div className="grid gap-3">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className={`border border-oatmeal rounded-cards bg-ghost-white p-4 border-l-4 ${categoryBorderColors[category]}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <h5 className="text-sm font-semibold text-pitch-black">
                      {feature.name}
                    </h5>
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-pill ${categoryBadgeClass[category]}`}
                    >
                      {category.replace("_", " ")}
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {feature.useCases.map((useCase, j) => (
                      <li key={j} className="text-xs text-inkwell flex items-start gap-1.5">
                        <span className="text-platinum-gray mt-1 shrink-0">—</span>
                        {useCase}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
