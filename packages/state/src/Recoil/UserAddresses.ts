import { atom } from "recoil";
import { AddressCardDetails } from "types/market/AddressDetails.interface";

export const UserAddressesState = atom<AddressCardDetails[]>({
  key: "UserAddressesState",
  default: [],
});
