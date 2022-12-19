import React from "react";
import { useRecoilState } from "recoil";
import { VoucherState } from "@src/state";
import { FlexStack, BoldText, Text, PriceDisplay, Divider } from "@UI";
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

  const [Voucher, setVoucher] = useRecoilState(VoucherState);
  const totalPrice = subTotal;

  const TotalWithFee = totalPrice + shippingFee;
  const finaleTotal = TotalWithFee + CalculateVat(TotalWithFee, vat);

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
        {shippingFee > 0 ? (
          <FlexStack justify="between">
            <BoldText>{t("shipping_fee", "Shipping Fee")}</BoldText>
            <BoldText>
              <PriceDisplay priceObject={{ amount: shippingFee }} />
            </BoldText>
          </FlexStack>
        ) : null}
        <div className="flex justify-between">
          <p className="font-bold">{`${t("VAT", "VAT")} (${vat}%)`}</p>
          <PriceDisplay
            className="font-bold"
            priceObject={{ amount: CalculateVat(TotalWithFee, vat) }}
          />
        </div>
        {saved > 0 ? (
          <span className="w-full flex justify-end font-bold text-primary uppercase gap-2">
            {`${t("you have saved")}`}
            <PriceDisplay priceObject={{ amount: saved }} />
          </span>
        ) : null}
        <Divider />
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
