import { cn } from "../lib/utils";

interface ShadcnCenterProps extends React.HTMLAttributes<HTMLDivElement> {
  isVisible?: boolean;
}

export function ShadcnProfileOverlay({ isVisible = false, className, ...props }: ShadcnCenterProps) {
  return (
    <div
      className={cn(
        "absolute top-0 left-0 w-full h-full rounded-full cursor-pointer z-[5] bg-black/50",
        isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        className
      )}
      {...props}
    />
  );
}
