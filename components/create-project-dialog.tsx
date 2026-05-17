"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/form-field";
import { IconPlus } from "@tabler/icons-react";

const createSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Description is required"),
  baseUrl: z.string().min(1, "Target URL is required").url("Must be a valid URL"),
});

type CreateForm = z.infer<typeof createSchema>;

export function CreateProjectDialog() {
  const [open, setOpen] = useState(false);
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const createProject = useMutation(api.projects.createProject);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<CreateForm>({
    resolver: zodResolver(createSchema),
    mode: "onChange",
  });

  async function onSubmit(data: CreateForm) {
    setServerError("");
    setLoading(true);
    try {
      await createProject(data);
      reset();
      setOpen(false);
    } catch (e) {
      setServerError(e instanceof Error ? e.message : "Failed to create project");
    } finally {
      setLoading(false);
    }
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) reset();
    setOpen(nextOpen);
  }

  const inputClass =
    "h-9 rounded-buttons border-oatmeal bg-background text-foreground placeholder:text-muted-foreground/50";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger className="inline-flex items-center gap-1.5 h-9 px-4 rounded-buttons bg-pitch-black text-ghost-white text-sm font-medium hover:bg-neutral-800 transition-colors">
        <IconPlus size={16} />
        Create Project
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-4">
          <FormField label="Project Name" htmlFor="name" error={errors.name?.message}>
            <Input
              id="name"
              type="text"
              {...register("name")}
              className={inputClass}
              placeholder="My App"
            />
          </FormField>

          <FormField label="Description" htmlFor="description" error={errors.description?.message}>
            <Input
              id="description"
              type="text"
              {...register("description")}
              className={inputClass}
              placeholder="E2E tests for the main web app"
            />
          </FormField>

          <FormField label="Target URL" htmlFor="baseUrl" error={errors.baseUrl?.message}>
            <Input
              id="baseUrl"
              type="url"
              {...register("baseUrl")}
              className={inputClass}
              placeholder="https://app.example.com"
            />
          </FormField>

          {serverError && <p className="text-sm text-error">{serverError}</p>}

          <div className="flex justify-end gap-2 mt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isValid || loading} loading={loading}>
              {loading ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
