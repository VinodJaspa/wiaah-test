import React from "react";
import { useRecoilValue } from "recoil";
import { PreferedCurrencyState, usePreferedCurrency } from "state";
import { HtmlDivProps, PriceType } from "types";

export interface PriceDisplayProps extends HtmlDivProps {
  priceObject?: PriceType;
  price?: number;
  oldPrice?: number; // Added oldPrice prop
  symbol?: boolean;
  decimel?: boolean;
  compact?: boolean;
  displayCurrency?: boolean;
  symbolProps?: HtmlDivProps;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  priceObject,
  className,
  displayCurrency = true,
  price = 0,
  oldPrice,
  symbol = true,
  decimel,
  compact,
  symbolProps,
  ...props
}) => {
  const { preferedCurrency } = usePreferedCurrency();

  return (
    <p {...props} className={`${className || ""} whitespace-nowrap`}>
      {symbolProps ? (
        <span
          {...symbolProps}
          className={`${symbolProps.className || ""} pr-1`}
        >
          {preferedCurrency.currencySymbol}
        </span>
      ) : null}
      {PriceConverter({
        amount: priceObject ? priceObject.amount || price : price,
        symbol: symbolProps ? false : symbol,
        decimel,
        compact,
        displayCurrency: symbolProps ? false : displayCurrency,
      })}

      {oldPrice !== undefined && (
        <span className="line-through text-sm text-[#A7A7A7] ml-2 font-medium">
          {PriceConverter({
            amount: oldPrice,
            symbol: symbolProps ? false : symbol,
            decimel,
            compact,
            displayCurrency: symbolProps ? false : displayCurrency,
          })}
        </span>
      )}
    </p>
  );
};

export const PriceConverter = ({
  amount,
  symbol,
  decimel = false,
  compact = false,
  displayCurrency = true,
}: {
  amount: number;
  symbol: boolean;
  decimel?: boolean;
  compact?: boolean;
  displayCurrency?: boolean;
}): string | null => {
  const currency = useRecoilValue(PreferedCurrencyState);
  if (typeof amount !== "number") return null;
  return currency
    ? `${symbol ? currency.currencySymbol : ""}${Intl.NumberFormat(undefined, {
      minimumFractionDigits: decimel ? 2 : 0,
      notation: compact ? "compact" : undefined,
    }).format(amount * currency.currencyRateToUsd)}${!symbol && displayCurrency ? ` ${currency.currencyCode}` : ""
    }`
    : `${symbol ? "$" : ""}${amount.toFixed(decimel ? 2 : 0)}${symbol ? "" : " usd"
    }`;
};
