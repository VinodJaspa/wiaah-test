import { ResturantMenuData } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSetUserInput } from "state";
import { ResturantMenuList, Button } from "ui";
import { FilterAndAddToArray } from "utils";

export interface ResturantMenuListSectionProps extends ResturantMenuData {}

export const ResturantMenuListSection: React.FC<
  ResturantMenuListSectionProps
> = ({ menus }) => {
  const { t } = useTranslation();
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
      <Button className="sm:hidden w-fit self-end">{t("Book now")}</Button>
    </div>
  );
};
