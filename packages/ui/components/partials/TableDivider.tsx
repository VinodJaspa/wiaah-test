import React from "react";
import { Divider, DividerProps } from "./Divider";

export interface TableDividerProps extends DividerProps {
  cols: number;
}

export const TableDivider: React.FC<TableDividerProps> = ({
  cols,
  ...props
}) => {
  return (
    <tr>
      {[...Array(cols)].map(() => (
        <td>
          <Divider {...props} />
        </td>
      ))}
    </tr>
  );
};
