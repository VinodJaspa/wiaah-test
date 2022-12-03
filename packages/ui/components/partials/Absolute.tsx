import React from "react";
import { CSSValueUnit } from "types";
import { CSSValueUnitToString } from "../helpers/CSSValueUnitToString";

export interface AbsoluteProps {
  width?: CSSValueUnit;
  height?: CSSValueUnit;
  fullWidth?: boolean;
  fullHeight?: boolean;
  position: {
    top?: CSSValueUnit;
    bottom?: CSSValueUnit;
    left?: CSSValueUnit;
    right?: CSSValueUnit;
  };
  verticalCenter?: boolean;
  horizontalCenter?: boolean;
}

export const Absolute: React.FC<AbsoluteProps> = ({
  fullHeight,
  fullWidth,
  height,
  width,
  position,
  horizontalCenter,
  verticalCenter,
  children,
}) => {
  const styles: React.CSSProperties = {
    width: fullWidth
      ? "100%"
      : width
      ? CSSValueUnitToString(width)
      : "fit-content",
    height: fullHeight
      ? "100%"
      : height
      ? CSSValueUnitToString(height)
      : "fit-content",
  };

  if (position) {
    Object.entries(position).forEach((entry: [any, CSSValueUnit], i) => {
      const key: "top" | "bottom" | "left" | "right" = entry[0];
      if (verticalCenter && key === "top") return;
      if (verticalCenter && key === "bottom") return;
      if (horizontalCenter && key === "left") return;
      if (horizontalCenter && key === "right") return;
      const value = entry[1];
      styles[key] = CSSValueUnitToString(value);
    });
  }

  return (
    <div
      style={styles}
      className={`absolute ${verticalCenter ? "top-1/2 translate-y-1/2" : ""} ${
        horizontalCenter ? "left-1/2 translate-x-1/2" : ""
      }`}
    >
      {children}
    </div>
  );
};
