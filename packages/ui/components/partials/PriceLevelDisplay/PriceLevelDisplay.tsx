import React from "react";
import { usePreferedCurrency } from "state";

export interface PriceLevelDisplayProps {
  amount: number;
  levels?: number[];
}

export const PriceLevelDisplay: React.FC<PriceLevelDisplayProps> = ({
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
