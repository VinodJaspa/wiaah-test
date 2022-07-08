import { atom } from "recoil";

export interface PreferedCurrency {
  currencyCode: string;
  currencyRateToUsd: number;
  currencySymbol: string;
}

export const PreferedCurrencyState = atom<PreferedCurrency | null>({
  default: null,
  key: "PreferedCurrencyState",
});
