import React from "react";
import { PassPropsToChild, randomNum } from "utils";

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
          : "repeat(auto-fill,minmax(10rem, calc(25% - 1rem)))",
      }}
      className="w-full justify-center gap-y-8 gap-x-4 grid"
    >
      {Array.isArray(data)
        ? data.map((d, i) => (
            <>
              {PassPropsToChild(component, {
                ...handlePassData(d, i),
                key: `${randomNum(5000)}-${i}`,
              })}
            </>
          ))
        : null}
    </div>
  );
}
