import { cn } from "../lib/utils";

interface VStackProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: number;
}

export function ShandcnVStack({ children, className, gap = 4, ...props }: VStackProps) {
  return (
    <div className={cn("flex flex-col", `gap-${gap}`, className)} {...props}>
      {children}
    </div>
  );
}
