import React from "react";
import { useTranslation } from "react-i18next";
import {
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
} from "@UI";
import { useUserData } from "hooks";
import { mapArray, useForm } from "utils";
import { FiAtSign } from "react-icons/fi";
import { GrLocationPin } from "react-icons/gr";
import { ActionType, CommentsVisibility } from "@features/API";

const MAX_UPLOAD_LIMIT = 5;
const MAX_ACTION_SIZE = 2 * 1024 * 1024 * 1024;

const vidTypes = ["mp4", "mov"];
const imgTypes = ["jpeg", "jpg", "png"];
const vidMimetypes = vidTypes.map((v) => `video/${v}`);
const imgMimetypes = imgTypes.map((v) => `image/${v}`);

export const AddNewPostModal: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useUserData();
  const { value, hideNewPublish } = useSocialControls("newPublish");
  const { mutate } = useCreateActionMutation();

  const [media, setMedia] = React.useState<FileList>();
  const [mediaType, setMediaType] = React.useState<"photo" | "video">();
  const [step, setStep] = React.useState<number>(0);
  const [imageIdx, setImageIdx] = React.useState<number>(0);
  const [actionVidBlob, setActionVidBlob] = React.useState<Blob>();

  const coversRef = React.useRef<Record<number, HTMLVideoElement>>({});
  const setCoversRef = (idx: number, node: HTMLVideoElement) => {
    coversRef.current = { ...coversRef.current, [idx]: node };
  };

  const { form, handleChange } = useForm<Parameters<typeof mutate>[0]>({
    allowedActions: [ActionType.Comment, ActionType.Duet, ActionType.Stitch],
    commentsVisibility: CommentsVisibility.Public,
    coverUploadId: "",
    link: "",
    location: { address: "", city: "", country: "", state: "" },
    mentions: [],
    srcUploadId: "",
    tags: [],
    thumbnailUploadId: "",
  });

  React.useEffect(() => {
    if (!value) {
      cleanUpStates();
    }
  }, [value]);

  React.useEffect(() => {
    const first = media?.item(0);
    if (first) {
      const type = first.type;
      setMediaType(
        vidMimetypes.includes(type)
          ? "video"
          : imgMimetypes.includes(type)
            ? "photo"
            : undefined,
      );
    }
  }, [media]);

  const cleanUpStates = () => {
    // Implement state cleanup logic here
  };

  const renderPhotoContent = () => (
    <div className="flex h-[616px] bg-white flex-col gap-4">
      <div className="w-full flex text-2xl font-bold justify-center">
        {t("Create a post")}
      </div>
      <div className="w-full flex pt-2 items-center gap-4">
        <PhotoPreview
          media={media}
          imageIdx={imageIdx}
          setImageIdx={setImageIdx}
        />
        <PostDetailsForm />
      </div>
    </div>
  );

  const renderVideoContent = () => (
    <div className="flex h-[616px] bg-white w-full flex-col gap-4">
      <div className="w-full h-full flex text-2xl font-bold justify-center">
        {step === 0 ? t("Video Editing") : t("Video Details")}
      </div>
      <div className="h-full w-full mx-auto">
        <CheckMarkStepper
          className="h-full"
          stepHeaderClassName="w-[24rem] mx-auto"
          currentStepIdx={1}
          steps={[
            {
              key: "editor",
              stepName: t("Editor"),
              stepComponent: (
                <VideoEditorStep
                  media={media}
                  setActionVidBlob={setActionVidBlob}
                  handleChange={handleChange}
                  setStep={setStep}
                />
              ),
            },
            {
              key: "details",
              stepName: t("Details"),
              stepComponent: (
                <VideoDetailsStep
                  form={form}
                  coversRef={coversRef}
                  setCoversRef={setCoversRef}
                />
              ),
            },
          ]}
        />
      </div>
    </div>
  );

  const renderDropZone = () => (
    <div
      onDrop={(event) => {
        event.preventDefault();
        setMedia(event.dataTransfer.files);
      }}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23000000FF' strokeWidth='3' stroke-dasharray='12' stroke-dashoffset='0' strokeLinecap='butt'/%3e%3c/svg%3e")`,
      }}
      className="w-[960px] flex flex-col items-center justify-center h-[616px]"
    >
      <div className="flex flex-col gap-1 items-center">
        <ImageGreenIcon className="text-7xl" />
        <p className="text-2xl font-bold text-primary-800">
          {t("Drop your media here, or")}{" "}
          <label>
            <input
              onChange={(e) => e.target.files && setMedia(e.target.files)}
              type="file"
              multiple
              accept={vidMimetypes.concat(imgMimetypes).join(",")}
              className="hidden"
            />
            <span className="cursor-pointer text-primary-500">
              {t("browse")}
            </span>
          </label>
        </p>
        <p className="text-lg uppercase text-primary-700">
          {t("Supports")}: {imgTypes.concat(vidTypes).join(", ")}
        </p>
      </div>
    </div>
  );

  if (!user) return null;

  return (
    <Modal isOpen={!!value} onClose={hideNewPublish}>
      <ModalOverlay />
      <ModalContent className="min-w-[995px]">
        {mediaType === "photo"
          ? renderPhotoContent()
          : mediaType === "video" && media?.item(0)
            ? renderVideoContent()
            : renderDropZone()}
        {media && (
          <ModalFooter className="justify-between">
            <Button>{t("Cancel")}</Button>
            <Button>
              {mediaType === "video" && step === 0 ? t("Next") : t("Share")}
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

const PhotoPreview: React.FC<{
  media: FileList | undefined;
  imageIdx: number;
  setImageIdx: (idx: number) => void;
}> = ({ media, imageIdx, setImageIdx }) => (
  <div className="w-1/2 flex flex-col gap-4">
    <AspectRatio className="overflow-hidden" ratio={9 / 14}>
      <Slider
        gap={8}
        itemsCount={1}
        currentItemIdx={imageIdx}
        onSliderChange={(v) => setImageIdx(v)}
      >
        {media &&
          Array.from(media).map((v) => (
            <div
              className="relative w-full h-full"
              key={URL.createObjectURL(v)}
            >
              <Image
                className="w-full h-full object-cover"
                src={URL.createObjectURL(v)}
              />
              <div className="pointer-events-none hover:pointer-events-auto h-full w-full flex justify-center items-center absolute top-0 left-0 opacity-0 hover:opacity-100 bg-black bg-opacity-30">
                <HStack>
                  <Button colorScheme="danger" center className="p-2">
                    <TrashIcon />
                  </Button>
                </HStack>
              </div>
            </div>
          ))}
      </Slider>
    </AspectRatio>
    <div className="flex gap-4 justify-center w-full">
      {media &&
        mapArray(Array.from(media), (v, i) => (
          <Radio
            key={i}
            className="cursor-pointer scale-125"
            checked={imageIdx === i}
            onChange={(v) => (v.target.checked ? setImageIdx(i) : null)}
          />
        ))}
    </div>
  </div>
);

const PostDetailsForm: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="h-full justify-center items-center w-full justify-self-center flex gap-6">
      <div className="w-full flex flex-col gap-2">
        <FormField
          label={t("Legend")}
          component={<Textarea className="h-28" />}
        />
        <FormField
          label={t("Tag")}
          component={
            <InputGroup>
              <Input />
              <InputRightElement className="px-4">
                <HashtagIcon />
              </InputRightElement>
            </InputGroup>
          }
        />
        <FormField
          label={t("User")}
          component={
            <InputGroup>
              <Input />
              <InputRightElement className="px-4">
                <FiAtSign />
              </InputRightElement>
            </InputGroup>
          }
        />
        <FormField
          label={t("Place")}
          component={
            <InputGroup>
              <Input />
              <InputRightElement className="px-4">
                <GrLocationPin />
              </InputRightElement>
            </InputGroup>
          }
        />
        <FormField
          label={t("Link")}
          component={
            <Input placeholder={t("You can add a wiaah product link only")} />
          }
        />
      </div>
    </div>
  );
};

const FormField: React.FC<{ label: string; component: React.ReactNode }> = ({
  label,
  component,
}) => (
  <div className="flex flex-col gap-1">
    <p>{label}</p>
    {component}
  </div>
);

const VideoEditorStep: React.FC<{
  media: FileList | undefined;
  setActionVidBlob: (blob: Blob) => void;
  handleChange: (key: string, value: string) => void;
  setStep: (step: number) => void;
}> = ({ media, setActionVidBlob, handleChange, setStep }) => (
  <div className="mx-auto w-[20.5rem]">
    <VideoEditor
      video={media?.item(0)!}
      maxDuration={180}
      onFinish={(data) => {
        if (data.size > MAX_ACTION_SIZE) return;
        setActionVidBlob(data);
        handleChange("srcUploadId", URL.createObjectURL(data));
        setStep(1);
      }}
    />
  </div>
);

const VideoDetailsStep: React.FC<{
  form: any;
  coversRef: React.MutableRefObject<Record<number, HTMLVideoElement>>;
  setCoversRef: (idx: number, node: HTMLVideoElement) => void;
}> = ({ form, coversRef, setCoversRef }) => {
  const { t } = useTranslation();
  return (
    <div className="flex w-full flex-col px-2 h-[calc(100%-6rem)] overflow-y-scroll thinScroll gap-4">
      <div className="w-96 mx-auto">
        <PostDetailsForm />
        <p>{t("Allow user to")}:</p>
        <Checkbox>{t("Duet")}</Checkbox>
        <Checkbox>{t("Stitch")}</Checkbox>
        <Checkbox>{t("Comment")}</Checkbox>
        <FormField
          label={t("Cover")}
          component={
            form.srcUploadId && form.srcUploadId.length > 0 ? (
              <VideoFlattenFrames
                videoEverySec={1}
                onFrameSelected={(v, idx) => {
                  const ref = coversRef.current[idx];
                  const ref1 = idx === 0 ? null : coversRef.current[idx - 1];
                  const ref2 = coversRef.current[idx + 1];
                  if (ref1) ref1.pause();
                  if (ref2) ref2.pause();
                  if (ref) ref.play();
                }}
                renderItem={(blob, idx) => (
                  <div className="relative" key={idx}>
                    {idx === 0 && (
                      <div className="absolute top-0 left-0 border-4 border-primary w-full h-full"></div>
                    )}
                    <video
                      muted
                      loop
                      data-idx={idx}
                      ref={(node) => {
                        if (node) {
                          setCoversRef(idx, node);
                          if (idx === 0) node.play();
                        }
                      }}
                      src={URL.createObjectURL(blob)}
                    />
                  </div>
                )}
                videoSrc={form.srcUploadId}
              />
            ) : null
          }
        />
      </div>
    </div>
  );
};

export default AddNewPostModal;
