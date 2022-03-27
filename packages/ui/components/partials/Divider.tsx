import React from "react";
import { CSSValueUnit } from "types/sharedTypes/css/valueUnit";
import { CSSValueUnitToString } from "../helpers/CSSValueUnitToString";
export interface DividerProps {
  height?: CSSValueUnit;
  marginY?: CSSValueUnit;
}
export const Divider: React.FC<DividerProps> = ({ height, marginY }) => {
  const styles: React.CSSProperties = {
    height: height ? CSSValueUnitToString(height) : "1px",
    marginTop: marginY ? CSSValueUnitToString(marginY) : "1rem",
    marginBottom: marginY ? CSSValueUnitToString(marginY) : "1rem",
  };
  return (
    <>
      <div style={styles} className={`flex w-full bg-gray-200`}></div>
    </>
  );
};
