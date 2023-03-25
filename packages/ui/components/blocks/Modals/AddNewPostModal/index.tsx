import React from "react";
import { useTranslation } from "react-i18next";
import {
  useNewPost,
  Modal,
  ModalOverlay,
  ModalContent,
  Button,
  HStack,
  Textarea,
  VideoEditor,
  Image,
  Input,
  Checkbox,
  VideoFlattenFrames,
  InputGroup,
  InputRightElement,
  HashtagIcon,
  ImageGreenIcon,
  Slider,
  AspectRatio,
  Radio,
  TrashIcon,
  ModalFooter,
  CheckMarkStepper,
} from "@UI";
import { useDisclouser, useUserData } from "hooks";
import { FileRes, mapArray, useForm } from "utils";
import { FiAtSign } from "react-icons/fi";
import { GrLocationPin } from "react-icons/gr";

export interface AddNewPostModalProps {}

const MAX_UPLOAD_LIMIT = 5;

enum AddPostSectionEnum {
  action = 1,
}

export const AddNewPostModal: React.FC<AddNewPostModalProps> = () => {
  const { isOpen, CloseModal, OpenModal } = useNewPost();
  const [uploadiLimitHit, setUploadLimitHit] = React.useState<boolean>(false);

  const { form, handleChange } = useForm<{
    video: string;
    cover: string;
  }>({ video: "", cover: "" });
  const [actionVidBlob, setActionVidBlob] = React.useState<Blob>();
  const coversRef = React.useRef<Record<number, HTMLVideoElement>>({});
  const [imageIdx, setImageIdx] = React.useState<number>(0);

  const [mediaType, setMediaType] = React.useState<"photo" | "video">();
  const [media, setMedia] = React.useState<FileList>();

  const setCoversRef = (idx: number, node: HTMLVideoElement) => {
    coversRef.current = { ...coversRef.current, [idx]: node };
  };

  const [uploadedImages, setUploadedImages] = React.useState<FileRes[]>([]);
  const [uploadedVideos, setUploadedVideos] = React.useState<string[]>([]);
  const { user } = useUserData();
  const { t } = useTranslation();
  const [step, setStep] = React.useState<number>(0);

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

  const vidTypes = ["mp4", "mov"];
  const imgTypes = ["jpeg", "jpg", "png"];

  const vidMinetypes = vidTypes.map((v) => `video/${v}`);
  const imgMimetypes = imgTypes.map((v) => `image/${v}`);

  React.useEffect(() => {
    const first = media?.item(0);

    if (!first) return;

    const type = first.type;

    const isVideo = vidMinetypes.includes(type);

    const isImg = imgMimetypes.includes(type);

    if (isVideo) setMediaType("video");
    if (isImg) setMediaType("photo");
  }, [media]);

  return user ? (
    <>
      <Modal isOpen={isOpen} onClose={CloseModal} onOpen={OpenModal}>
        <ModalOverlay />
        <ModalContent className="min-w-[995px]">
          {mediaType === "photo" ? (
            <div className="flex h-[616px] bg-white flex-col gap-4">
              <div className="w-full flex text-2xl  font-bold justify-center">
                {t("Create a post")}
              </div>

              <div className="w-1/2 flex pt-2 items-center flex-col gap-4">
                <AspectRatio className="overflow-hidden" ratio={9 / 14}>
                  <Slider
                    gap={8}
                    itemsCount={1}
                    currentItemIdx={imageIdx}
                    onSliderChange={(v) => setImageIdx(v)}
                  >
                    {media
                      ? Array.from(media!).map((v) => (
                          <div className="relative w-full h-full">
                            <Image
                              className="w-full h-full object-cover"
                              src={URL.createObjectURL(v)}
                            ></Image>
                            <div className="pointer-events-none hover:pointer-events-auto h-full w-full flex justify-center items-center absolute top-0 left-0 opacity-0 hover:opacity-100 bg-black bg-opacity-30">
                              <HStack>
                                <Button
                                  colorScheme="danger"
                                  center
                                  className="p-2"
                                >
                                  <TrashIcon />
                                </Button>
                              </HStack>
                            </div>
                          </div>
                        ))
                      : null}
                  </Slider>
                </AspectRatio>
                <div className="flex gap-4 items-center">
                  {media
                    ? mapArray(Array.from(media!), (v, i) => (
                        <Radio
                          className="cursor-pointer scale-125"
                          checked={imageIdx === i}
                          onChange={(v) =>
                            v.target.checked ? setImageIdx(i) : null
                          }
                        ></Radio>
                      ))
                    : null}
                </div>

                <div className="h-full justify-self-center flex gap-6">
                  <div className=" w-1/2 flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                      <p>{t("Legend")}</p>
                      <Textarea className="h-28" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p>{t("Tag")}</p>
                      <InputGroup>
                        <Input></Input>
                        <InputRightElement className="px-4">
                          <HashtagIcon />
                        </InputRightElement>
                      </InputGroup>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p>{t("User")}</p>
                      <InputGroup>
                        <Input></Input>
                        <InputRightElement className="px-4">
                          <FiAtSign></FiAtSign>
                        </InputRightElement>
                      </InputGroup>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p>{t("Place")}</p>
                      <InputGroup>
                        <Input></Input>
                        <InputRightElement className="px-4">
                          <GrLocationPin></GrLocationPin>
                        </InputRightElement>
                      </InputGroup>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p>{t("Link")}</p>
                      <Input
                        placeholder={t("You can add a wiaah product link only")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : mediaType === "video" && media?.item(0) ? (
            <div className="flex h-[616px] bg-white w-full flex-col gap-4">
              <div className="w-full h-full flex text-2xl font-bold justify-center">
                {step === 0 ? t("Video Editing") : t("Video Details")}
              </div>
              <div className="h-full w-full mx-auto">
                <CheckMarkStepper
                  className="h-full"
                  stepHeaderClassName="w-[24rem] mx-auto"
                  currentStepIdx={step}
                  steps={[
                    {
                      key: "editor",
                      stepComponent: () => (
                        <div className="mx-auto w-[20.5rem]">
                          <VideoEditor
                            video={media.item(0)!}
                            maxDuration={180}
                            onFinish={(data) => {
                              setActionVidBlob(data);
                              handleChange("video", URL.createObjectURL(data));
                              setStep(1);
                            }}
                          />
                        </div>
                      ),
                      stepName: t("Editor"),
                    },
                    {
                      key: "details",
                      stepComponent: () => (
                        <div className="flex w-full flex-col px-2 h-[calc(100%-6rem)] overflow-y-scroll thinScroll gap-4">
                          <div className="w-96 mx-auto">
                            <div className="flex flex-col gap-1">
                              <p>{t("Legend")}</p>
                              <Textarea className="h-28" />
                            </div>
                            <div className="flex flex-col gap-1">
                              <p>{t("Tag")}</p>
                              <InputGroup>
                                <Input></Input>
                                <InputRightElement className="px-4">
                                  <HashtagIcon />
                                </InputRightElement>
                              </InputGroup>
                            </div>
                            <div className="flex flex-col gap-1">
                              <p>{t("User")}</p>
                              <InputGroup>
                                <Input></Input>
                                <InputRightElement className="px-4">
                                  <FiAtSign></FiAtSign>
                                </InputRightElement>
                              </InputGroup>
                            </div>
                            <div className="flex flex-col gap-1">
                              <p>{t("Place")}</p>
                              <InputGroup>
                                <Input></Input>
                                <InputRightElement className="px-4">
                                  <GrLocationPin></GrLocationPin>
                                </InputRightElement>
                              </InputGroup>
                            </div>
                            <div className="flex flex-col gap-1">
                              <p>{t("Link")}</p>
                              <Input
                                placeholder={t(
                                  "You can add a wiaah product link only"
                                )}
                              />
                            </div>
                            <p>{t("Allow user to")}:</p>
                            <Checkbox>{t("Duet")}</Checkbox>
                            <Checkbox>{t("Stitch")}</Checkbox>
                            <Checkbox>{t("Comment")}</Checkbox>
                            <div className="flex flex-col gap-1">
                              <p>{t("Cover")}</p>

                              {form.video && form.video.length > 0 ? (
                                <VideoFlattenFrames
                                  videoEverySec={1}
                                  onFrameSelected={(v, idx) => {
                                    const ref = coversRef.current[idx];
                                    const ref1 =
                                      idx === 0
                                        ? null
                                        : coversRef.current[idx - 1];
                                    const ref2 = coversRef.current[idx + 1];

                                    if (ref1) {
                                      ref1.pause();
                                    }
                                    if (ref2) {
                                      ref2.pause();
                                    }
                                    if (ref) {
                                      ref?.play();
                                    }
                                  }}
                                  renderItem={(blob, idx) => (
                                    <div className="relative">
                                      {idx === 0 ? (
                                        <div className="absolute top-0 left-0 border-4 border-primary w-full h-full"></div>
                                      ) : null}
                                      <video
                                        muted
                                        loop
                                        data-idx={idx}
                                        ref={(node) => {
                                          if (node) {
                                            setCoversRef(idx, node);
                                          }
                                          if (idx === 0 && node) {
                                            node?.play();
                                          }
                                        }}
                                        src={URL.createObjectURL(blob)}
                                      />
                                    </div>
                                  )}
                                  videoSrc={form.video}
                                />
                              ) : null}
                            </div>
                          </div>
                        </div>
                      ),
                      stepName: t("Details"),
                    },
                  ]}
                ></CheckMarkStepper>
              </div>
            </div>
          ) : (
            <div
              onDrop={(event) => {
                event.preventDefault();

                setMedia(event.dataTransfer.files);
              }}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23000000FF' stroke-width='3' stroke-dasharray='12' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
              }}
              className="w-[960px] flex flex-col items-center  justify-center h-[616px]"
            >
              <div className="flex flex-col gap-1 items-center">
                <ImageGreenIcon className="text-7xl"></ImageGreenIcon>
                <p className="text-2xl font-bold text-primary-800">
                  {t("Drop your media here, or")}{" "}
                  <label>
                    <input
                      onChange={(e) => {
                        if (e.target.files) {
                          setMedia(e.target.files);
                        }
                      }}
                      type="file"
                      multiple
                      accept={vidMinetypes.concat(imgMimetypes).join(",")}
                      className="hidden"
                    />
                    <span
                      onClick={() => {}}
                      className="cursor-pointer text-primary-500"
                    >
                      {t("browse")}
                    </span>
                  </label>
                </p>
                <p className="text-lg uppercase text-primary-700">
                  {t("Supports")}: {imgTypes.concat(vidTypes).join(", ")}
                </p>
              </div>
            </div>
          )}
          {media ? (
            <ModalFooter className="justify-between">
              <Button>{t("Cancel")}</Button>
              <Button>
                {mediaType === "video" && step === 0 ? t("Next") : t("Share")}
              </Button>
            </ModalFooter>
          ) : null}
        </ModalContent>
      </Modal>
    </>
  ) : null;
};

// const buttons: {
//   icon: React.ReactNode;
//   name: string;
//   enabled: boolean;
//   note: string;
//   className: string;
//   onClick?: () => any;
// }[] = [
//   {
//     icon: ImageIcon,
//     name: t("Picture"),
//     enabled: true,
//     note: "",
//     className: "bg-red-100 fill-red-500 text-red-500",
//   },
//   {
//     icon: SmilingFaceEmoji,
//     name: t("Feeling"),
//     enabled: true,
//     note: "",
//     className: "bg-yellow-100 fill-yellow-500 text-yellow-500",
//   },
//   {
//     icon: VideoCameraIcon,
//     name: t("Live"),
//     enabled: false,
//     note: t("Cooming Soon"),
//     className: "bg-blue-100 fill-blue-500 text-blue-500",
//   },
//   {
//     icon: LocationOnPointIcon,
//     name: t("Location"),
//     enabled: true,
//     note: "",
//     className: "bg-primary-100 fill-primary-500 text-primary-500",
//   },
//   {
//     icon: PlayButtonFillIcon,
//     name: t("Action"),
//     note: "",
//     className: "bg-purple-100 fill-purple-500 text-purple-500",
//     enabled: true,
//     onClick() {
//       setStep(AddPostSectionEnum.action);
//     },
//   },
//   {
//     icon: PersonIcon,
//     name: t("Idenity"),
//     enabled: true,
//     note: "",
//     className: "bg-indigo-100 fill-indigo-500 text-indigo-500",
//   },
// ];
