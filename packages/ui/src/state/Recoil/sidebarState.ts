import { atom } from "recoil";
import { isDev } from "utils";

// safe storage getter (avoids SSR issues)
const getStorage = (storage: "local" | "session"): Storage | undefined => {
  if (typeof window === "undefined") return undefined;
  return storage === "local" ? window.localStorage : window.sessionStorage;
};

// localStorage / sessionStorage effect
const storageEffect =
  (key: string, storageType: "local" | "session" = "local") =>
  ({ setSelf, onSet }: any) => {
    const storage = getStorage(storageType);
    if (!storage) return; // SSR safe

    // Load saved value
    const savedValue = storage.getItem(key);
    if (savedValue != null) {
      try {
        setSelf(JSON.parse(savedValue));
      } catch {
        storage.removeItem(key);
      }
    }

    // Save on change
    onSet((newValue: any, _, isReset: boolean) => {
      if (isReset) {
        storage.removeItem(key);
      } else {
        storage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

// ---- Atoms ----

// Sidebar persisted in sessionStorage
export const sidebarState = atom<boolean>({
  
  key: "sidebarState",
  default: true,
  effects_UNSTABLE: [storageEffect("sidebarState", "session")],
});
