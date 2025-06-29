import { useTypedReactPubsub } from "@libs";
import React from "react";
import { useRecoilState } from "recoil";
import { FileUploadTypes } from "types";
import { UploadModalState } from "@UI";

export const useFileUploadModal = () => {
  const [uploadType, SetUploadType] = useRecoilState(UploadModalState);

  const { Listen, removeListner } = useTypedReactPubsub(
    (keys) => keys.openFileUploadModal
  );

  React.useEffect(() => {
    Listen((props) => {
      if (!props) return;
      if ("uploadType" in props) {
        if (props.uploadType === "img") {
          uploadImage();
        }
        if (props.uploadType === "vid") {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          uploadVideo;
        }
      }
    });
    return () => removeListner();
  });

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
