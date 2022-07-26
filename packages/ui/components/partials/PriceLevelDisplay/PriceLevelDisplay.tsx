import React from "react";
import { usePreferedCurrency } from "state";

export interface PriceLevelDisplay {
  amount: number;
  levels?: number[];
}

export const PriceLevelDisplay: React.FC<PriceLevelDisplay> = ({
  amount,
  levels = [20, 50, 100],
}) => {
  const { preferedCurrency } = usePreferedCurrency();
  return (
    <p>
      {[0]
        .concat(Array.isArray(levels) ? levels : [])
        .map((level, i) =>
          amount >= level ? `${preferedCurrency.currencySymbol}` : null
        )}
    </p>
  );
};
