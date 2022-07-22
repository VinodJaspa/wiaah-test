import { ResturantMenuData } from "api";
import React from "react";
import { ResturantMenuList } from "ui";

export interface ResturantMenuListSectionProps extends ResturantMenuData {}

export const ResturantMenuListSection: React.FC<
  ResturantMenuListSectionProps
> = ({ menus }) => {
  return (
    <div className="flex flex-col gap-8">
      {Array.isArray(menus)
        ? menus.map((menu, i) => <ResturantMenuList key={i} {...menu} />)
        : null}
    </div>
  );
};
