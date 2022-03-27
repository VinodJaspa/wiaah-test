import React from "react";
import { CSSValueUnit } from "types/sharedTypes/css/valueUnit";
import { CSSValueUnitToString } from "../helpers/CSSValueUnitToString";
export interface PrefixProps {
  prefix: React.ReactNode;
  spacing?: CSSValueUnit;
}
export const Prefix: React.FC<PrefixProps> = ({
  children,
  prefix,
  spacing,
}) => {
  const styles: React.CSSProperties = {
    gap: CSSValueUnitToString(spacing ? spacing : { value: 0.5 }),
  };
  return (
    <div className="flex items-center" style={styles}>
      {prefix}
      {children}
    </div>
  );
};
