import { cn } from "../lib/utils";

interface ShadcnLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export function ShadcnLink({ className, ...props }: ShadcnLinkProps) {
  return <a className={cn("text-blue-500 hover:underline", className)} {...props} />;
}
