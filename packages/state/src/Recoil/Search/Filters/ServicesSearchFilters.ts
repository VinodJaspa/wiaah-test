import { FormatedSearchableFilter } from "api";
import { atom } from "recoil";

export const ServicesSearchFiltersState = atom<FormatedSearchableFilter>({
  default: {},
  key: `ServicesSearchFiltersState_${Date.now()}`,
});
