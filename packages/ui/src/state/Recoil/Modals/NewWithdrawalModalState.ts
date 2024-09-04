import { atom } from "recoil";

export const NewWithdrawalOpenState = atom<boolean>({
  default: false,
  key: `NewWithdrawalOpenState_${Date.now()}`,
});
