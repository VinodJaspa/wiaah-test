import React from "react";
import { HtmlDivProps } from "types";

export interface BoxShadowProps extends HtmlDivProps {
  color?: string;
  fitWidth?: boolean;
  fitHeight?: boolean;
}

export const BoxShadow: React.FC<BoxShadowProps> = ({
  children,
  color = "#000",
  fitHeight,
  fitWidth,
  style,
  ...props
}) => {
  return (
    <div
      style={{
        boxShadow: `0px 3px 15px -15px ${color}`,
        WebkitBoxShadow: `0px 3px 15px -15px ${color}`,
        MozBoxShadow: `0px 3px 15px -15px ${color}`,
        // width: fitWidth ? "fit-content" : "inherit",
        // height: fitHeight ? "fit-content" : "inherit",
        ...style,
      }}
      {...props}
    >
      {/* @ts-ignore */}
      {children}
    </div>
  );
};
