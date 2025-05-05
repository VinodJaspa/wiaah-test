import { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import { cn } from "utils"; // Ensure this is the correct path to your utility

export interface ContainerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  noContainer?: boolean;
}

export const Container: FC<ContainerProps> = ({
  noContainer = false,
  children,
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(className, !noContainer && "container mx-auto h-full mt-8")}
    >
      {children}
    </div>
  );
};
