import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { VoucherState, CheckoutProductsTotalPriceState } from "ui/state";
import { FlexStack, BoldText, Text, PriceDisplay } from "ui";
import { useTranslation } from "react-i18next";

export interface TotalCostProps {
  voucherRemoveable?: boolean;
  shippingFee?: boolean;
}

export const TotalCost: React.FC<TotalCostProps> = ({
  voucherRemoveable,
  shippingFee: showShippingFee,
}) => {
  const { t } = useTranslation();

  const [Voucher, setVoucher] = useRecoilState(VoucherState);
  const totalPrice = useRecoilValue(CheckoutProductsTotalPriceState);

  const shippingFee = 5;
  const TotalWithFee = totalPrice + shippingFee;
  const finaleTotal = TotalWithFee + TotalWithFee * (7 / 100);
  function handleRemoveVoucher() {
    // call backend endpoint to remove voucher
    // ok is true if the server removes the voucher successfully
    let ok = true;
    if (ok) {
      setVoucher(undefined);
    }
  }

  return (
    <div className="text-lg">
      <FlexStack direction="vertical" verticalSpacingInRem={0.5}>
        <FlexStack justify="between">
          <p className="font-bold">{t("Subtotal")}</p>
          <p className="font-bold">
            <PriceDisplay priceObject={{ amount: totalPrice }} />
          </p>
        </FlexStack>
        {Voucher && (
          <FlexStack justify="between">
            <BoldText>{t("voucher", "Voucher")}</BoldText>
            <Text size="md">
              <FlexStack direction="vertical">
                <span className="text-green-500">
                  {Voucher.voucherName} - {Voucher.value}
                  {Voucher.unit} {t("off", "OFF")}
                </span>

                {voucherRemoveable && (
                  <span
                    className="cursor-pointer text-red-500"
                    onClick={handleRemoveVoucher}
                  >
                    {t("remove", "Remove")}
                  </span>
                )}
              </FlexStack>
            </Text>
          </FlexStack>
        )}
        {showShippingFee ? (
          <FlexStack justify="between">
            <BoldText>{t("shipping_fee", "Shipping Fee")}</BoldText>
            <BoldText>
              <PriceDisplay priceObject={{ amount: shippingFee }} />
            </BoldText>
          </FlexStack>
        ) : null}
        <div className="flex justify-between">
          <p className="font-bold">{`${t("VAT", "VAT")} (${7}%)`}</p>
          <PriceDisplay
            className="font-bold"
            priceObject={{ amount: TotalWithFee * (7 / 100) }}
          />
        </div>
        <FlexStack justify="between">
          <BoldText>{t("total_to_pay", "Total to Pay")}</BoldText>
          <BoldText>
            <PriceDisplay priceObject={{ amount: finaleTotal }} />
          </BoldText>
        </FlexStack>
      </FlexStack>
    </div>
  );
};
