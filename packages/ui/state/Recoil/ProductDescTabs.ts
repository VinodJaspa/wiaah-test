import { atom } from "recoil";
import { ProductDescTabs } from "types/market/Product";

export const ProductDescriptionTabsState = atom<ProductDescTabs>({
  key: "productDescriptionState",
  default: "description",
});
