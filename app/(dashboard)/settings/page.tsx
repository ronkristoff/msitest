"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/form-field";

export default function SettingsPage() {
  const user = useQuery(api.auth.getCurrentUser);
  const setApiKey = useMutation(api.credentials.setApiKey);

  const [apiKey, setApiKeyValue] = useState("");
  const [provider, setProvider] = useState("openai");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!user?._id || !apiKey.trim()) return;

    setSaving(true);
    setMessage("");
    try {
      await setApiKey({
        scopeId: user._id,
        apiKey: apiKey.trim(),
        provider,
      });
      setMessage("API key saved.");
      setApiKeyValue("");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  if (user === undefined) {
    return (
      <div className="max-w-[800px] mx-auto p-8">
        <div className="flex items-center justify-center py-24 text-muted-foreground text-sm">
          Loading...
        </div>
      </div>
    );
  }

  if (user === null) {
    return (
      <div className="max-w-[800px] mx-auto p-8">
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <p className="text-inkwell">Sign in to access settings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[800px] mx-auto p-8">
      <h1 className="text-[32px] leading-tight font-bold text-pitch-black mb-2">Settings</h1>
      <p className="text-inkwell mb-8">
        Configure your LLM provider and API key for AI-powered features.
      </p>

      <div className="border border-oatmeal rounded-cards bg-ghost-white p-6">
        <h2 className="text-base font-semibold text-pitch-black mb-4">LLM Provider</h2>

        <form onSubmit={handleSave} className="flex flex-col gap-4 max-w-md">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-inkwell">Provider</label>
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="h-9 px-3 rounded-buttons border border-oatmeal bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-clay-violet"
            >
              <option value="openai">OpenAI</option>
              <option value="custom">Custom (OpenAI-compatible)</option>
            </select>
          </div>

          <FormField label="API Key" htmlFor="apiKey">
            <Input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKeyValue(e.target.value)}
              className="h-9 rounded-buttons border-oatmeal bg-background text-foreground placeholder:text-muted-foreground/50"
              placeholder="sk-..."
            />
          </FormField>

          <p className="text-xs text-inkwell">
            Your API key is encrypted at rest. It is only decrypted in Convex actions when making LLM calls.
            We never store it in plaintext or send it to the browser.
          </p>

          <div className="flex items-center gap-3">
            <Button type="submit" disabled={saving || !apiKey.trim()} loading={saving}>
              {saving ? "Saving..." : "Save API Key"}
            </Button>
            {message && (
              <p className={`text-sm ${message.includes("saved") ? "text-success" : "text-error"}`}>
                {message}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
