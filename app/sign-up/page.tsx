"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { AuthForm } from "@/components/auth-form";
import { authClient } from "@/lib/auth-client";

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignUpForm = z.infer<typeof signUpSchema>;

const inputClass =
  "h-9 rounded-buttons border-oatmeal bg-background text-foreground placeholder:text-muted-foreground/50";
const errorClass = "text-xs text-error mt-1";

export default function SignUpPage() {
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
  });

  async function onSubmit(data: SignUpForm) {
    setServerError("");
    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    if (error) setServerError(error.message || "Sign up failed");
    setLoading(false);
  }

  return (
    <AuthForm
      mode="signUp"
      title="Create your account"
      subtitle="Start testing with MSI"
      submitLabel="Sign up"
      loadingLabel="Creating account..."
      serverError={serverError}
      loading={loading}
      footerLink={{
        label: "Sign in",
        href: "/sign-in",
        text: "Already have an account?",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-xs font-medium text-muted-foreground">
          Name
        </label>
        <Input
          id="name"
          type="text"
          {...register("name")}
          className={inputClass}
          placeholder="Your name"
        />
        {errors.name && <p className={errorClass}>{errors.name.message}</p>}
      </div>

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
          placeholder="At least 8 characters"
        />
        {errors.password && (
          <p className={errorClass}>{errors.password.message}</p>
        )}
      </div>
    </AuthForm>
  );
}
