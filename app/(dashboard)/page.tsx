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
          <p className="text-[13px] leading-relaxed text-inkwell">
            E2E test projects and their run history.
          </p>
        </div>
        <CreateProjectDialog />
      </div>

      {projects === undefined ? (
        <div className="flex items-center justify-center py-24 text-inkwell text-[13px]">
          Loading...
        </div>
      ) : projects.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
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
        <p className="text-[15px] font-medium text-pitch-black mb-1">No projects yet</p>
        <p className="text-[13px] text-inkwell max-w-xs">
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
      className="group block rounded-cards border border-oatmeal bg-card p-5 transition-shadow hover:shadow-subtle"
    >
      <h3 className="text-[15px] font-semibold text-pitch-black mb-1 group-hover:text-clay-violet transition-colors">
        {project.name}
      </h3>
      <p className="text-[13px] text-inkwell mb-3 line-clamp-2">{project.description}</p>
      <p className="text-[13px] text-inkwell/60 truncate">{project.baseUrl}</p>
    </Link>
  );
}