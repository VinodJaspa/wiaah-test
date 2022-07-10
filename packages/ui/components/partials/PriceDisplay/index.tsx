import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { PreferedCurrencyState } from "state";
import { HtmlDivProps, PriceType } from "types";

export interface PriceDisplayProps extends HtmlDivProps {
  priceObject: PriceType;
  symbol?: boolean;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  priceObject,
  className,
  symbol = true,
  ...props
}) => {
  return (
    <div {...props} className={`${className || ""}`}>
      {PriceConverter({ amount: priceObject.amount, symbol })}
    </div>
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
    ? `${amount * currency.currencyRateToUsd} ${
        symbol ? currency.currencySymbol : currency.currencyCode
      }`
    : `${symbol ? "$" : ""}${amount} ${symbol ? "" : "usd"}`;
};
