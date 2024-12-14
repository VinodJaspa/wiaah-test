import { ServiceCancelationPolicy } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { usePublishRef, useSetUserInput } from "state";
import { ResturantMenuList, Button, ServiceCancelationPolicyInput } from "@UI";
import { FilterAndAddToArray, mapArray } from "utils";
import { RestaurantMenu, Dish } from "@features/API";

export interface ResturantMenuListSectionProps {
  cancelation: ServiceCancelationPolicy[];
  menus: Array<
    { __typename?: "RestaurantMenu" } & Pick<RestaurantMenu, "id" | "name"> & {
      dishs: Array<
        { __typename?: "Dish" } & Pick<
          Dish,
          "id" | "ingredients" | "price" | "name" | "thumbnail"
        >
      >;
    }
  >;
}

export const ResturantMenuListSection: React.FC<
  ResturantMenuListSectionProps
> = ({ menus, cancelation }) => {
  const { t } = useTranslation();
  const [orders, setOrders] = React.useState<
    { itemId: string; qty: number; price: number }[]
  >([]);
  const { addInput } = useSetUserInput();

  const menusRef = usePublishRef((keys) => keys.menu);

  React.useEffect(() => {
    addInput({ orders: orders });
  }, [orders]);

  return (
    <div className="flex flex-col gap-8" ref={menusRef}>
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
                      menu.dishs.find((i) => i.id === itemId)?.price || 0,
                  },
                  "exclude",
                  "itemId",
                );
              });
            }}
            key={i}
            menu={menu}
          />
        ))
        : null}
      {/* <div className="flex flex-col gap-1">
        <p className="font-bold">{t("Cancelation policy")}</p>
        {mapArray(cancelation, (policy, i) => (
          <ServiceCancelationPolicyInput
            {...policy}
            name="cancelationPolicy"
            onSelected={() => {}}
            key={`${i}-${policy.cost}`}
          />
        ))}
      </div> */}
    </div>
  );
};
