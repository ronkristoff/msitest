"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { IconFolder } from "@tabler/icons-react";
import { CreateProjectDialog } from "@/components/create-project-dialog";
import type { Doc } from "@/convex/_generated/dataModel";

export default function Home() {
  const projects = useQuery(api.projects.listProjects);

  return (
    <div className="max-w-[1200px] mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[32px] leading-tight font-bold text-pitch-black mb-1">Projects</h1>
          <p className="text-inkwell">
            Manage your E2E test projects.
          </p>
        </div>
        <CreateProjectDialog />
      </div>

      {projects === undefined ? (
        <div className="flex items-center justify-center py-24 text-muted-foreground text-sm">
          Loading...
        </div>
      ) : projects.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project: Doc<"projects">) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="border border-oatmeal rounded-cards p-12 flex flex-col items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-cloud-gray flex items-center justify-center text-platinum-gray">
        <IconFolder size={20} stroke={1.5} />
      </div>
      <div className="text-center">
        <p className="text-base font-medium text-pitch-black mb-1">No projects yet</p>
        <p className="text-sm text-inkwell max-w-xs">
          Create your first project by providing a target URL and description.
        </p>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Doc<"projects"> }) {
  return (
    <Link
      href={`/projects/${project._id}`}
      className="block border border-oatmeal rounded-cards bg-ghost-white p-5 hover:border-clay-violet/30 hover:bg-clay-violet/5 transition-colors"
    >
      <h3 className="text-base font-semibold text-pitch-black mb-1">{project.name}</h3>
      <p className="text-sm text-inkwell mb-3 line-clamp-2">{project.description}</p>
      <p className="text-xs text-platinum-gray truncate">{project.baseUrl}</p>
    </Link>
  );
}
