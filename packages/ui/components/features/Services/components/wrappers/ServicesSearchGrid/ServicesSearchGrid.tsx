import React from "react";
import { PassPropsToChild, randomNum, PassPropsToFnOrElem } from "utils";

export interface ServicesSearchGridProps<TData, TProps> {
  data: TData[];
  component: React.ReactNode;
  gridRule?: string;
  handlePassData: (data: TData, index?: number) => TProps;
  cols?: number;
}

export function ServicesSearchGrid<TData, TProps>({
  component,
  data,
  handlePassData,
  gridRule,
  cols = 4,
}: ServicesSearchGridProps<TData, TProps>): JSX.Element {
  return (
    <div
      style={{
        gridTemplateColumns: gridRule
          ? gridRule
          : `repeat(auto-fill,minmax(13rem, calc(${100 / cols}% - 1rem)))`,
      }}
      className="w-full justify-center gap-y-8 gap-x-4 grid"
    >
      {Array.isArray(data)
        ? data.map((d, i) => (
            <>
              {PassPropsToFnOrElem(component, {
                ...handlePassData(d, i),
                key: `${randomNum(5000)}-${i}`,
              })}
            </>
          ))
        : null}
    </div>
  );
}
