import { atom } from "recoil";

export const SpecialDaysOpenTimeModalState = atom<Date[]>({
  default: [],
  key: `SpecialDaysOpenTimeModalState_${Date.now()}`,
});
