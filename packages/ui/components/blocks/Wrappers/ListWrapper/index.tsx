import React from "react";
import { HtmlDivProps } from "types";

export interface ListWrapperProps {
  children?: React.ReactNode[];
  cols?: number;
  gap?: boolean;
  listProps?: HtmlDivProps;
  itemProps?: HtmlDivProps;
  props?: HtmlDivProps;
}

export const ListWrapper: React.FC<ListWrapperProps> = ({
  cols = 1,
  children,
  gap = true,
  props,
  listProps,
  itemProps,
}) => {
  function sort<T>(items: T[], cols: number): { item: T; postion: number }[] {
    let postion = 0;
    const newItems: { item: T; postion: number }[] = [];

    items.forEach((item) => {
      if (postion >= cols) postion = 0;
      newItems.push({ item, postion });
      postion++;
    });

    return newItems;
  }

  return (
    <div
      className={`flex justify-between w-full ${gap ? "gap-4" : ""}`}
      {...props}
    >
      {[...Array(cols)].map((_, index) => (
        <div
          {...listProps}
          data-testid="ListWrapperListContainer"
          style={{ width: `${100 / cols}%` }}
          className={`${gap ? "gap-4" : ""} flex flex-col`}
          key={index}
        >
          {sort(children || [], cols).map(
            ({ item, postion }, i) =>
              postion === index && (
                <div
                  className={`list-wrapper-item flex flex-col gap-4 w-full`}
                  style={{ aspectRatio: "1 / 1" }}
                  {...itemProps}
                  data-testid="ListWrapperItem"
                  key={i}
                >
                  {item}
                </div>
              )
          )}
        </div>
      ))}
    </div>
  );
};
