import { atom } from "recoil";

export interface PreferedCurrency {
  currencyCode: string;
  currencyRateToUsd: number;
  currencySymbol: string;
}

export const PreferedCurrencyState = atom<PreferedCurrency>({
  default: {
    currencyCode: "usd",
    currencyRateToUsd: 1,
    currencySymbol: "$",
  },
  key: `PreferedCurrencyState_${Date.now()}`,
});
