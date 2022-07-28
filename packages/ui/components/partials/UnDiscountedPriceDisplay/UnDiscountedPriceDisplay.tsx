import React from "react";
import { useRecoilValue } from "recoil";
import { PreferedCurrencyState } from "state";
import { HtmlDivProps } from "types";

export interface UnDiscountedPriceDisplayProps extends HtmlDivProps {
  amount: number;
  discount: number;
}

export const UnDiscountedPriceDisplay: React.FC<
  UnDiscountedPriceDisplayProps
> = ({ amount, discount, ...props }) => {
  const { currencyCode, currencyRateToUsd, currencySymbol } = useRecoilValue(
    PreferedCurrencyState
  );
  const convertedPrice = amount * currencyRateToUsd;
  const unDiscountedPrice = convertedPrice / ((discount - 100) / 100);
  return (
    <p
      {...props}
      className={`${props.className || ""} line-through whitespace-nowrap`}
    >
      {currencySymbol}
      {Math.abs(unDiscountedPrice).toFixed(2)}
    </p>
  );
};
