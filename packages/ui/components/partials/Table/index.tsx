import React from "react";
import {
  HtmlTableProps,
  HtmlTrProps,
  HtmlTdProps,
  HtmlThProps,
  HtmlTableBodyProps,
  HtmlTableHeadProps,
} from "types";

interface TableContextValue {
  TdProps?: HtmlTdProps;
  ThProps?: HtmlThProps;
  TrProps?: HtmlTrProps;
}

const TableContext = React.createContext<TableContextValue>({
  TdProps: {},
  ThProps: {},
  TrProps: {},
});

export type TableProps = HtmlTableProps & TableContextValue & {};

export const Table: React.FC<TableProps> = ({
  className,
  children,
  TdProps,
  ThProps,
  TrProps,
  ...props
}) => {
  return (
    <TableContext.Provider value={{ TdProps, ThProps, TrProps }}>
      <table {...props} className={`${className || ""}`}>
        {children}
      </table>
    </TableContext.Provider>
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
  const { TrProps } = React.useContext(TableContext);
  return (
    <tr
      {...props}
      className={`${className || ""} ${
        TrProps && typeof TrProps.className === "string"
          ? TrProps.className
          : ""
      }`}
    >
      {children}
    </tr>
  );
};

export interface ThProps extends HtmlThProps {}
export const Th: React.FC<ThProps> = ({ className, children, ...props }) => {
  const { ThProps } = React.useContext(TableContext);
  return (
    <th
      {...props}
      className={`${className || ""} ${
        ThProps && typeof ThProps.className === "string"
          ? ThProps.className
          : ""
      } p-4`}
    >
      {children}
    </th>
  );
};

export interface TdProps extends HtmlTdProps {}
export const Td: React.FC<TdProps> = ({ className, children, ...props }) => {
  const { TdProps } = React.useContext(TableContext);
  return (
    <td
      {...props}
      className={`${className || ""} ${
        TdProps && typeof TdProps.className === "string"
          ? TdProps.className
          : ""
      } p-4`}
    >
      {children}
    </td>
  );
};
