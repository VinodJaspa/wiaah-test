import React from "react";
import { useTranslation } from "react-i18next";
import { FormOptionType, PriceType } from "types";
import { Checkbox, TranslationText } from "@UI";

export interface NewProductShippingOptions {}

export const NewProductShippingOptions: React.FC<
  NewProductShippingOptions
> = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">
        {t("shipping_mothed", "Shipping Mothed")}
      </h1>
      {shippingMotheds.map((mothed, i) => (
        <div className="flex gap-4">
          <Checkbox />
          <span className="flex gap-1">
            <TranslationText translationObject={mothed.name} />
            {mothed.period && (
              <span>
                ({mothed.period.from}-{mothed.period.to} {t("days", "days")})
              </span>
            )}
            {mothed.price && (
              <span>
                {mothed.price.amount} {mothed.price.currency}
              </span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
};

type shippingMothed = FormOptionType & {
  price?: PriceType;
  period?: {
    from: number;
    to: number;
  };
};

const shippingMotheds: shippingMothed[] = [
  {
    name: {
      translationKey: "european_union_ups",
      fallbackText: "European Union ups",
    },
    value: "europeanUnion",
    price: {
      amount: 25,
      currency: "CHF",
    },
    period: {
      from: 1,
      to: 3,
    },
  },
  {
    name: {
      translationKey: "international",
      fallbackText: "International",
    },
    value: "international",
    price: {
      amount: 50,
      currency: "CHF",
    },
    period: {
      from: 1,
      to: 3,
    },
  },
  {
    name: {
      translationKey: "self_pickup",
      fallbackText: "Self Pickup",
    },
    value: "selfPickup",
  },
];
