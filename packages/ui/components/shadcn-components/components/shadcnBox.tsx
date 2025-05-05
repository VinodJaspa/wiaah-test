import { cn } from "../lib/utils";

export function ShadcnBox({
  children,
  className,
  before,
  after,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  before?: string;
  after?: string;
  onClick?: () => void;
}) {
  return (
    <div className={cn("relative w-full h-full overflow-hidden transition-all duration-500", className)} onClick={onClick}>
      {/* Before pseudo-element */}
      {before && <div className={cn("absolute left-0 top-0 w-[50px] h-full", before)}></div>}

      {/* After pseudo-element */}
      {after && <div className={cn("absolute right-0 top-0 w-[50px] h-full", after)}></div>}

      {children}
    </div>
  );
}
