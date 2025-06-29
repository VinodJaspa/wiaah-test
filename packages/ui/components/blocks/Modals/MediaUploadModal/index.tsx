"use client";
import { PostsViewModalsHeader } from "../../../blocks/Headers";
import { Input, ModalContent, ModalOverlay, Modal } from "../../../partials";
import { useFileUploadModal } from "../../../../src/Hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { HiCamera, HiFolderAdd, HiVideoCamera } from "react-icons/hi";
import { getFileSrcData, FileRes } from "utils";
import { RecordVideoModal } from "../RecordVideoModal";
import { TakePictureModal } from "../TakePictureModal";

export type MediaUploadType = "image" | "video";

type MediaUploadModalControls = {
  uploadType: MediaUploadType | undefined;
  cancelUpload: () => void;
};

type useMediaUploadControlsReturn = {
  uploadVideo: () => void;
  uploadImage: () => void;
  controls: MediaUploadModalControls;
};

export const useMediaUploadControls = (): useMediaUploadControlsReturn => {
  const [uploadType, setUploadType] = React.useState<MediaUploadType>();

  function uploadImage() {
    setUploadType("image");
  }

  function uploadVideo() {
    setUploadType("video");
  }

  function cancelUpload() {
    setUploadType(undefined);
  }

  return {
    uploadImage,
    uploadVideo,
    controls: {
      uploadType,
      cancelUpload,
    },
  };
};

export interface MediaUploadModalProps {
  onImgUpload?: (
    converted: FileRes,
    raw?: File,
    getBlob?: () => Blob | undefined,
  ) => any;
  onVidUpload?: (
    converted: string,
    raw?: File,
    getBlob?: () => Blob | undefined,
  ) => any;
  controls?: MediaUploadModalControls;
  multiple?: boolean;
  onImgServerUploaded?: (url: string) => any;
  onVidServerUploaded?: (url: string) => any;
}

export const MediaUploadModal: React.FC<MediaUploadModalProps> = ({
  onImgUpload,
  onVidUpload,
  multiple,
  controls,
}) => {
  const { cancelUpload: _cancelUpload, uploadType: _uploadType } =
    useFileUploadModal();

  const cancelUpload = controls ? controls.cancelUpload : _cancelUpload;
  const uploadType = controls ? controls.uploadType : _uploadType;

const { t } = useTranslation();
  const [takePicture, setTakePicture] = React.useState<boolean>(false);
  const [recordVideo, setRecordVideo] = React.useState<boolean>(false);
  const [imageFiles, setImageFiles] = React.useState<File[]>([]);

  const [videoFiles, setVideoFiles] = React.useState<File[]>([]);

  React.useEffect(() => {
    try {
      if (imageFiles && imageFiles.length > 0) {
        imageFiles.map((img, idx) => {
          getFileSrcData(img, (res) => {
            SendImage(res, idx);
          });
        });
        setImageFiles([]);
      }
    } catch (err) {
      console.error(err);
    }
  }, [imageFiles]);

  React.useEffect(() => {
    try {
      if (videoFiles.length > 0 && URL && URL.createObjectURL) {
        const vidArr = Array.from(videoFiles);
        vidArr.map((vid, idx) => {
          const vidSrc = URL.createObjectURL(vid);
          sendVideo(vidSrc, idx);
        });

        setVideoFiles([]);
      }
    } catch (err) {
      console.error("video Convertion", err);
    }
  }, [videoFiles]);

  const uploadImg = uploadType === "picture";
  //   uploadType === "picture";
  const uploadVid = uploadType === "video";

  function addImageFiles(imgs: FileList | null) {
    if (!imgs) return;
    const fileArr = Array.from(imgs);
    setImageFiles((state) => [...state, ...fileArr]);
  }

  function sendVideo(vidSrc: string, idx: number) {
    if (!vidSrc) return;

    const raw = videoFiles ? videoFiles[idx] : null;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onVidUpload &&
      onVidUpload(vidSrc, raw ? raw : (undefined as any), () =>
        raw ? new Blob([raw], { type: raw.type }) : undefined,
      );

    cancelUpload();
  }

  function SendImage(img: FileRes, idx: number) {
    if (!img) return;
    const raw = imageFiles[idx];
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onImgUpload &&
      onImgUpload(img, raw, () => new Blob([raw], { type: raw.type }));
  }
  function handleOpen() { }

  return (
    <Modal
      isLazy
      onOpen={() => { }}
      isOpen={!!uploadType}
      onClose={cancelUpload}
    >
      <ModalOverlay />
      <ModalContent className="w-[min(100%, 40rem)] rounded-xl py-4 px-8 flex flex-col gap-4">
        <PostsViewModalsHeader onBackClick={cancelUpload}>
          <p className="">
            {uploadImg
              ? t("upload_a_picture", "Upload a Picture")
              : uploadVid
                ? t("upload_a_video", "Upload a Video")
                : null}
          </p>
        </PostsViewModalsHeader>
        <div className="gap-8 justify-center flex flex-col sm:flex-row">
          {uploadImg ? (
            <>
              <TakePictureModal
                onOpen={() => setTakePicture(true)}
                isOpen={takePicture}
                onClose={() => setTakePicture(false)}
                onImgCapture={(src, raw) => {
                  setTakePicture(false);
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  onImgUpload && onImgUpload(src, raw);
                }}
              />
              <label htmlFor="AddImageInput">
                <div className="cursor-pointer flex justify-center items-center h-32 w-32 rounded-xl border-2 border-primary">
                  <HiFolderAdd className="text-4xl cursor-pointer text-primary" />
                </div>
                <Input
                  className="hidden"
                  id="AddImageInput"
                  type={"file"}
                  multiple={multiple}
                  onChange={(e) => addImageFiles(e.target.files)}
                  accept="image/*"
                />
              </label>
              <label htmlFor="TakePicture">
                <div
                  className="h-32 w-32 rounded-xl border-2 cursor-pointer flex justify-center items-center border-primary"
                  onClick={() => setTakePicture(true)}
                >
                  <HiCamera className="text-primary text-4xl cursor-pointer" />
                </div>
              </label>
            </>
          ) : uploadVid ? (
            <>
              <RecordVideoModal
                onOpen={() => setRecordVideo(true)}
                isOpen={recordVideo}
                onVideoRecored={(vid) => {
                  setVideoFiles([new File([vid], `record`)]);
                }}
                onClose={() => setRecordVideo(false)}
              />
              <label htmlFor="AddVideoInput">
                <div
                  className="h-32 w-32 rounded-xl border-2 cursor-pointer flex justify-center items-center border-primary"
                  onClick={() => setTakePicture(true)}
                >
                  <HiFolderAdd className="text-primary text-4xl cursor-pointer" />
                </div>
                <Input
                  className="hidden"
                  id="AddVideoInput"
                  type={"file"}
                  multiple={multiple}
                  //@ts-ignore
                  onChange={(e) => setVideoFiles(e.target.files || null)}
                  accept="video/*"
                />
              </label>
              <label htmlFor="RecordVdeo">
                <div
                  className="h-32 w-32 rounded-xl border-2 cursor-pointer flex justify-center items-center border-primary"
                  onClick={() => setRecordVideo(true)}
                >
                  <HiVideoCamera className="text-primary text-4xl cursor-pointer" />
                </div>
              </label>
            </>
          ) : null}
        </div>
      </ModalContent>
    </Modal>
  );
};
