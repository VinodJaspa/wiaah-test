import React from "react";
import { PassPropsToFnOrElem } from "utils";

export interface ServicesSearchGridProps<TData, TProps> {
  data: TData[];
  component: React.ReactNode;
  gridRule?: string;
  handlePassData: (data: TData, index?: number) => TProps;
}

export function ServicesSearchGrid<TData, TProps>({
  component,
  data,
  handlePassData,
  gridRule,
}: ServicesSearchGridProps<TData, TProps>): JSX.Element {
  return (
    <div
      style={{
        gridTemplateColumns: gridRule
          ? gridRule
          : "repeat(auto-fit,minmax(10rem,23%))",
      }}
      className="w-full gap-4 grid"
    >
      {Array.isArray(data)
        ? data.map((d, i) => (
            <>{PassPropsToFnOrElem(component, { ...handlePassData(d, i) })}</>
          ))
        : null}
    </div>
  );
}
