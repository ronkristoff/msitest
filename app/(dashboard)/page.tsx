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
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-heading font-bold text-brand-dark mb-2">Projects</h1>
          <p className="text-body text-secondary">
            E2E test projects and their run history.
          </p>
        </div>
        <CreateProjectDialog />
      </div>

      {projects === undefined ? (
        <div className="flex items-center justify-center py-24 text-secondary text-body-sm">
          Loading...
        </div>
      ) : projects.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
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
    <div className="rounded-cards bg-surface shadow-raised py-20 px-8 flex flex-col items-center gap-6">
      <div className="w-16 h-16 rounded-full bg-brand-blue/8 flex items-center justify-center text-brand-blue">
        <IconFolder size={28} stroke={1.5} />
      </div>
      <div className="text-center">
        <p className="text-heading-sm font-semibold text-brand-dark mb-2">No projects yet</p>
        <p className="text-body text-secondary max-w-sm mx-auto">
          Create your first project by providing a target URL and description.
        </p>
      </div>
      <CreateProjectDialog />
    </div>
  );
}

function ProjectCard({ project }: { project: Doc<"projects"> }) {
  const created = new Date(project._creationTime).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <Link
      href={`/projects/${project._id}`}
      className="group block rounded-cards border border-border-subtle bg-surface p-5 shadow-raised transition-shadow transition-colors hover:shadow-overlay hover:border-border"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="text-subheading font-semibold text-brand-dark transition-colors">
          {project.name}
        </h3>
        <span className="text-caption text-muted shrink-0 mt-1">{created}</span>
      </div>
      <p className="text-body-sm text-secondary mb-4 line-clamp-2">{project.description}</p>
      <div className="flex items-center gap-3 text-caption text-muted">
        <span className="truncate">{project.baseUrl}</span>
        <span className="w-1 h-1 rounded-full bg-muted shrink-0" />
        <span className="text-brand-blue font-medium">View details</span>
      </div>
    </Link>
  );
}
