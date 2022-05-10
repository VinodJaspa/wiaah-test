import { atom } from "recoil";
import { FileUploadTypes } from "types";

export const UploadModalState = atom<FileUploadTypes>({
  key: "UploadModalState",
  default: null,
});
