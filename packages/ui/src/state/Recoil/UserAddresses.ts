import { atom } from "recoil";
import { AddressCardDetails } from "types";

export const UserAddressesState = atom<AddressCardDetails[]>({
  key: `UserAddressesState_${Date.now()}`,
  default: [],
});
