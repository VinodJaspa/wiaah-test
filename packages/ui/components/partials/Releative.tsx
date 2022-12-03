import React from "react";
import { CSSValueUnit } from "types";
import { CSSValueUnitToString } from "../helpers/CSSValueUnitToString";
export interface ReleativeProps {
  width?: CSSValueUnit;
  height?: CSSValueUnit;
  fullWidth?: boolean;
  fullHeight?: boolean;
}
export const Releative: React.FC<ReleativeProps> = ({
  children,
  fullHeight,
  fullWidth,
  height,
  width,
}) => {
  const styles: React.CSSProperties = {
    height: fullHeight
      ? "100%"
      : height
      ? CSSValueUnitToString(height)
      : "fit-content",
  };

  if (width && !fullWidth) {
    styles.width = CSSValueUnitToString(width);
  }

  return (
    <div style={styles} className="relative">
      {children}
    </div>
  );
};
