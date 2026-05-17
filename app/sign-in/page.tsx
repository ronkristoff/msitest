"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/form-field";
import { AuthForm } from "@/components/auth-form";
import { authClient } from "@/lib/auth-client";

const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type SignInForm = z.infer<typeof signInSchema>;

const inputClass =
  "h-9 rounded-buttons border-oatmeal bg-background text-foreground placeholder:text-muted-foreground/50";

export default function SignInPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
  });

  async function onSubmit(data: SignInForm) {
    setServerError("");
    setLoading(true);
    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });
    if (error) {
      setServerError(error.message || "Sign in failed");
      setLoading(false);
    } else {
      router.push("/");
    }
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
      disabled={!isValid}
      footerLink={{
        label: "Sign up",
        href: "/sign-up",
        text: "Don't have an account?",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormField label="Email" htmlFor="email" error={errors.email?.message}>
        <Input
          id="email"
          type="email"
          {...register("email")}
          className={inputClass}
          placeholder="you@example.com"
        />
      </FormField>

      <FormField label="Password" htmlFor="password" error={errors.password?.message}>
        <Input
          id="password"
          type="password"
          {...register("password")}
          className={inputClass}
          placeholder="Enter your password"
        />
      </FormField>
    </AuthForm>
  );
}
