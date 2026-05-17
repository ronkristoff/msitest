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

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignUpForm = z.infer<typeof signUpSchema>;

const inputClass =
  "h-9 rounded-buttons border-oatmeal bg-background text-foreground placeholder:text-muted-foreground/50";

export default function SignUpPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  async function onSubmit(data: SignUpForm) {
    setServerError("");
    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    if (error) {
      setServerError(error.message || "Sign up failed");
      setLoading(false);
    } else {
      router.push("/");
    }
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
      disabled={!isValid}
      footerLink={{
        label: "Sign in",
        href: "/sign-in",
        text: "Already have an account?",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormField label="Name" htmlFor="name" error={errors.name?.message}>
        <Input
          id="name"
          type="text"
          {...register("name")}
          className={inputClass}
          placeholder="Your name"
        />
      </FormField>

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
          placeholder="At least 8 characters"
        />
      </FormField>
    </AuthForm>
  );
}
