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
  useCreateActionMutation,
  useSocialControls,
  ModalHeader,
  Drawer,
  DrawerContent,
  CreateActionDrawer,
} from "@UI";
import { useResponsive, useUserData } from "hooks";
import { mapArray, useForm } from "utils";
import { FiAtSign } from "react-icons/fi";
import { GrLocationPin } from "react-icons/gr";

export interface AddNewPostModalProps {}

const MAX_UPLOAD_LIMIT = 5;

const MAX_ACTION_SIZE = 2 * 1024 * 1024 * 1024;

enum AddPostSectionEnum {
  action = "action",
  story = "story",
}

export const AddNewPostModal: React.FC<AddNewPostModalProps> = () => {
  const {
    value,
    hideNewPublish,
    showNewAction,
    addNewStory,
    openSocialNewPostModal,
    createAction,
  } = useSocialControls("newPublish");

  const [AddType, setAddType] = React.useState<AddPostSectionEnum>();

  const isOpen = !!value;
  const CloseModal = hideNewPublish;

  const [imageIdx, setImageIdx] = React.useState<number>(0);

  const [mediaType, setMediaType] = React.useState<"photo" | "video">();

  const { user } = useUserData();

  const { t } = useTranslation();

  const [step, setStep] = React.useState<number>(0);

  React.useEffect(() => {
    if (!isOpen) {
      cleanUpStates();
    }
  }, [isOpen]);

  function cleanUpStates() {}

  const vidTypes = ["mp4", "mov"];
  const imgTypes = ["jpeg", "jpg", "png"];

  const vidMinetypes = vidTypes.map((v) => `video/${v}`);
  const imgMimetypes = imgTypes.map((v) => `image/${v}`);

  const publishMediaTypes = React.useMemo<
    {
      icon: React.ReactElement;
      label: string;
      onClick: () => any;
    }[]
  >(
    () => [
      {
        icon: <></>,
        label: t("Post"),
        onClick: () => {
          openSocialNewPostModal();
          CloseModal();
        },
      },
      {
        icon: <></>,
        label: t("Story"),
        onClick: () => {
          addNewStory();
          CloseModal();
        },
      },
      {
        icon: <></>,
        label: t("Action"),
        onClick: () => {
          createAction({});
          CloseModal();
        },
      },
    ],
    []
  );

  // React.useEffect(() => {
  //   const first = media?.item(0);

  //   if (!first) return;

  //   const type = first.type;

  //   const isVideo = vidMinetypes.includes(type);

  //   const isImg = imgMimetypes.includes(type);

  //   if (isVideo) setMediaType("video");
  //   if (isImg) setMediaType("photo");
  // }, [media]);

  //   {
  //   mediaType === "photo" ? (
  //     <></>
  //   ) : // <div className="flex h-[616px] bg-white flex-col gap-4">
  //   //   <div className="w-full flex text-2xl  font-bold justify-center">
  //   //     {t("Create a post")}
  //   //   </div>

  //   //   <div className="w-1/2 flex pt-2 items-center flex-col gap-4">
  //   //     <AspectRatio className="overflow-hidden" ratio={9 / 14}>
  //   //       <Slider
  //   //         gap={8}
  //   //         itemsCount={1}
  //   //         currentItemIdx={imageIdx}
  //   //         onSliderChange={(v) => setImageIdx(v)}
  //   //       >
  //   //         {media
  //   //           ? Array.from(media!).map((v) => (
  //   //               <div className="relative w-full h-full">
  //   //                 <Image
  //   //                   className="w-full h-full object-cover"
  //   //                   src={URL.createObjectURL(v)}
  //   //                 ></Image>
  //   //                 <div className="pointer-events-none hover:pointer-events-auto h-full w-full flex justify-center items-center absolute top-0 left-0 opacity-0 hover:opacity-100 bg-black bg-opacity-30">
  //   //                   <HStack>
  //   //                     <Button
  //   //                       colorScheme="danger"
  //   //                       center
  //   //                       className="p-2"
  //   //                     >
  //   //                       <TrashIcon />
  //   //                     </Button>
  //   //                   </HStack>
  //   //                 </div>
  //   //               </div>
  //   //             ))
  //   //           : null}
  //   //       </Slider>
  //   //     </AspectRatio>
  //   //     <div className="flex gap-4 items-center">
  //   //       {media
  //   //         ? mapArray(Array.from(media!), (v, i) => (
  //   //             <Radio
  //   //               className="cursor-pointer scale-125"
  //   //               checked={imageIdx === i}
  //   //               onChange={(v) =>
  //   //                 v.target.checked ? setImageIdx(i) : null
  //   //               }
  //   //             ></Radio>
  //   //           ))
  //   //         : null}
  //   //     </div>

  //   //     <div className="h-full justify-self-center flex gap-6">
  //   //       <div className=" w-1/2 flex flex-col gap-2">
  //   //         <div className="flex flex-col gap-1">
  //   //           <p>{t("Legend")}</p>
  //   //           <Textarea className="h-28" />
  //   //         </div>
  //   //         <div className="flex flex-col gap-1">
  //   //           <p>{t("Tag")}</p>
  //   //           <InputGroup>
  //   //             <Input></Input>
  //   //             <InputRightElement className="px-4">
  //   //               <HashtagIcon />
  //   //             </InputRightElement>
  //   //           </InputGroup>
  //   //         </div>
  //   //         <div className="flex flex-col gap-1">
  //   //           <p>{t("User")}</p>
  //   //           <InputGroup>
  //   //             <Input></Input>
  //   //             <InputRightElement className="px-4">
  //   //               <FiAtSign></FiAtSign>
  //   //             </InputRightElement>
  //   //           </InputGroup>
  //   //         </div>
  //   //         <div className="flex flex-col gap-1">
  //   //           <p>{t("Place")}</p>
  //   //           <InputGroup>
  //   //             <Input></Input>
  //   //             <InputRightElement className="px-4">
  //   //               <GrLocationPin></GrLocationPin>
  //   //             </InputRightElement>
  //   //           </InputGroup>
  //   //         </div>
  //   //         <div className="flex flex-col gap-1">
  //   //           <p>{t("Link")}</p>
  //   //           <Input
  //   //             placeholder={t(
  //   //               "You can add a wiaah product link only"
  //   //             )}
  //   //           />
  //   //         </div>
  //   //       </div>
  //   //     </div>
  //   //   </div>
  //   // </div>
  //   mediaType === "video" && media?.item(0) ? (
  //     <></>
  //   ) : null
  // }

  return user ? (
    <>
      <Modal isOpen={isOpen} onClose={CloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader title={t("New Publish")} />
          <div className="grid grid-cols-3 gap-4">
            {mapArray(publishMediaTypes, ({ icon, label, onClick }) => (
              <button onClick={onClick}>
                <AspectRatio ratio={1}>
                  <div className="flex items-center h-full flex-col hover:bg-primary-50 cursor-pointer justify-center gap-4 border border-primary rounded-2xl">
                    <div className="w-fit">{icon}</div>
                    <p className="w-fit">{label}</p>
                  </div>
                </AspectRatio>
              </button>
            ))}
          </div>
        </ModalContent>
      </Modal>
      <AddActionView />
      <AddStoryView />
      <AddPostView />
      <CreateActionDrawer />
    </>
  ) : null;
};

const AddStoryView: React.FC = () => {
  return null;
};

const AddActionView: React.FC = () => {
  const { t } = useTranslation();
  const { hideNewAction, value } = useSocialControls("newAction");
  const { isMobile, isTablet } = useResponsive();
  const isOpen = !!value;
  const isSmall = isMobile || isTablet;

  const [step, setStep] = React.useState<number>(0);
  const [actionVidBlob, setActionVidBlob] = React.useState<Blob>();
  const [media, setMedia] = React.useState<FileList>();
  const { form, handleChange } = useForm<Parameters<typeof mutate>[0]>({
    allowedActions: [],
    coverUploadId: "",
    srcUploadId: "",
  });

  const { mutate } = useCreateActionMutation();

  const coversRef = React.useRef<Record<number, HTMLVideoElement>>({});

  const setCoversRef = (idx: number, node: HTMLVideoElement) => {
    coversRef.current = { ...coversRef.current, [idx]: node };
  };

  const ActionView = (
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
                    video={media?.item(0)!}
                    maxDuration={180}
                    onFinish={(data) => {
                      if (data.size > MAX_ACTION_SIZE) return;
                      setActionVidBlob(data);
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
                        placeholder={t("You can add a wiaah product link only")}
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
                              idx === 0 ? null : coversRef.current[idx - 1];
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
  );

  return isSmall ? (
    <Drawer isOpen={isOpen} onClose={hideNewAction}>
      <DrawerContent>{ActionView}</DrawerContent>
    </Drawer>
  ) : (
    <Modal isOpen={isOpen} onClose={hideNewAction}>
      <ModalOverlay />
      <ModalContent>{ActionView}</ModalContent>
    </Modal>
  );
};

const AddPostView = () => {
  return null;
};

// Old drag and drop

{
  /* (
          <div
            onDrop={(event) => {
              event.preventDefault();

              // setMedia(event.dataTransfer.files);
            }}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23000000FF' stroke-width='3' stroke-dasharray='12' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
            }}
            className="w-[960px] flex flex-col items-center p-8 justify-center h-[616px]"
          >
            <div className="flex flex-col gap-1 items-center">
              <ImageGreenIcon className="text-7xl"></ImageGreenIcon>
              <p className="text-2xl font-bold text-primary-800">
                {t("Drop your media here, or")}{" "}
                <label>
                  <input
                    onChange={(e) => {
                      if (e.target.files) {
                        // setMedia(e.target.files);
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
          ) */
}
{
  /* {media ? (
            <ModalFooter className="justify-between">
              <Button>{t("Cancel")}</Button>
              <Button>
                {mediaType === "video" && step === 0 ? t("Next") : t("Share")}
              </Button>
            </ModalFooter>
          ) : null} */
}
<></>;
