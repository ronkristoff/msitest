"use client";

import { useState, useRef } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { IconUpload, IconFileText } from "@tabler/icons-react";
import type { Id } from "@/convex/_generated/dataModel";

type PrdUploadProps = {
  projectId: Id<"projects">;
  onUploaded: () => void;
};

export function PrdUpload({ projectId, onUploaded }: PrdUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadPrdText = useMutation(api.prd_documents_mutations.uploadPrdText);

  async function handleFile(file: File) {
    setFileName(file.name);
    setError("");
    setUploading(true);

    try {
      if (file.name.endsWith(".md") || file.name.endsWith(".markdown")) {
        const text = await file.text();
        await uploadPrdText({ projectId, fileName: file.name, content: text });
      } else if (file.name.endsWith(".pdf")) {
        setError("PDF support requires Convex file storage integration. Use markdown files for now.");
        setUploading(false);
        return;
      } else {
        setError("Only .md, .markdown, and .pdf files are supported.");
        setUploading(false);
        return;
      }
      onUploaded();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="border border-oatmeal rounded-cards bg-ghost-white p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-cloud-gray flex items-center justify-center text-inkwell">
          <IconFileText size={16} stroke={1.5} />
        </div>
        <div>
          <h3 className="text-sm font-medium text-pitch-black">Upload PRD</h3>
          <p className="text-xs text-inkwell">
            Upload a markdown (.md) file describing your app features.
          </p>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".md,.markdown,.pdf"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      <Button
        variant="outline"
        disabled={uploading}
        onClick={() => fileInputRef.current?.click()}
        className="w-full gap-2"
      >
        <IconUpload size={14} />
        {uploading ? "Uploading..." : fileName || "Choose File"}
      </Button>

      {error && <p className="text-xs text-error mt-2">{error}</p>}
    </div>
  );
}
