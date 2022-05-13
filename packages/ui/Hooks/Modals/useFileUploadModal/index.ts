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

  function uploadImage() {
    setUploadType("picture");
  }
  function uploadVideo() {
    setUploadType("video");
  }

  return {
    uploadType,
    setUploadType,
    cancelUpload,
    uploadImage,
    uploadVideo,
  };
};
