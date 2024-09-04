import { atom } from "recoil";

export const SellerDrawerOpenState = atom<boolean>({
  key: `DrawerOpenState_${Date.now()}`,
  default: false,
});
