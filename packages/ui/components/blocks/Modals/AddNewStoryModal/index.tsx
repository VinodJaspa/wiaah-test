import { BiImageAlt } from "react-icons/bi";
import { IoVideocam } from "react-icons/io5";
import {
  Avatar,
  useNewStoryModal,
  CloseIcon,
  Textarea,
  HStack,
  Button,
} from "@UI";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  useFileUploadModal,
  MediaUploadModal,
  Modal,
  ModalContent,
  ModalOverlay,
} from "@UI";

export interface AddNewStoryModalProps { }

const colors: string[] = [
  "red",
  "yellow",
  "purple",
  "green",
  "cyan",
  "gray",
  "lime",
  "orange",
];

export const AddNewStoryModal: React.FC<AddNewStoryModalProps> = () => {
const { t } = useTranslation();
  const [SelectedColor, setSelectedColor] = React.useState<string>("");
  const { isOpen, closeNewStoryModal } = useNewStoryModal();
  const { setUploadType, cancelUpload } = useFileUploadModal();
  const [imgSrc, setImgSrc] = React.useState<string | ArrayBuffer | null>(null);
  const [vidSrc, setVidSrc] = React.useState<string | ArrayBuffer | null>(null);

  const imgRef = React.useRef<HTMLImageElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (videoRef && videoRef.current) {
      try {
        console.log(vidSrc);
        //@ts-ignore
        videoRef.current.srcObject = vidSrc;
      } catch (error) {
        console.log("vid error", error);
      }
    }
  }, [vidSrc]);

  React.useEffect(() => {
    if (imgRef && imgRef.current) {
      try {
        //@ts-ignore
        imgRef.current.src = imgSrc;
      } catch (error) {
        console.log(error);
      }
    }
  }, [imgSrc]);

  function resetState() {
    setImgSrc(null);
    setVidSrc(null);
  }

  React.useEffect(() => {
    cancelUpload();
  }, [imgSrc, vidSrc]);

  const fileAdded = !!imgSrc || !!vidSrc;

  return (
    <Modal
      onOpen={() => { }}
      isOpen={isOpen as boolean}
      onClose={() => {
        closeNewStoryModal();
        resetState();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <MediaUploadModal
          onImgUpload={(converted, raw) => setImgSrc(converted)}
          onVidUpload={(converted, raw) => setVidSrc(converted)}
        />
        <div className="flex gap-8 w-full flex-col">
          <div className="flex justify-center items-center relative w-full">
            <Avatar name="wiaah" src="/wiaah_logo.png" />
            <CloseIcon
              className="p-0 absolute right-0 top-1/2 transform-cpu -translate-y-1/2 text-2xl text-black"
              onClick={closeNewStoryModal}
            />
          </div>
          <Textarea
            className="h-60 w-full"
            style={{
              backgroundColor: SelectedColor,
            }}
            placeholder="type something cool to share"
          />

          <HStack className="no-scrollBar w-full overflow-x-scroll gap-4 justify-between">
            {colors.map((color, i) => (
              <div
                onClick={() => setSelectedColor(color)}
                className="cursor-pointer p-4 rounded-full"
                key={i}
                style={{
                  background: color,
                }}
              />
            ))}
          </HStack>
          <div className="flex w-full justify-between">
            <HStack className="gap-4">
              <BiImageAlt
                className={`${fileAdded
                    ? "cursor-grab pointer-events-none"
                    : "cursor-pointer pointer-events-auto"
                  } text-xl fill-primary`}
                data-testid="AttachPhotoBtn"
                onClick={() => setUploadType("picture")}
              />
              <IoVideocam
                className={`${fileAdded
                    ? "cursor-not-allowed pointer-events-none"
                    : "cursor-pointer pointer-events-auto"
                  } text-xl text-primary`}
                data-testid="AttachVideoBtn"
                onClick={() => setUploadType("video")}
              />
            </HStack>
            <Button onClick={closeNewStoryModal} className="capitalize">
              {t("post")}
            </Button>
          </div>
          <HStack className="overflow-hidden max-h-[40rem] justify-center gap-8">
            {imgSrc && (
              <div className="w-full h-full justify-center items-center flex">
                <img
                  className="max-w-full max-h-full object-contain"
                  ref={imgRef}
                />
              </div>
            )}

            {vidSrc && (
              <div className="w-full h-full justify-center items-center flex">
                <video
                  ref={videoRef}
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            )}
          </HStack>
        </div>
      </ModalContent>
    </Modal>
  );
};
