import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { HiCamera, HiFolderAdd, HiVideoCamera } from "react-icons/hi";
import { useFileUploadModal, PostsViewModalsHeader, Input } from "ui";
import { TakePictureModal, RecordVideoModal } from "ui";
import { getFileSrcData, FileRes } from "ui/components/helpers";

export interface MediaUploadModalProps {
  onImgUpload?: (converted: FileRes, raw?: File) => any;
  onVidUpload?: (converted: string, raw?: File) => any;

  multiple?: boolean;
}

export const MediaUploadModal: React.FC<MediaUploadModalProps> = ({
  onImgUpload,
  onVidUpload,
  multiple,
}) => {
  const { cancelUpload, uploadType } = useFileUploadModal();
  const { t } = useTranslation();
  const [takePicture, setTakePicture] = React.useState<boolean>(false);
  const [recordVideo, setRecordVideo] = React.useState<boolean>(false);
  const [imageFiles, setImageFiles] = React.useState<File[]>([]);

  const [videoFiles, setVideoFiles] = React.useState<File[] | Blob[]>([]);

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
      console.error("img Convertion", err);
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
    onVidUpload && onVidUpload(vidSrc);
  }

  function SendImage(img: FileRes, idx: number) {
    if (!img) return;
    onImgUpload && onImgUpload(img, imageFiles[idx]);
  }

  return (
    <Modal isCentered isOpen={!!uploadType} onClose={cancelUpload}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <PostsViewModalsHeader onBackClick={cancelUpload}>
            <p>
              {uploadImg
                ? t("upload_a_picture", "Upload a Picture")
                : uploadVid
                ? t("upload_a_video", "Upload a Video")
                : null}
            </p>
          </PostsViewModalsHeader>
        </ModalHeader>
        <ModalBody pb="2rem">
          <div className="gap-8 justify-center flex flex-col sm:flex-row">
            {uploadImg ? (
              <>
                <TakePictureModal
                  isOpen={takePicture}
                  onClose={() => setTakePicture(false)}
                  onImgCapture={(src, raw) => {
                    setTakePicture(false);
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
                  isOpen={recordVideo}
                  onVideoRecored={(vid) => {
                    console.log("recorded", vid);
                    setVideoFiles([vid]);
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
