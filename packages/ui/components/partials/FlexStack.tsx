import React, { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import { CSSValueUnit } from "types";
import { CSSValueUnitToString } from "../helpers/CSSValueUnitToString";

export interface FlexStackProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  direction?: "vertical" | "horizontal";
  alignItems?: "center" | "start" | "end";
  reverse?: boolean;
  wrap?: boolean;
  setId?: string;
  justify?: "center" | "between" | "around" | "evenly" | "start" | "end";
  fullWidth?: boolean;
  fullHeight?: boolean;
  fitWidth?: boolean;
  fitHeight?: boolean;
  horizontalSpacingInRem?:
    | 0.25
    | 0.5
    | 0.75
    | 1
    | 1.25
    | 1.5
    | 1.75
    | 2
    | 2.25
    | 2.5
    | 2.75
    | 3
    | number;

  verticalSpacingInRem?:
    | 0.25
    | 0.5
    | 0.75
    | 1
    | 1.25
    | 1.5
    | 1.75
    | 2
    | 2.25
    | 2.5
    | 2.75
    | 3
    | number;
  customClassName?: string;
  width?: CSSValueUnit;
  height?: CSSValueUnit;
}

export const FlexStack: FC<FlexStackProps> = ({
  children,
  reverse,
  direction = "horizontal",
  wrap,
  setId,
  verticalSpacingInRem,
  horizontalSpacingInRem,
  customClassName,
  fullWidth,
  alignItems,
  fullHeight,
  justify = "start",
  fitWidth,
  fitHeight,
  width,
  height,
  ...props
}) => {
  const styles: React.CSSProperties = {};

  switch (direction) {
    case "horizontal":
      if (reverse) {
        styles.flexDirection = "row-reverse";
      } else {
        styles.flexDirection = "row";
      }
      break;
    case "vertical":
      if (reverse) {
        styles.flexDirection = "column-reverse";
      } else {
        styles.flexDirection = "column";
      }
      break;
  }

  if (alignItems) {
    styles.alignItems = alignItems;
  }

  if (wrap) {
    styles.flexWrap = "wrap";
  } else {
    styles.flexWrap = "nowrap";
  }
  if (verticalSpacingInRem) {
    styles.rowGap = `${verticalSpacingInRem}rem`;
  }
  if (horizontalSpacingInRem) {
    styles.columnGap = `${horizontalSpacingInRem}rem`;
  }

  switch (justify) {
    case "between":
      styles.justifyContent = "space-between";
      break;
    case "around":
      styles.justifyContent = "space-around";
      break;
    case "evenly":
      styles.justifyContent = "space-evenly";
      break;
    case "center":
      styles.justifyContent = "center";
      break;
    case "end":
      styles.justifyContent = "end";
      break;
    default:
      styles.justifyContent = "start";
      break;
  }

  if (fullWidth) styles.width = "100%";
  if (fullHeight) styles.height = "100%";
  if (fitWidth) styles.width = "fit-content";
  if (fitHeight) styles.height = "fit-content";

  if (width && !fullWidth && !fitWidth) {
    styles.width = CSSValueUnitToString(width);
  }
  if (height && !fullHeight && !fitHeight) {
    styles.height = CSSValueUnitToString(height);
  }
  return (
    <div
      style={styles}
      className={`${customClassName} flex`}
      {...props}
      id={setId}
    >
      {children}
    </div>
  );
};
