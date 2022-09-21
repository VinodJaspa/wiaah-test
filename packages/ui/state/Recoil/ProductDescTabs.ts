import { atom } from "recoil";
import { ProductDescTabs } from "types";

export const ProductDescriptionTabsState = atom<ProductDescTabs>({
  key: "productDescriptionState",
  default: "description",
});
