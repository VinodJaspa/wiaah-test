import React from "react";
import { CSSValueUnit } from "types/sharedTypes/css/valueUnit";
export interface PaddingProps {
  X?: CSSValueUnit;
  Y?: CSSValueUnit;
}

export const Padding: React.FC<PaddingProps> = ({ children, X, Y }) => {
  const styles: React.CSSProperties = {
    paddingLeft: `${X?.value}${X?.unit || "rem"}`,
    paddingRight: `${X?.value}${X?.unit || "rem"}`,
    paddingTop: `${Y?.value}${Y?.unit || "rem"}`,
    paddingBottom: `${Y?.value}${Y?.unit || "rem"}`,
  };
  return <div style={styles}>{children}</div>;
};
