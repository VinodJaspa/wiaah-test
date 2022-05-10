import {
  Center,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { HiCamera, HiFolderAdd, HiVideoCamera } from "react-icons/hi";
import { useFileUploadModal, PostsViewModalsHeader } from "ui";
import { TakePictureModal, RecordVideoModal } from "ui";
import { getFileSrcData, FileRes } from "ui/components/helpers";

export interface MediaUploadModalProps {
  onImgUpload?: (imgSrc: FileRes) => any;
  onVidUpload?: (vidSrc: string) => any;
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
    console.log("test");
    try {
      if (imageFiles && imageFiles.length > 0) {
        imageFiles.map((img) => {
          getFileSrcData(img, (res) => {
            SendImage(res);
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
        vidArr.map((vid) => {
          const vidSrc = URL.createObjectURL(vid);
          sendVideo(vidSrc);
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

  function sendVideo(vidSrc: string) {
    if (!vidSrc) return;
    onVidUpload && onVidUpload(vidSrc);
  }

  function SendImage(img: FileRes) {
    if (!img) return;
    onImgUpload && onImgUpload(img);
  }

  return (
    <Modal isCentered isOpen={!!uploadType} onClose={cancelUpload}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <PostsViewModalsHeader onBackClick={cancelUpload}>
            <Text>
              {uploadImg
                ? t("upload_a_picture", "Upload a Picture")
                : uploadVid
                ? t("upload_a_video", "Upload a Video")
                : null}
            </Text>
          </PostsViewModalsHeader>
        </ModalHeader>
        <ModalBody pb="2rem">
          <Flex
            gap="2rem"
            justify={"center"}
            flexDirection={{ base: "column", sm: "row" }}
          >
            {uploadImg ? (
              <>
                <TakePictureModal
                  isOpen={takePicture}
                  onClose={() => setTakePicture(false)}
                  onImgCapture={(src) => {
                    setTakePicture(false);
                    SendImage(src);
                  }}
                />
                <label htmlFor="AddImageInput">
                  <Center
                    cursor={"pointer"}
                    h="8rem"
                    w="8rem"
                    rounded={"xl"}
                    borderWidth={"2px"}
                    borderColor="primary.main"
                  >
                    <Icon
                      color="primary.main"
                      fontSize={"xx-large"}
                      cursor="pointer"
                      as={HiFolderAdd}
                    />
                  </Center>
                  <Input
                    display={"none"}
                    id="AddImageInput"
                    type={"file"}
                    multiple={multiple}
                    onChange={(e) => addImageFiles(e.target.files)}
                    accept="image/*"
                  />
                </label>
                <label htmlFor="TakePicture">
                  <Center
                    onClick={() => setTakePicture(true)}
                    h="8rem"
                    w="8rem"
                    rounded={"xl"}
                    borderWidth={"2px"}
                    cursor="pointer"
                    borderColor="primary.main"
                  >
                    <Icon
                      color="primary.main"
                      fontSize={"xx-large"}
                      cursor="pointer"
                      as={HiCamera}
                    />
                  </Center>
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
                  <Center
                    cursor={"pointer"}
                    h="8rem"
                    w="8rem"
                    rounded={"xl"}
                    borderWidth={"2px"}
                    borderColor="primary.main"
                  >
                    <Icon
                      color="primary.main"
                      fontSize={"xx-large"}
                      cursor="pointer"
                      as={HiFolderAdd}
                    />
                  </Center>
                  <Input
                    display={"none"}
                    id="AddVideoInput"
                    type={"file"}
                    multiple={multiple}
                    //@ts-ignore
                    onChange={(e) => setVideoFiles(e.target.files || null)}
                    accept="video/*"
                  />
                </label>
                <label htmlFor="RecordVdeo">
                  <Center
                    h="8rem"
                    w="8rem"
                    rounded={"xl"}
                    borderWidth={"2px"}
                    cursor="pointer"
                    onClick={() => setRecordVideo(true)}
                    borderColor="primary.main"
                  >
                    <Icon
                      color="primary.main"
                      fontSize={"xx-large"}
                      cursor="pointer"
                      as={HiVideoCamera}
                    />
                  </Center>
                </label>
              </>
            ) : null}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
