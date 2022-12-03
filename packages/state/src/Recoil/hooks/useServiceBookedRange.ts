import { useRecoilState } from "recoil";
import { ServiceBookedRangeState } from "../";
import { DateRange } from "types";

export const useServiceBookedRange = () => {
  const [range, setRange] = useRecoilState(ServiceBookedRangeState);

  function SetRange(newRange: DateRange) {
    setRange(newRange);
  }

  return {
    range,
    SetRange,
  };
};
