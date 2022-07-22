import { atom } from "recoil";

export type RefSectionType = {
  ref: HTMLElement;
  key: string;
};

export const pageRefSectionState = atom<RefSectionType[]>({
  default: [],
  key: "PageRefSectionState",
});
