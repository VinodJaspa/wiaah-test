import {
  DetailedHTMLProps,
  HTMLAttributes,
  InputHTMLAttributes,
  SelectHTMLAttributes,
  ButtonHTMLAttributes,
  TableHTMLAttributes,
  ThHTMLAttributes,
  TdHTMLAttributes,
} from "react";

export type HtmlDivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export type HtmlInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type HtmlSelectProps = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

export type HtmlButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export type HtmlTableProps = DetailedHTMLProps<
  TableHTMLAttributes<HTMLTableElement>,
  HTMLTableElement
>;
export type HtmlTableBodyProps = DetailedHTMLProps<
  HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>;
export type HtmlTableHeadProps = DetailedHTMLProps<
  HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>;
export type HtmlTrProps = DetailedHTMLProps<
  HTMLAttributes<HTMLTableRowElement>,
  HTMLTableRowElement
>;
export type HtmlTdProps = DetailedHTMLProps<
  TdHTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>;
export type HtmlThProps = DetailedHTMLProps<
  ThHTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>;
