import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { PreferedCurrencyState } from "state";
import { HtmlDivProps, PriceType } from "types";

export interface PriceDisplayProps extends HtmlDivProps {
  priceObject?: PriceType;
  price?: number;
  symbol?: boolean;
  decimel?: boolean;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  priceObject,
  className,
  price = 0,
  symbol = true,
  decimel,
  ...props
}) => {
  return (
    <p {...props} className={`${className || ""} whitespace-nowrap`}>
      {PriceConverter({
        amount: priceObject ? priceObject.amount || price : price,
        symbol,
        decimel,
      })}
    </p>
  );
};

export const PriceConverter = ({
  amount,
  symbol,
  decimel = false,
}: {
  amount: number;
  symbol: boolean;
  decimel?: boolean;
}): string | null => {
  const currency = useRecoilValue(PreferedCurrencyState);
  if (typeof amount !== "number") return null;
  return currency
    ? `${symbol ? currency.currencySymbol : ""}${Intl.NumberFormat(undefined, {
        minimumFractionDigits: decimel ? 2 : 0,
      }).format(amount * currency.currencyRateToUsd)}${
        !symbol ? ` ${currency.currencyCode}` : ""
      }`
    : `${symbol ? "$" : ""}${amount.toFixed(decimel ? 2 : 0)}${
        symbol ? "" : " usd"
      }`;
};
