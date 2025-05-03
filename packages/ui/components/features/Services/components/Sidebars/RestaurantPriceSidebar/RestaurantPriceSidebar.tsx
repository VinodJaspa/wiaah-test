import React from "react";
import { useTranslation } from "react-i18next";
import { useGetUserInput } from "state";
import {
  ResturantFindTableFilterStepper,
  Divider,
  PriceDisplay,
  HStack,
} from "@UI";

export const RestaurantPriceSidebar: React.FC<{ vatPercent: number }> = ({
  vatPercent: vat,
}) => {
const { t } = useTranslation();
  const { input } = useGetUserInput();
  const orders = input["orders"];

  const totalOrdersCost = orders
    ? Array.isArray(orders)
      ? orders.reduce((acc, curr) => acc + curr.qty * curr.price, 0)
      : 0
    : 0;

  const vatPercent = vat ? vat : 0;

  const vatCost = (vatPercent / 100) * totalOrdersCost;

  return (
    <div className="flex flex-col">
      <ResturantFindTableFilterStepper />
      <Divider className="my-4 border-gray-300" />
      <div className="flex flex-col gap-4">
        <HStack className="text-xl font-bold justify-between">
          <p>{t("Total")}</p>
          <PriceDisplay
            priceObject={{
              amount: totalOrdersCost,
            }}
          />
        </HStack>
        <HStack className="font-semibold text-lg justify-between">
          <span className="flex whitespace-nowrap gap-2">
            <p>
              {t("VAT")} {vatPercent}%
            </p>
            <span className="flex whitespace-nowrap">
              {`(`} <PriceDisplay priceObject={{ amount: vatCost }} /> {`)`}
            </span>
          </span>
          <PriceDisplay
            priceObject={{
              amount: vatCost,
            }}
          />
        </HStack>
        <Divider />
        <HStack className="text-2xl font-bold justify-between">
          <p>{t("Finale total")}</p>
          <PriceDisplay
            priceObject={{
              amount: totalOrdersCost + vatCost,
            }}
          />
        </HStack>
      </div>
    </div>
  );
};
