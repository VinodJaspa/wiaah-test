import React from "react";
import { useTranslation } from "react-i18next";
import {
  useFileUploadModal,
  useNewPost,
  MediaUploadModal,
  Modal,
  ModalOverlay,
  ModalContent,
  ImageIcon,
  VideoCameraIcon,
  SmilingFaceEmoji,
  PlayButtonFillIcon,
  PersonIcon,
  LocationOnPointIcon,
  Button,
  Divider,
  HStack,
  VStack,
  Textarea,
} from "ui";
import { FloatingContainer, Avatar } from "ui";
import { useUserData } from "hooks";
import { MdClose } from "react-icons/md";
import { BsPlayFill } from "react-icons/bs";
import { getFileSrcData, FileRes, runIfFn } from "utils";

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

  const buttons: {
    icon: React.ReactNode;
    name: string;
    enabled: boolean;
    note: string;
    className: string;
  }[] = [
    {
      icon: ImageIcon,
      name: t("Picture"),
      enabled: true,
      note: "",
      className: "bg-red-100 fill-red-500 text-red-500",
    },
    {
      icon: SmilingFaceEmoji,
      name: t("Feeling"),
      enabled: true,
      note: "",
      className: "bg-yellow-100 fill-yellow-500 text-yellow-500",
    },
    {
      icon: VideoCameraIcon,
      name: t("Live"),
      enabled: false,
      note: t("Cooming Soon"),
      className: "bg-blue-100 fill-blue-500 text-blue-500",
    },
    {
      icon: LocationOnPointIcon,
      name: t("Location"),
      enabled: true,
      note: "",
      className: "bg-primary-100 fill-primary-500 text-primary-500",
    },
    {
      icon: PlayButtonFillIcon,
      name: t("Action"),
      note: "",
      className: "bg-purple-100 fill-purple-500 text-purple-500",
      enabled: true,
    },
    {
      icon: PersonIcon,
      name: t("Idenity"),
      enabled: true,
      note: "",
      className: "bg-indigo-100 fill-indigo-500 text-indigo-500",
    },
  ];

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
      <ModalContent className="min-w-[min(95%,60rem)]">
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
                    colorScheme={"gray"}
                    className="px-1 py-1 -translate-y-1/2"
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
          <Divider className="" />
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
            <div className="flex w-full gap-4 px-[4.5rem]">
              {buttons.map(({ className, enabled, icon, name }, i) => (
                <div
                  key={i}
                  className="flex flex-col w-full items-center gap-1"
                >
                  <div
                    className={`${className || ""} ${
                      enabled
                        ? "cursor-pointer"
                        : "opacity-75 cursor-not-allowed"
                    } flex py-2 px-2 items-center justify-center gap-2 w-full rounded-xl`}
                  >
                    <div className="text-xl">{runIfFn(icon)}</div>
                    <p className="whitespace-nowrap">
                      {enabled ? name : t("Cooming Soon")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button className="font-bold self-end text-md lg:text-lg xl:text-xl">
              {t("Post")}
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
