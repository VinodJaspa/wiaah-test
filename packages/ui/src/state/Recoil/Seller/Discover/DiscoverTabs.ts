import { atom } from "recoil";
import { DiscoverTabsLinks } from "@src/Hooks";

export const DiscoverCurrentTabState = atom<number>({
  key: "DiscoverCurrentTabState",
  default: 0,
});

export const DiscoverTabsState = atom<DiscoverTabsLinks[]>({
  key: "DiscoverTabsState",
  default: [],
});
