import { cn } from "../lib/utils";

interface ShadcnStackProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ShadcnStack({ className, ...props }: ShadcnStackProps) {
  return <div className={cn("flex items-center space-x-2", className)} {...props} />;
}
