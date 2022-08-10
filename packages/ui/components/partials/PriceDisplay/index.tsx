import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { PreferedCurrencyState } from "state";
import { HtmlDivProps, PriceType } from "types";

export interface PriceDisplayProps extends HtmlDivProps {
  priceObject?: PriceType;
  price?: number;
  symbol?: boolean;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  priceObject,
  className,
  price = 0,
  symbol = true,
  ...props
}) => {
  return (
    <p {...props} className={`${className || ""} whitespace-nowrap`}>
      {PriceConverter({
        amount: priceObject ? priceObject.amount || price : price,
        symbol,
      })}
    </p>
  );
};

export const PriceConverter = ({
  amount,
  symbol,
}: {
  amount: number;
  symbol: boolean;
}): string | null => {
  const currency = useRecoilValue(PreferedCurrencyState);
  if (typeof amount !== "number") return null;
  return currency
    ? `${symbol ? currency.currencySymbol : ""}${(
        amount * currency.currencyRateToUsd
      ).toFixed(2)}${!symbol ? ` ${currency.currencyCode}` : ""}`
    : `${symbol ? "$" : ""}${amount.toFixed(2)}${symbol ? "" : " usd"}`;
};
