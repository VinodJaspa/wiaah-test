import React from "react";
import { Size } from "types/sharedTypes/css/size";
import { CSSValueUnit } from "types/sharedTypes/css/valueUnit";
import { CSSValueUnitToString } from "../helpers/CSSValueUnitToString";

export interface TextProps {
  maxLines?: number;
  color?: string;
  size?: Size;
  customSize?: CSSValueUnit;
  lineThrough?: boolean;
}

export const Text: React.FC<TextProps> = ({
  children,
  color = "#000",
  maxLines,
  size,
  lineThrough,
  customSize,
}) => {
  const styles: React.CSSProperties = {
    color,
  };
  if (maxLines && maxLines > 0) {
    (styles.WebkitLineClamp = maxLines),
      (styles.display = "-webkit-box"),
      (styles.overflow = "hidden"),
      (styles.WebkitBoxOrient = "vertical");
  }
  if (customSize) {
    styles.fontSize = CSSValueUnitToString(customSize);
  }

  return (
    <p
      className={`text-${size} ${lineThrough ? "line-through" : ""}`}
      style={styles}
    >
      {children}
    </p>
  );
};
