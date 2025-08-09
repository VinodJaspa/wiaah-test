import { atom } from "recoil";
import { CurrentUserDataType } from "types";

export const UserDataState = atom<CurrentUserDataType | undefined>({
  default: undefined,
  key: `UserDataState_${Date.now()}`,
});

const localStorageEffect = (key: string) => ({ setSelf, onSet }: any) => {
  if (typeof window !== 'undefined') { 
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: any) => {
      localStorage.setItem(key, JSON.stringify(newValue));
    });
  }
};


export const isUserLoggedIn = atom<boolean>({
  key: "isUserLoggedIn",
  default: false,
  effects: [localStorageEffect("isUserLoggedIn")],
});
