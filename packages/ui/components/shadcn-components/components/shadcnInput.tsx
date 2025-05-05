import { forwardRef } from "react";
import { cn } from "../lib/utils";



// Input Component
export const ShadcnInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return <input ref={ref} className={cn("w-full border border-gray-300 rounded-md p-2", className)} {...props} />;
  }
);
ShadcnInput.displayName = "ShadcnInput";
