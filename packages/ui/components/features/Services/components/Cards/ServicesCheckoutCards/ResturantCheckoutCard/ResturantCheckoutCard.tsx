import { RestaurantCheckoutBookedPropertyData } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  PriceDisplay,
  ServiceCheckoutCommonCardWrapper,
  BookedMenuCard,
} from "@UI";
import { setTestid } from "utils";

export interface ResturantCheckoutCardProps
  extends RestaurantCheckoutBookedPropertyData {}

export const ResturantCheckoutCard: React.FC<ResturantCheckoutCardProps> = (
  props
) => {
  const { t } = useTranslation();
  const { bookedMenus, ...rest } = props;

  return (
    <ServiceCheckoutCommonCardWrapper {...rest}>
      <div
        {...setTestid("BookedMenusContainer")}
        className="flex flex-col gap-2"
      >
        <p className="font-semibold">{t("Booked menus")}:</p>
        <ul className="flex flex-col gap-2">
          {Array.isArray(bookedMenus)
            ? bookedMenus.map((menu, i) => <BookedMenuCard key={i} {...menu} />)
            : null}
        </ul>
      </div>
    </ServiceCheckoutCommonCardWrapper>
  );
};
