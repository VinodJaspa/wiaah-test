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
  const { t } = useTranslation();

  const totalPrice = subTotal;
  const totalWithFee = totalPrice + shippingFee;
  const finalTotal = totalWithFee + CalculateVat(totalWithFee, vat);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full">
      <div className="flex flex-col gap-2 w-full text-sm">
        {/* Subtotal */}
        <HStack className="justify-between">
          <p className="font-medium text-gray-700">{t("Subtotal")}</p>
          <PriceDisplay
            className="font-semibold text-base"
            priceObject={{ amount: totalPrice }}
          />
        </HStack>

        {/* Voucher Savings */}
        {saved && saved > 0 && (
          <HStack className="justify-between">
            <p className="font-medium text-gray-700">{t("Voucher")}</p>
            <div className="flex items-center gap-1 text-green-600 font-medium text-sm">
              <span>{t("You Have Saved")}</span>
              <PriceDisplay price={saved} className="font-semibold" />
            </div>
          </HStack>
        )}

        {/* VAT */}
        <HStack className="justify-between">
          <p className="font-medium text-gray-700">
            {t("VAT")} <span className="text-gray-500 font-normal">({vat}%)</span>
          </p>
          <PriceDisplay
            className="font-semibold text-base"
            priceObject={{ amount: CalculateVat(totalWithFee, vat) }}
          />
        </HStack>

        {/* Divider */}
        <Divider className="border-gray-300 my-2" />

        {/* Total */}
        <FlexStack justify="between" className="items-center">
          <p className="font-semibold text-base">{t("Total to Pay")}</p>
          <PriceDisplay
            className="font-bold text-lg"
            priceObject={{ amount: finalTotal }}
          />
        </FlexStack>
      </div>
    </div>
  );
};
