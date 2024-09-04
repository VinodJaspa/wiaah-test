import { ResturantMetaDataType } from "api";
import { atom } from "recoil";

export const ResturantsDataState = atom<ResturantMetaDataType[]>({
  default: [],
  key: `ResturantDataState_${Date.now()}`,
});
