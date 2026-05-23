"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
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

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={<Button size="default" />}
      >
        <IconPlus size={16} />
        Create Project
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Add a new project to start running E2E tests.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 px-6 pb-6">
          <FormField label="Project Name" htmlFor="name" error={errors.name?.message}>
            <Input
              id="name"
              type="text"
              {...register("name")}
              placeholder="My App"
            />
          </FormField>

          <FormField label="Description" htmlFor="description" error={errors.description?.message}>
            <Input
              id="description"
              type="text"
              {...register("description")}
              placeholder="E2E tests for the main web app"
            />
          </FormField>

          <FormField label="Target URL" htmlFor="baseUrl" error={errors.baseUrl?.message}>
            <Input
              id="baseUrl"
              type="url"
              {...register("baseUrl")}
              placeholder="https://app.example.com"
            />
          </FormField>

          {serverError && <p className="text-[13px] text-error">{serverError}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isValid || loading} loading={loading}>
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}