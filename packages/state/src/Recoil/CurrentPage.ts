import { atom } from "recoil";

export const CurrentPageState = atom<string>({
  key: `CurrentPageState_${Date.now()}`,
  default: "",
});
