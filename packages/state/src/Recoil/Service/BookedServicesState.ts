import { atom } from "recoil";

export interface BookedService {
  id: string;
  name: string;
  qty: number;
  price: number;
}

export const BookedServicesState = atom<BookedService[]>({
  default: [],
  key: "BookedServicesState",
});
