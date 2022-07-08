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
  symbol,
  ...props
}) => {
  const currency = useRecoilValue(PreferedCurrencyState);
  return (
    <div {...props} className={`${className || ""}`}>
      {currency
        ? `${priceObject.amount * currency.currencyRateToUsd} ${
            symbol ? currency.currencySymbol : currency.currencyCode
          }`
        : `${symbol ? "$" : ""}${priceObject.amount} ${symbol ? "" : "usd"}`}
    </div>
  );
};
