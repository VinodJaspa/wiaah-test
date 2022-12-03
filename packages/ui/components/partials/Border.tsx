import React from "react";
import { CSSValueUnit } from "types";
export interface BorderProps {
  thinkness?: CSSValueUnit;
  color?: {
    inHex: string;
  };
  rounded?: CSSValueUnit;
}

export const Border: React.FC<BorderProps> = ({
  children,
  color,
  rounded,
  thinkness,
}) => {
  const styles: React.CSSProperties = {
    borderWidth: `${thinkness?.value}${thinkness?.unit || "px"}`,
    borderColor: color?.inHex,
    borderRadius: `${rounded?.value}${rounded?.unit || "px"}`,
  };

  return <div style={styles}>{children}</div>;
};
