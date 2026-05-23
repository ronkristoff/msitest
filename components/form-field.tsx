import type { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
};

export function FormField({ label, htmlFor, error, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-body-sm font-medium text-inkwell">
        {label}
      </label>
      {children}
      {error && <p className="text-body-sm text-error mt-1">{error}</p>}
    </div>
  );
}
