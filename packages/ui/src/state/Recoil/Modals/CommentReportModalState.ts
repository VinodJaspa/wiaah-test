import { atom } from "recoil";

export const CommentReportModalIdState = atom<string | null>({
  key: `CommentReportModalState_${Date.now()}`,
  default: null,
});
