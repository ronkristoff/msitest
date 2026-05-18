"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useQuery, useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { PrdUpload } from "@/components/prd-upload";
import { FeatureMapView } from "@/components/feature-map-view";
import { IconArrowLeft, IconSparkles } from "@tabler/icons-react";
import type { Id } from "@/convex/_generated/dataModel";

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const projectId = id as Id<"projects">;

  const project = useQuery(api.projects.getProject, { projectId });
  const user = useQuery(api.auth.getCurrentUser);
  const featureMaps = useQuery(api.feature_maps_mutations.listByProject, { projectId });
  const extractFeatureMap = useAction(api.feature_maps.extractFeatureMap);

  const [extracting, setExtracting] = useState(false);
  const [extractError, setExtractError] = useState("");

  const hasPrd = featureMaps && featureMaps.length > 0;
  const prdDocId = featureMaps?.[0]?.prdId;

  async function handleExtract() {
    if (!prdDocId || !user?._id) return;
    setExtractError("");
    setExtracting(true);
    try {
      await extractFeatureMap({
        prdDocumentId: prdDocId,
        projectId,
        scopeId: user._id,
      });
    } catch (e) {
      setExtractError(e instanceof Error ? e.message : "Extraction failed");
    } finally {
      setExtracting(false);
    }
  }

  if (project === undefined || featureMaps === undefined) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
        Loading...
      </div>
    );
  }

  if (project === null) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <p className="text-inkwell">Project not found</p>
        <Link href="/" className="text-clay-violet hover:underline text-sm">
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto p-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-inkwell hover:text-pitch-black mb-6 transition-colors"
      >
        <IconArrowLeft size={16} />
        Back to Projects
      </Link>

      <h1 className="text-[32px] leading-tight font-bold text-pitch-black mb-2">{project.name}</h1>
      <p className="text-inkwell mb-6">{project.description}</p>

      <div className="border border-oatmeal rounded-cards bg-ghost-white p-6 mb-8">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-medium text-inkwell mb-1">Target URL</p>
            <a
              href={project.baseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-clay-violet hover:underline"
            >
              {project.baseUrl}
            </a>
          </div>
          <div>
            <p className="text-xs font-medium text-inkwell mb-1">Created</p>
            <p className="text-sm text-pitch-black">
              {new Date(project._creationTime).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* PRD Upload Section */}
      <div className="mb-8">
        <PrdUpload projectId={projectId} onUploaded={() => window.location.reload()} />
      </div>

      {/* Extract Features Button */}
      {prdDocId && (
        <div className="mb-8">
          <Button
            onClick={handleExtract}
            disabled={extracting}
            loading={extracting}
            className="gap-2"
          >
            <IconSparkles size={16} />
            {extracting ? "Extracting features..." : "Extract Features"}
          </Button>
          {extractError && (
            <p className="text-xs text-error mt-2">{extractError}</p>
          )}
        </div>
      )}

      {/* Feature Map Display */}
      {hasPrd && (
        <div className="border border-oatmeal rounded-cards bg-ghost-white p-6">
          <FeatureMapView projectId={projectId} />
        </div>
      )}

      {!hasPrd && (
        <div className="border border-oatmeal rounded-cards bg-ghost-white p-8 flex flex-col items-center gap-3">
          <p className="text-inkwell text-sm">
            Upload a PRD document and extract features to get started.
          </p>
        </div>
      )}
    </div>
  );
}
