import { useRecoilState } from "recoil";
import { PreferedCurrencyState } from "..";

export const usePreferedCurrency = () => {
  const [state, setState] = useRecoilState(PreferedCurrencyState);

  const setPreferedCurrency = (currency: typeof state) => {
    if (currency) {
      setState(currency);
    }
  };

  return {
    preferedCurrency: state,
    setPreferedCurrency,
  };
};
