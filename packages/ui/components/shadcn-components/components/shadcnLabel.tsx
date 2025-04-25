import { forwardRef } from "react";
import { cn } from "../lib/utils";

// Label Component
export const ShadcnLabel = forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
    ({ className, children, ...props }, ref) => {
      return (
        <label ref={ref} className={cn("text-sm font-medium", className)} {...props}>
          {children}
        </label>
      );
    }
  );
  ShadcnLabel.displayName = "ShadcnLabel";