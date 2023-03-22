import React from "react";
import { HtmlDivProps } from "types";

export interface ScrollingWrapperProps extends HtmlDivProps {
  horizonatal?: boolean;
}

export const ScrollingWrapper: React.FC<ScrollingWrapperProps> = ({
  children,
  className,
  horizonatal = false,
  ...props
}) => {
  return (
    <div
      {...props}
      className={`${className || ""} w-full h-full thinScroll ${
        horizonatal
          ? "overflow-x-scroll overflow-y-hidden"
          : "overflow-y-scroll overflow-x-hidden"
      }`}
    >
      {children}
    </div>
  );
};
