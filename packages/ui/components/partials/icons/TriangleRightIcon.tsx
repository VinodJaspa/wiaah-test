import React from "react";
import { HtmlDivProps, HtmlSvgProps } from "types";

export const TriangleRightIcon: React.FC<HtmlDivProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      style={{ clipPath: "polygon(0 0, 0% 100%, 100% 50%)" }}
      className={`${className || ""}`}
    />
  );
};
