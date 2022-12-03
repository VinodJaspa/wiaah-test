import React from "react";
import { CSSValueUnit } from "types";
import { CSSValueUnitToString } from "../helpers/CSSValueUnitToString";
export interface PaddingProps {
  X?: CSSValueUnit;
  Y?: CSSValueUnit;
  top?: CSSValueUnit;
  bottom?: CSSValueUnit;
  left?: CSSValueUnit;
  right?: CSSValueUnit;
}

export const Padding: React.FC<PaddingProps> = ({
  children,
  X,
  Y,
  bottom,
  left,
  right,
  top,
}) => {
  const styles: React.CSSProperties = {
    paddingLeft: left
      ? CSSValueUnitToString(left)
      : X
      ? CSSValueUnitToString(X)
      : 0,
    paddingRight: right
      ? CSSValueUnitToString(right)
      : X
      ? CSSValueUnitToString(X)
      : 0,
    paddingBottom: bottom
      ? CSSValueUnitToString(bottom)
      : Y
      ? CSSValueUnitToString(Y)
      : 0,
    paddingTop: top
      ? CSSValueUnitToString(top)
      : Y
      ? CSSValueUnitToString(Y)
      : 0,
    width: "inherit",
  };
  return <div style={styles}>{children}</div>;
};
