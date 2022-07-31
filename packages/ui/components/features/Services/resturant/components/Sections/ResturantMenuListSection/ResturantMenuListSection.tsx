import { ResturantMenuData, ServiceCancelationPolicyType } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSetUserInput } from "state";
import { ResturantMenuList, Button, ServiceCancelationPolicyInput } from "ui";
import { FilterAndAddToArray } from "utils";

export interface ResturantMenuListSectionProps extends ResturantMenuData {
  cancelation: ServiceCancelationPolicyType[];
}

export const ResturantMenuListSection: React.FC<
  ResturantMenuListSectionProps
> = ({ menus, cancelation }) => {
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
      <div className="flex flex-col gap-1">
        <p className="font-bold">{t("Cancelation policy")}</p>
        {cancelation.map((policy, i) => (
          <ServiceCancelationPolicyInput
            {...policy}
            name="cancelationPolicy"
            onSelected={() => {}}
            key={`${i}-${policy.id}`}
          />
        ))}
      </div>

      <Button className=" w-fit self-end">{t("Book now")}</Button>
    </div>
  );
};
