import React from "react";
import { HtmlDivProps } from "types";

export const ScrollingWrapper: React.FC<HtmlDivProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={`${className || ""} w-full h-full overflow-y-scroll`}
    >
      {children}
    </div>
  );
};
