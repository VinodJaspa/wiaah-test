
import { ShadcnLabel } from "@UI/components/shadcn-components";
import { cn } from "@UI/components/shadcn-components/lib/utils";
import type { ReactNode } from "react";
import { Controller, type Control } from "react-hook-form";

interface FormFieldProps {
  name: string;
  label?: string;
  control: Control<any>;
  children: ReactNode;
  leftElement?: ReactNode;
}

export function FormField({
  name,
  label,
  control,
  children,
  leftElement,
}: FormFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={cn("space-y-2", error && "text-red-500")}>
          {label && <ShadcnLabel htmlFor={label} className="text-sm">{label}</ShadcnLabel>}
          <div className="relative">
            {leftElement && (
              <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
                {leftElement}
              </div>
            )}
            {children}
          </div>
          {error?.message && <p className="text-xs">{error.message}</p>}
        </div>
      )}
    />
  );
}
