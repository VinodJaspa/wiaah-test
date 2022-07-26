import { ResturantMenuListType } from "api";
import React from "react";
import { Divider, PriceDisplay, CountInput } from "ui";

export interface ResturantMenuListProps extends ResturantMenuListType {
  onMenuListChange: (menuItemId: string, quantity: number) => any;
}

export const ResturantMenuList: React.FC<ResturantMenuListProps> = ({
  menuItems,
  listTitle,
  onMenuListChange,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-bold">{listTitle}</p>
      {menuItems.map((item, i) => (
        <div className="font-semibold flex items-center pr-2">
          <p className="w-fit" key={i}>
            {item.title}
          </p>

          <Divider className="md:w-full my-0 border-b border-dotted mx-2 border-b-gray-300" />
          <div className="flex gap-4 w-fit md:whitespace-nowrap">
            <PriceDisplay priceObject={{ amount: item.price }} />
            <span className="text-xl">
              <CountInput
                min={0}
                max={50}
                onCountChange={(quantity) =>
                  onMenuListChange && onMenuListChange(item.id, quantity)
                }
              />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
