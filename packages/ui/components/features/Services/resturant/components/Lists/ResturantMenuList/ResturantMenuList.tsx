import React from "react";
import { PriceDisplay, CountInput, AspectRatioImage } from "@UI";
import { mapArray } from "utils";
import { Dish, RestaurantMenu } from "@features/API";

export interface ResturantMenuListProps {
  onMenuListChange: (menuItemId: string, quantity: number) => any;
  menu: Pick<RestaurantMenu, "name" | "id"> & {
    dishs: Pick<Dish, "name" | "thumbnail" | "ingredients" | "price" | "id">[];
  };
}

export const ResturantMenuList: React.FC<ResturantMenuListProps> = ({
  menu,
  onMenuListChange,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-bold">{menu.name}</p>
      {mapArray(menu.dishs, (item, i) => (
        <div className="font-semibold justify-between flex items-center pr-2">
          <div className="flex gap-3 items-center">
            <div className="min-w-[5rem] rounded-xl overflow-hidden">
              <AspectRatioImage
                ratio={3 / 4}
                alt={item.name}
                src={item.thumbnail}
              />
            </div>
            <div className="flex flex-col gap-1 w-full overflow-hidden">
              <p
                className="overflow-hidden font-bold whitespace-nowrap text-ellipsis"
                key={i}
              >
                {item.name}
              </p>
              <div className="flex gap-2 font-normal items-center">
                {mapArray(item.ingredients, (ing, i) => (
                  <p className="whitespace-nowrap" key={i}>
                    {ing},
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* <Divider className="md:w-full my-0 border-b border-dotted mx-2 border-b-gray-300" /> */}
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
