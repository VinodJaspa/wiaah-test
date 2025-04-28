import React from "react";
import { useTranslation } from "react-i18next";
import { CloseIcon, PriceDisplay, AddMenuDishInput } from "@UI";

type MenuDish = {
  title: string;
  price: number;
};

export interface RestaurantMenuDishsListProps {
  value: MenuDish[];
  onChange: (menus: MenuDish[]) => any;
}

export const RestaurantMenuDishsList: React.FC<
  RestaurantMenuDishsListProps
> = ({ onChange, value }) => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        {Array.isArray(value) ? (
          value.length < 1 ? (
            <p>{t("There is no dishs in this menu, add one!")}</p>
          ) : (
            value.map((dish, idx) => (
              <div key={idx} className="flex item-center justify-between gap-2">
                <div className="flex gap-2 items-center">
                  <CloseIcon
                    className="cursor-pointer"
                    onClick={() => onChange(value.filter((_, i) => i !== idx))}
                  />
                  <p>{dish.title}</p>
                </div>
                <PriceDisplay price={dish.price} />
              </div>
            ))
          )
        ) : null}
      </div>
      <AddMenuDishInput onAdd={(dish) => onChange([...value, dish])} />
    </div>
  );
};
