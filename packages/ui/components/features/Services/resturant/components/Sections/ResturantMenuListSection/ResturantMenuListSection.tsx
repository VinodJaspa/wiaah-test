import { ResturantMenuData } from "api";
import React from "react";
import { useSetUserInput } from "state";
import { ResturantMenuList } from "ui";
import { FilterAndAddToArray } from "utils";

export interface ResturantMenuListSectionProps extends ResturantMenuData {}

export const ResturantMenuListSection: React.FC<
  ResturantMenuListSectionProps
> = ({ menus }) => {
  const [orders, setOrders] = React.useState<
    { itemId: string; qty: number; price: number }[]
  >([]);
  const { addInput } = useSetUserInput();

  React.useEffect(() => {
    addInput({ orders: orders });
  }, [orders]);

  return (
    <div className="flex flex-col gap-8">
      {Array.isArray(menus)
        ? menus.map((menu, i) => (
            <ResturantMenuList
              onMenuListChange={(itemId, qty) => {
                setOrders((state) => {
                  return FilterAndAddToArray(
                    state,
                    {
                      itemId,
                      qty,
                      price:
                        menu.menuItems.find((i) => i.id === itemId)?.price || 0,
                    },
                    "exclude",
                    "itemId"
                  );
                });
              }}
              key={i}
              {...menu}
            />
          ))
        : null}
    </div>
  );
};
