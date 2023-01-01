import { HotelCheckoutBookedPropertyData } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { PriceDisplay, ServiceCheckoutCommonCardWrapper } from "@UI";
import { setTestid } from "utils";

export interface HotelCheckoutCardProps
  extends HotelCheckoutBookedPropertyData {}

export const HotelCheckoutCard: React.FC<HotelCheckoutCardProps> = (props) => {
  const { guests, extras, ...rest } = props;
  const { t } = useTranslation();

  return (
    <ServiceCheckoutCommonCardWrapper {...props}>
      <div {...setTestid("extrasContainer")} className="flex flex-col gap-2">
        <p className="font-semibold">{t("Extras")}:</p>
        {Array.isArray(extras)
          ? extras.map((extra, i) => (
              <div
                key={i}
                {...setTestid("extraItem")}
                className="flex w-full justify-between"
              >
                <p>{extra.name}</p>
                <PriceDisplay className="font-bold" price={extra.price} />
              </div>
            ))
          : null}
      </div>
    </ServiceCheckoutCommonCardWrapper>
  );
};
