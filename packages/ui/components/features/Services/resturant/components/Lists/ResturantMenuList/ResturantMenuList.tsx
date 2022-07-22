import { ResturantMenuListType } from "api";
import React from "react";
import { Divider, PriceDisplay } from "ui";

export interface ResturantMenuListProps extends ResturantMenuListType {}

export const ResturantMenuList: React.FC<ResturantMenuListProps> = ({
  menuItems,
  listTitle,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-bold">{listTitle}</p>
      {menuItems.map((item, i) => (
        <div className="font-semibold flex items-center justify-between pr-2">
          <p key={i}>{item.title}</p>
          <Divider />
          <PriceDisplay priceObject={{ amount: item.price }} />
        </div>
      ))}
    </div>
  );
};
