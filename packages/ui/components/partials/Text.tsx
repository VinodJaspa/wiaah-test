import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import { CSSValueUnit, Size } from "types";
import { CSSValueUnitToString } from "../helpers/CSSValueUnitToString";

export interface TextProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  maxLines?: number;
  color?: string;
  size?: Size;
  customSize?: CSSValueUnit;
  lineThrough?: boolean;
  noWrap?: boolean;
}

export const Text: React.FC<TextProps> = ({
  children,
  color = "#000",
  maxLines,
  size,
  lineThrough,
  customSize,
  noWrap,
  ...props
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
  if (noWrap) {
    styles.whiteSpace = "nowrap";
  }

  return (
    <p
      {...props}
      className={`${size ? `text-${size}` : ""} ${
        lineThrough ? "line-through" : ""
      }`}
      style={styles}
    >
      {children}
    </p>
  );
};
