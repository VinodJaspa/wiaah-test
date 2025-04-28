import { Divider, FlexStack, HStack, PriceDisplay } from "@partials";
import React from "react";
import { useTranslation } from "react-i18next";
import { CalculateVat } from "utils";

export interface TotalCostProps {
  voucherRemoveable?: boolean;
  subTotal: number;
  vat: number;
  shippingFee?: number;
  saved?: number;
}

export const TotalCost: React.FC<TotalCostProps> = ({
  voucherRemoveable,
  shippingFee = 0,
  subTotal = 0,
  vat = 0,
  saved = 0,
}) => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();

  const totalPrice = subTotal;

  const TotalWithFee = totalPrice + shippingFee;
  const finaleTotal = TotalWithFee + CalculateVat(TotalWithFee, vat);

  return (
    <div className="p-6">
      <div className="flex flex-col gap-2 w-full">
        <HStack className="justify-between">
          <p className="font-semibold text-lg">{t("Subtotal")}</p>
          <p className="font-bold text-xl">
            <PriceDisplay priceObject={{ amount: totalPrice }} />
          </p>
        </HStack>

        {saved && saved > 0 ? (
          <HStack className="justify-between">
            <p className="font-semibold text-lg">{t("Voucher")}</p>
            <div className="text-[#E20000] font-medium text-lg flex gap-2 items-center">
              <p>{t("You Have Saved")}</p>
              <PriceDisplay price={saved} />
            </div>
          </HStack>
        ) : null}
        <div className="flex justify-between">
          <p className="font-bold">
            {`${t("VAT")}`}{" "}
            <span className="text-base font-medium">{`(${vat}%)`}</span>
          </p>
          <PriceDisplay
            className="font-bold text-xl"
            priceObject={{ amount: CalculateVat(TotalWithFee, vat) }}
          />
        </div>

        <Divider className="border-black my-3" />
        <FlexStack justify="between">
          <p className="text-2xl font-semibold">{t("Total to Pay")}</p>
          <PriceDisplay
            className="font-bold text-2xl"
            priceObject={{ amount: finaleTotal }}
          />
        </FlexStack>
      </div>
    </div>
  );
};
