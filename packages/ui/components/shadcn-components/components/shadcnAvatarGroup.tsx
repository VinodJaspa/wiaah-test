import { cn } from "../lib/utils";
import React from "react";

interface ShadcnAvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  children: React.ReactNode;
}

export function ShadcnAvatarGroup({ max = 3, children, className, ...props }: ShadcnAvatarGroupProps) {
  const avatars = React.Children.toArray(children).slice(0, max); // Limit the number of avatars displayed

  return (
    <div className={cn("flex -space-x-2", className)} {...props}>
      {avatars}
    </div>
  );
}
