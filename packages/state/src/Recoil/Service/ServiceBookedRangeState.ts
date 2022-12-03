import { atom } from "recoil";
import { DateRange } from "types";

export const ServiceBookedRangeState = atom<DateRange | null>({
  default: null,
  key: "ServiceBookedRangeState",
});
