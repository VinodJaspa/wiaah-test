import { ResturantMenuListType } from "api";
import React from "react";
import { Divider, PriceDisplay, CountInput } from "ui";

export interface ResturantMenuListProps extends ResturantMenuListType {}

export const ResturantMenuList: React.FC<ResturantMenuListProps> = ({
  menuItems,
  listTitle,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-bold">{listTitle}</p>
      {menuItems.map((item, i) => (
        <div className="font-semibold flex items-center pr-2">
          <div className="flex gap-4 w-fit whitespace-nowrap">
            <span className="text-xl">
              <CountInput min={0} max={50} onCountChange={() => {}} />
            </span>
            <p key={i}>{item.title}</p>
          </div>

          <Divider className="w-full my-0 border-b border-dotted mx-2 border-b-gray-300" />
          <PriceDisplay priceObject={{ amount: item.price }} />
        </div>
      ))}
    </div>
  );
};
