import React from "react";

export interface BorderProps {
  thinkness?: {
    value: number;
    unit?: "rem" | "em" | "px";
  };
  color?: {
    inHex: string;
  };
  rounded?: {
    value: number;
    unit?: "rem" | "em" | "px";
  };
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
