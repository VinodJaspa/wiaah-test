import { useRecoilState } from "recoil";
import { SpecialDaysOpenTimeModalState } from "state";

export const useSpecialDaysOpenTimeModal = () => {
  const [days, setDays] = useRecoilState(SpecialDaysOpenTimeModalState);

  function modifiDays(dates: Date[]) {
    setDays(dates);
  }

  function clear() {
    setDays([]);
  }

  return {
    days,
    modifiDays,
    clear,
  };
};
