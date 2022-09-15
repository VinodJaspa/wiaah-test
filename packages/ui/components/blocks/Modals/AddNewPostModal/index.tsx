import React from "react";
import { useTranslation } from "react-i18next";
import {
  useFileUploadModal,
  useNewPost,
  MediaUploadModal,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Button,
  Divider,
  HStack,
  VStack,
  Textarea,
} from "ui";
import { FloatingContainer, Avatar } from "ui";
import { useUserData } from "hooks";
import { MdClose } from "react-icons/md";
import { BsEmojiSmile, BsPlayFill } from "react-icons/bs";
import { BiImage } from "react-icons/bi";
import { CgPlayButtonR } from "react-icons/cg";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoVideocamOutline } from "react-icons/io5";
import { getFileSrcData, FileRes } from "ui/components/helpers";

export interface AddNewPostModalProps {}

const MAX_UPLOAD_LIMIT = 5;

export const AddNewPostModal: React.FC<AddNewPostModalProps> = () => {
  const { isOpen, CloseModal, OpenModal } = useNewPost();
  const { setUploadType } = useFileUploadModal();
  const [uploadiLimitHit, setUploadLimitHit] = React.useState<boolean>(false);

  const [uploadedImages, setUploadedImages] = React.useState<FileRes[]>([]);
  const [uploadedVideos, setUploadedVideos] = React.useState<string[]>([]);
  const { user } = useUserData();
  const { t } = useTranslation();

  React.useEffect(() => {
    if (!isOpen) {
      cleanUpStates();
    }
  }, [isOpen]);

  function cleanUpStates() {
    setUploadLimitHit(false);
    setUploadedImages([]);
    setUploadedVideos([]);
  }

  const ValidateLimit = React.useCallback(
    (itemsLength: number) => {
      if (
        uploadedImages.length + uploadedVideos.length + itemsLength >
        MAX_UPLOAD_LIMIT
      ) {
        setUploadLimitHit(true);
        return false;
      }
      return true;
    },
    [uploadedImages, uploadedVideos]
  );

  function addUploadedImg(imgSrc: FileRes) {
    const valid = ValidateLimit(1);
    if (valid) {
      console.log(ValidateLimit(1));
      setUploadedImages((imgs) => [...imgs, imgSrc]);
    }
  }
  function addUploadedVideo(vidSrc: string) {
    const valid = ValidateLimit(1);
    if (valid) {
      setUploadedVideos((vids) => [...vids, vidSrc]);
    }
  }

  function handleFilesUpload(e: React.ChangeEvent<HTMLInputElement>) {
    setUploadLimitHit(false);
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      ValidateLimit(fileArray.length);
      fileArray.slice(0, MAX_UPLOAD_LIMIT).map((file) => {
        if (file.type.includes("image")) {
          getFileSrcData(file, (res) => {
            addUploadedImg(res);
          });
        } else if (file.type.includes("video")) {
          const test = URL.createObjectURL(file);
          addUploadedVideo(test);
        }
      });
    }
  }

  return user ? (
    <Modal isOpen={isOpen} onClose={CloseModal} onOpen={OpenModal}>
      <ModalOverlay />
      <ModalContent className="min-w-[min(100%,40rem)]">
        <MediaUploadModal
          onVidUpload={addUploadedVideo}
          onImgUpload={addUploadedImg}
          multiple
        />
        <div className="flex flex-col py-4 gap-4">
          <FloatingContainer
            items={[
              {
                label: (
                  <Button
                    // fontSize={"xx-large"}
                    colorScheme={"gray"}
                    className="px-1 py-1 -translate-y-1/2"
                    // color="gray.900"
                    // rounded={"full"}
                    // bgColor="gray.200"
                    aria-label="close new post modal"
                    onClick={CloseModal}
                  >
                    <MdClose />
                  </Button>
                ),
                right: true,
                top: "center",
                floatingItemProps: {},
              },
            ]}
          >
            <span className="w-full justify-self-center text-xl font-extrabold text-center">
              {t("create_post", "Create Post")}
            </span>
          </FloatingContainer>
          <Divider className="border-gray-500" />
          <HStack>
            <Avatar name={user.name} photoSrc={user.photoSrc} />
            <VStack>
              <span className="text-lg">{user.name}</span>
            </VStack>
          </HStack>
          <div className="flex flex-col gap-4 w-full">
            <Textarea
              className="text-lg min-h-[10rem] w-full resize-none "
              placeholder={`${t(
                "what's_on_your_mind",
                "What's on your mind"
              )}, ${user.name}?`}
            />
            <HStack className="w-full justify-center gap-8 text-4xl">
              <BiImage
                className="cursor-pointer text[1.3em] fill-red-500"
                data-testid="AttachPhotoBtn"
                onClick={() => setUploadType("picture")}
              />
              <IoVideocamOutline
                className="cursor-pointer text[1.3em] text-yellow-300 "
                data-testid="AttachVideoBtn"
                onClick={() => setUploadType("video")}
              />
              <HiOutlineLocationMarker
                className="cursor-pointer text[1.3em] text-blue-500"
                data-testid="AddPostLocationBtn"
              />
              <BsEmojiSmile
                className="cursor-pointer text[1.3em] fill-purple-600"
                data-testid="AddStatusBtn"
                fill="purple.600"
              />
              <CgPlayButtonR
                className="cursor-pointer text[1.3em] text-primary"
                data-testid="AttachActionBtn"
              />
            </HStack>
            <Button className="font-bold text-md lg:text-lg xl:text-xl">
              {t("post", "Post")}
            </Button>
          </div>
          {uploadiLimitHit && (
            <span className="w-full text-center text-xl text-red-500">
              {t("you_can_only_upload", "You can only upload")}{" "}
              {MAX_UPLOAD_LIMIT} {t("files_per_post", "files per post")}
            </span>
          )}
          <div className="grid grid-cols-3 auto-rows-[8rem] gap-4">
            {uploadedImages.map((img, i) => (
              <div
                className="flex justify-center items-center w-full h-full border-[4px] border-primary"
                key={i}
              >
                <img
                  className="max-w-full max-h-full object-contain"
                  //@ts-ignore
                  src={img || ""}
                  key={i}
                />
              </div>
            ))}
            {uploadedVideos.map((vid, i) => (
              <div
                className="relative flex justify-center items-center w-full h-full border-[4px] border-primary"
                key={i}
              >
                <BsPlayFill className="absolute text-white rounded-full text-4xl top-[0.25em] left-[0.25em] pl-[0.1em] bg-black bg-opacity-50" />
                <video
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                  }}
                  src={vid}
                />
              </div>
            ))}
          </div>
        </div>
      </ModalContent>
    </Modal>
  ) : null;
};
