import { t } from "i18next";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { VoucherState, CheckoutProductsTotalPriceState } from "../../state";
import { FlexStack, BoldText, Text } from "../partials";

export interface TotalCostProps {
  voucherRemoveable?: boolean;
}

export const TotalCost: React.FC<TotalCostProps> = ({ voucherRemoveable }) => {
  const [Voucher, setVoucher] = useRecoilState(VoucherState);
  const totalPrice = useRecoilValue(CheckoutProductsTotalPriceState);

  const shippingFee = 5;
  const TotalWithFee = totalPrice + shippingFee;
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
          <BoldText>{t("subtotal", "Subtotal")}</BoldText>
          <BoldText>${totalPrice}</BoldText>
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
        <FlexStack justify="between">
          <BoldText>{t("shipping_fee", "Shipping Fee")}</BoldText>
          <BoldText>${shippingFee}</BoldText>
        </FlexStack>
        <FlexStack justify="between">
          <BoldText>{t("total_to_pay", "Total to Pay")}</BoldText>
          <BoldText>${TotalWithFee}</BoldText>
        </FlexStack>
      </FlexStack>
    </div>
  );
};
