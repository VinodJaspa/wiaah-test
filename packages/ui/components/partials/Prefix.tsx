import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import { CSSValueUnit } from "types/sharedTypes/css/valueUnit";
import { CSSValueUnitToString } from "../helpers/CSSValueUnitToString";

export interface PrefixProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  Prefix: React.TrackableComponent;
  spacing?: CSSValueUnit;
}
export const Prefix: React.FC<PrefixProps> = ({
  children,
  Prefix,
  spacing,
}) => {
  const styles: React.CSSProperties = {
    gap: CSSValueUnitToString(spacing ? spacing : { value: 0.5 }),
  };
  return (
    <div className="flex items-center" style={styles}>
      {Prefix}
      {children}
    </div>
  );
};
