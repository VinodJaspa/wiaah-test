import { cn } from "../lib/utils";
import { forwardRef } from "react";

export interface ShadcnTextProps {
  children: React.ReactNode;
  className?: string;
}

export const ShadcnText = forwardRef<HTMLParagraphElement, ShadcnTextProps>(
  ({ children, className }, ref) => {
    return <p ref={ref} className={cn("w-full text-gray-500", className)}>{children}</p>;
  }
);

ShadcnText.displayName = "ShadcnText"; 
