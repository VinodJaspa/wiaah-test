import { getCurrencyDataFetcher } from "api";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { PreferedCurrencyState } from "state";
export const useGetCurrency = () => {
  const currency = useRecoilValue(PreferedCurrencyState);

  return { currency };
};

export const Currencies = {
  USD: "USD",
  CHF: "CHF",
  GBP: "GBP",
  EUR: "EUR",
};

export const useChangeCurrency = () => {
  const setCurrency = useSetRecoilState(PreferedCurrencyState);

  async function handleChangeCurrency(
    fn: ((currencies: typeof Currencies) => string) | string
  ) {
    const wantedCurr = typeof fn === "function" ? fn(Currencies) : fn;
    const validCurrency = Object.entries(Currencies).find(
      (curr) => curr[1].toLowerCase() === wantedCurr.toLowerCase()
    );
    if (!validCurrency) return;

    const curr = await getCurrencyDataFetcher(validCurrency[1]);
    if (curr) {
      const {
        data: { code, ratio, symbol },
      } = curr;
      setCurrency({
        currencyCode: code,
        currencyRateToUsd: ratio,
        currencySymbol: symbol,
      });
    }
  }

  return {
    handleChangeCurrency,
  };
};
