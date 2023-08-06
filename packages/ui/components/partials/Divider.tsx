import React from "react";
import { twMerge } from "tailwind-merge";
import { HtmlDivProps } from "types";
export interface DividerProps extends HtmlDivProps {
  variant?: "vert" | "hori";
}
export const Divider: React.FC<DividerProps> = ({
  variant,
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={twMerge(
        `${
          variant === "vert" ? "border-l h-full mx-2" : "border-b  w-full my-2"
        } border-opacity-30 border-[#C1C1C1]`,
        className
      )}
    ></div>
  );
};
