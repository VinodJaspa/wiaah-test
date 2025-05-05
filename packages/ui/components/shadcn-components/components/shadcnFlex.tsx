import { cn } from "../lib/utils";
import { forwardRef } from "react";

interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  justify?: keyof typeof justifyMap;
  align?: keyof typeof alignMap;
  gap?: number;
  direction?: "row" | "column";
}

const justifyMap = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
};

const alignMap = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

export const ShadcnFlex = forwardRef<HTMLDivElement, FlexProps>(
  ({ children, className, justify = "start", align = "start", gap = 0, direction = "row", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          justifyMap[justify],
          alignMap[align],
          gap ? `gap-${gap}` : "",
          direction === "column" ? "flex-col" : "flex-row",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ShadcnFlex.displayName = "ShadcnFlex"; // For better debugging
