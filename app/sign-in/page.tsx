"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { AuthForm } from "@/components/auth-form";
import { authClient } from "@/lib/auth-client";

const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type SignInForm = z.infer<typeof signInSchema>;

const inputClass =
  "h-9 rounded-buttons border-oatmeal bg-background text-foreground placeholder:text-muted-foreground/50";
const errorClass = "text-xs text-error mt-1";

export default function SignInPage() {
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
  });

  async function onSubmit(data: SignInForm) {
    setServerError("");
    setLoading(true);
    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });
    if (error) setServerError(error.message || "Sign in failed");
    setLoading(false);
  }

  return (
    <AuthForm
      mode="signIn"
      title="Sign in to MSI Test"
      subtitle="AI-powered end-to-end testing platform"
      submitLabel="Sign in"
      loadingLabel="Signing in..."
      serverError={serverError}
      loading={loading}
      footerLink={{
        label: "Sign up",
        href: "/sign-up",
        text: "Don't have an account?",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-xs font-medium text-muted-foreground">
          Email
        </label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          className={inputClass}
          placeholder="you@example.com"
        />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-xs font-medium text-muted-foreground">
          Password
        </label>
        <Input
          id="password"
          type="password"
          {...register("password")}
          className={inputClass}
          placeholder="Enter your password"
        />
        {errors.password && (
          <p className={errorClass}>{errors.password.message}</p>
        )}
      </div>
    </AuthForm>
  );
}
