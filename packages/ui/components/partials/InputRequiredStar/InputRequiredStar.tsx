import React from "react";
import { HtmlDivProps } from "types";

export const InputRequiredStar: React.FC<HtmlDivProps> = ({
  className,
  ...props
}) => {
  return (
    <span
      {...props}
      className={`${className} text-xl font-bold text-red-400 translate-y-1/4 px-1`}
    >
      *
    </span>
  );
};
