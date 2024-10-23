import React from "react";
import { useRecoilValue } from "recoil";
import { PreferedCurrencyState } from "state";
import { HtmlDivProps } from "types";

export interface UnDiscountedPriceDisplayProps extends HtmlDivProps {
  amount: number;
  discount: number;
  decimel?: boolean;
}

export const UnDiscountedPriceDisplay: React.FC<
  UnDiscountedPriceDisplayProps
> = ({ amount, discount, decimel, ...props }) => {
  const { currencyCode, currencyRateToUsd, currencySymbol } = useRecoilValue(
    PreferedCurrencyState,
  ) as {
    currencyCode: string;
    currencyRateToUsd: number;
    currencySymbol: string;
  }; // Ensure proper type

  const convertedPrice = amount * currencyRateToUsd;
  const unDiscountedPrice = convertedPrice / ((100 - discount) / 100);

  return (
    <p
      {...props}
      className={`${props.className || ""
        } line-through  decoration-2 whitespace-nowrap`}
    >
      {currencySymbol}
      {Math.abs(unDiscountedPrice).toFixed(decimel ? 2 : 0)}
    </p>
  );
};
