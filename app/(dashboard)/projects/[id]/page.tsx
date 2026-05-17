"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { IconArrowLeft } from "@tabler/icons-react";
import type { Id } from "@/convex/_generated/dataModel";

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const project = useQuery(api.projects.getProject, {
    projectId: id as Id<"projects">,
  });

  if (project === undefined) {
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

      <div className="border border-oatmeal rounded-cards bg-ghost-white p-6">
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

      <div className="mt-8 border border-oatmeal rounded-cards bg-ghost-white p-8 flex flex-col items-center gap-3">
        <p className="text-inkwell text-sm">PRD upload, feature maps, and test plans coming soon.</p>
      </div>
    </div>
  );
}
