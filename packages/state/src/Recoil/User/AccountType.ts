import { atom, AtomEffect } from "recoil";
import { AccountType } from "types";

// helper effect for localStorage sync
const localStorageEffect =
  <T,>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    if (typeof window !== "undefined") {
      const savedValue = localStorage.getItem(key);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }
    }

    onSet((newValue, _, isReset) => {
      if (typeof window === "undefined") return;
      if (isReset) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

export const AccountTypeState = atom<AccountType>({
  key: "AccountTypeState", // ✅ don't use Date.now(), keep it stable
  default: AccountType.Seller,
  effects: [localStorageEffect<AccountType>("accountType")],
});
