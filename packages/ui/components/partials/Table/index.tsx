import React from "react";
import {
  HtmlTableProps,
  HtmlTrProps,
  HtmlTdProps,
  HtmlThProps,
  HtmlTableBodyProps,
  HtmlTableHeadProps,
} from "types";

export interface TableProps extends HtmlTableProps {}

export const Table: React.FC<TableProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <table {...props} className={`${className || ""}`}>
      {children}
    </table>
  );
};

export interface TBody extends HtmlTableBodyProps {}
export const TBody: React.FC<TBody> = ({ className, children, ...props }) => {
  return (
    <tbody {...props} className={`${className || ""}`}>
      {children}
    </tbody>
  );
};
export interface THead extends HtmlTableHeadProps {}
export const THead: React.FC<TBody> = ({ className, children, ...props }) => {
  return (
    <thead {...props} className={`${className || ""}`}>
      {children}
    </thead>
  );
};
export interface TrProps extends HtmlTrProps {}

export const Tr: React.FC<TrProps> = ({ className, children, ...props }) => {
  return (
    <tr {...props} className={`${className || ""}`}>
      {children}
    </tr>
  );
};

export interface ThProps extends HtmlThProps {}
export const Th: React.FC<ThProps> = ({ className, children, ...props }) => {
  return (
    <th {...props} className={`${className || ""} p-4`}>
      {children}
    </th>
  );
};

export interface TdProps extends HtmlTdProps {}
export const Td: React.FC<TdProps> = ({ className, children, ...props }) => {
  return (
    <td {...props} className={`${className || ""} p-4`}>
      {children}
    </td>
  );
};
