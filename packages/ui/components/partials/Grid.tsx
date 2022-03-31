import React from "react";
import { CSSValueUnit } from "types/sharedTypes/css/valueUnit";
import { CSSValueUnitToString } from "../helpers/CSSValueUnitToString";

export interface GridProps {
  cols: number;
  rows?: number;
  colsGap?: CSSValueUnit;
  rowsGap?: CSSValueUnit;
  colWidth?: CSSValueUnit;
  rowHeight?: CSSValueUnit;
  fullWidth?: boolean;
  fullHeight?: boolean;
  width?: CSSValueUnit;
  height?: CSSValueUnit;
}

export const Grid: React.FC<GridProps> = ({
  children,
  cols,
  rows,
  colsGap,
  rowsGap,
  colWidth,
  rowHeight,
  fullWidth,
  fullHeight,
  width,
  height,
}) => {
  const styles: React.CSSProperties = {
    gridTemplateColumns: `repeat(${cols},${
      colWidth ? CSSValueUnitToString(colWidth) : "1fr"
    })`,
  };
  if (width && !fullWidth) {
    styles.width = CSSValueUnitToString(width);
  }
  if (height && !fullHeight) {
    styles.height = CSSValueUnitToString(height);
  }
  if (fullWidth) {
    styles.width = "100%";
  }
  if (fullHeight) {
    styles.height = "100%";
  }
  if (colsGap) {
    styles.columnGap = CSSValueUnitToString(colsGap);
  }
  if (rowsGap) {
    styles.rowGap = CSSValueUnitToString(rowsGap);
  }
  if (rows) {
    styles.gridTemplateRows = `repeat(${rows},${
      rowHeight ? CSSValueUnitToString(rowHeight) : "1fr"
    })`;
  }
  return (
    <div style={styles} className="grid w-fit">
      {children}
    </div>
  );
};
