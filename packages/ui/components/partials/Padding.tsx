import React from "react";

export interface PaddingProps {
  X?: {
    value: number;
    unit?: "rem" | "em" | "px";
  };
  Y?: {
    value: number;
    unit?: "rem" | "em" | "px";
  };
}

export const Padding: React.FC<PaddingProps> = ({ children, X, Y }) => {
  const styles: React.CSSProperties = {
    paddingLeft: `${X?.value}${X?.unit || "px"}`,
    paddingRight: `${X?.value}${X?.unit || "px"}`,
    paddingTop: `${Y?.value}${Y?.unit || "px"}`,
    paddingBottom: `${Y?.value}${Y?.unit || "px"}`,
  };
  return <div style={styles}>{children}</div>;
};
