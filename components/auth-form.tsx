"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { authClient } from "@/lib/auth-client";

type AuthFormProps = {
  mode: "signIn" | "signUp";
  title: string;
  subtitle: string;
  submitLabel: string;
  loadingLabel: string;
  serverError: string;
  loading: boolean;
  disabled?: boolean;
  footerLink: {
    label: string;
    href: string;
    text: string;
  };
  children: ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export function AuthForm({
  title,
  subtitle,
  submitLabel,
  loadingLabel,
  serverError,
  loading,
  disabled = false,
  footerLink,
  children,
  onSubmit,
}: AuthFormProps) {
  return (
    <div className="min-h-full flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {title}
          </h1>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>

        <div className="border border-border rounded-cards bg-background p-6">
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            {children}

            {serverError && (
              <p className="text-sm text-error">{serverError}</p>
            )}

            <Button type="submit" disabled={disabled || loading} loading={loading}>
              {loading ? loadingLabel : submitLabel}
            </Button>
          </form>

          <div className="mt-4 pt-4 border-t border-border flex flex-col gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                authClient.signIn.social({ provider: "github" })
              }
            >
              <IconBrandGithub />
              Continue with GitHub
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                authClient.signIn.social({ provider: "google" })
              }
            >
              <IconBrandGoogle />
              Continue with Google
            </Button>
          </div>
        </div>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          {footerLink.text}{" "}
          <a
            href={footerLink.href}
            className="text-accent-foreground hover:underline"
          >
            {footerLink.label}
          </a>
        </p>
      </div>
    </div>
  );
}
