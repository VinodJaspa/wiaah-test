import { atom } from "recoil";

export const SellerDrawerOpenState = atom<boolean>({
  key: "DrawerOpenState",
  default: false,
});
