import React from "react";
import { useTranslation } from "react-i18next";
import {
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
  Slider,
  AspectRatio,
  Radio,
  TrashIcon,
  ModalFooter,
  CheckMarkStepper,
  useCreateActionMutation,
  useSocialControls,
  SellerLayout,
} from "@UI";
import { useUserData } from "hooks";
import { mapArray, useForm } from "utils";
import { FiAtSign } from "react-icons/fi";
import { GrLocationPin } from "react-icons/gr";
import { FaCloudUploadAlt } from "react-icons/fa";

const MAX_UPLOAD_LIMIT = 5;

const MAX_ACTION_SIZE = 2 * 1024 * 1024 * 1024;

export const NewPostView: React.FC = () => {
  const { t } = useTranslation();
  const { value, hideNewPublish } = useSocialControls("newPublish");

  const isOpen = !!value;
  const CloseModal = hideNewPublish;

  const { form, handleChange } = useForm<Parameters<typeof mutate>[0]>({
    src: "",
    cover: "",
  });

  const { mutate } = useCreateActionMutation();

  const [actionVidBlob, setActionVidBlob] = React.useState<Blob>();

  const coversRef = React.useRef<Record<number, HTMLVideoElement>>({});

  const [imageIdx, setImageIdx] = React.useState<number>(0);

  const [mediaType, setMediaType] = React.useState<"photo" | "video">();

  const [media, setMedia] = React.useState<FileList>();

  const setCoversRef = (idx: number, node: HTMLVideoElement) => {
    coversRef.current = { ...coversRef.current, [idx]: node };
  };

  const { user } = useUserData();

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

  React.useEffect(() => {
    const first = media?.item(0);

    if (!first) return;

    const type = first.type;

    const isVideo = vidMinetypes.includes(type);

    const isImg = imgMimetypes.includes(type);

    if (isVideo) setMediaType("video");
    if (isImg) setMediaType("photo");
  }, [media]);

  return (
    <>
      <div className="flex flex-col px-8 justify-center items-center py-20 bg-gray-100 rounded border border-gray-500 border-dashed">
        {mediaType === "photo" ? (
          <div className="flex w-full  flex-col gap-4">
            <div className="w-full flex text-2xl font-bold justify-center">
              {t("Create a post")}
            </div>

            <div className="w-full flex pt-2 items-center gap-4">
              <div className="w-1/2 flex flex-col gap-4">
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
                <div className="flex gap-4 justify-center w-full">
                  {media
                    ? mapArray(Array.from(media!), (v, i) => (
                        <Radio
                          className="cursor-pointer scale-125"
                          checked={imageIdx === i}
                          onChange={(v) =>
                            v.target.checked ? setImageIdx(i) : null
                          }
                        />
                      ))
                    : null}
                </div>
              </div>

              <div className="h-full justify-center items-center w-1/2 justify-self-center flex gap-6">
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
          <div className="flex  w-full flex-col gap-4">
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
                            if (data.size > MAX_ACTION_SIZE) return;
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
            className="flex flex-col items-center justify-center w-fit gap-2"
          >
            <FaCloudUploadAlt className="text-6xl fill-gray-400 mb-6" />
            <p className="cursor-pointer text-lg font-bold">
              {t("Select video or multiple photos to upload")}
            </p>
            <p className="font-medium">{t("Or drag and drop a file")}</p>
            <p className="font-medium">
              {t(
                "Long videos can be split into multiple parts to get more exposure"
              )}
            </p>

            <div className="my-8 flex flex-col items-center gap-3">
              <p>{t("MP4 or WebM")}</p>
              <p>720x1280 {t("resolution or higher")}</p>
              <p>{t("Up to 3 minutes")}</p>
              <p>{t("Less than 2 GB")}</p>
            </div>

            <label className="w-full">
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

              <div className="w-full bg-primary py-2 rounded flex justify-center items-center text-white cursor-pointer">
                {t("Select file")}
              </div>
            </label>
          </div>
        )}
        {media ? (
          <ModalFooter className="justify-between mt-4">
            <Button>{t("Cancel")}</Button>
            <Button>
              {mediaType === "video" && step === 0 ? t("Next") : t("Share")}
            </Button>
          </ModalFooter>
        ) : null}
      </div>
    </>
  );
};
