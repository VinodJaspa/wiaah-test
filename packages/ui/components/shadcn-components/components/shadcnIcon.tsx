import { cn } from "../lib/utils";
import { IconType } from "react-icons";

interface ShadcnIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as: IconType;
  className?: string;
}

export function ShadcnIcon({ as: Icon, className, ...props }: ShadcnIconProps) {
  return <button className={cn("w-6 h-6", className)} {...props}>
    <Icon />
  </button>;
}
