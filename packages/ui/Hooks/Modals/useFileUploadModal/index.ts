import { useRecoilState } from "recoil";
import { FileUploadTypes } from "types";
import { UploadModalState } from "ui";

export const useFileUploadModal = () => {
  const [uploadType, SetUploadType] = useRecoilState(UploadModalState);

  function setUploadType(type: FileUploadTypes) {
    SetUploadType(type);
  }

  function cancelUpload() {
    setUploadType(null);
  }

  return {
    uploadType,
    setUploadType,
    cancelUpload,
  };
};
