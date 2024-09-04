import { atom } from "recoil";
import { CurrentUserDataType } from "types";

export const UserDataState = atom<CurrentUserDataType | undefined>({
  default: undefined,
  key: `UserDataState_${Date.now()}`,
});
