import { atom } from "recoil";
import { ServiceType } from "types";

export const ServiceBookingModalState = atom<ServiceType | null>({
  default: null,
  key: "ServiceBookingModalState",
});
