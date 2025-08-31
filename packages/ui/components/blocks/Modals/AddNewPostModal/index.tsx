import React, { useEffect, useState } from "react";
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
  StepperFormController,
  StepperFormHandler,

} from "@UI";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useUserData } from "hooks";
import { mapArray, useForm } from "utils";
import { FiAtSign } from "react-icons/fi";
import { GrLocationPin } from "react-icons/gr";
import { ActionType, CommentsVisibility } from "@features/API";

import { NewPostSwitch, SettingsList, shareIcons, toggleOptions } from "./addNewPostModal";
import { Trash2 } from "lucide-react";

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
    if (media && media.length > 0) {
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
    }
  }, [media]);

  const cleanUpStates = () => {
    setMedia(undefined);
    setMediaType(undefined);
    setStep(0);
    setImageIdx(0);
    setActionVidBlob(undefined);
  };

  const renderPhotoContent = () => (
    <div className="p-6  flex flex-col items-center justify-center">
      <div className="w-full pb-4 flex text-2xl font-bold justify-center items-center border-b border-gray-200 ">
        {t("Create a post")}
      </div>
      <div className="">
        <PostDetailsForm media={media} setMedia={setMedia} />
      </div>
    </div>
  );

  const renderVideoContent: React.FC<{ onSubmit: (data: any) => void }> = ({
    onSubmit,
  }) => (
    <div className=" bg-white  gap-4 relative w-[380px] flex flex-col items-center justify-center">
      <div className="w-full h-full flex text-2xl font-bold justify-center">
        {step === 0 ? t("Video Editing") : t("Video Details")}
      </div>
      <div className="h-full w-full mx-auto">
        <StepperFormController
          lock={false}
          onFormComplete={(data) => {
            onSubmit(data);
          }}
          stepsNum={2}
        >
          {({ currentStepIdx, goToStep, nextStep }) => (
            <React.Fragment>
              <CheckMarkStepper
                className="h-full"
                onStepChange={goToStep}
                stepHeaderClassName="w-[300px] max-w-3xl mx-auto"

                currentStepIdx={currentStepIdx}
                steps={[
                  {
                    key: "editor",
                    stepName: t("Editor"),
                    stepComponent: (
                      <StepperFormHandler handlerKey="edite">
                        <VideoEditorStep
                          setMedia={setMedia}
                          media={media}
                          setActionVidBlob={setActionVidBlob}
                          handleChange={() => {
                            alert("okk")
                            nextStep();
                            handleChange("srcUploadId", URL.createObjectURL(actionVidBlob!))
                          }}

                        // handleChange={(key, value) =>

                        />
                      </StepperFormHandler>
                    ),
                  },
                  {
                    key: "details",
                    stepName: t("Details"),
                    stepComponent: (
                      <StepperFormHandler handlerKey="details">

                        <VideoDetailsStep
                          form={form}
                          coversRef={coversRef}
                          setCoversRef={setCoversRef}
                          setMedia={setMedia}

                        />
                      </StepperFormHandler>
                    ),
                  },
                ]}
              />
              {/* <ModalFooter className="justify-between absolute bottom-1 w-full ">
                <Button onClick={hideNewPublish}>{t("Cancel")}</Button>
                <Button onClick={() => nextStep()}>{t("Next")}</Button>
              </ModalFooter> */}
            </React.Fragment>
          )}
        </StepperFormController>
      </div>
    </div>
  );

  const renderDropZone = () => (
    <div
      onDragOver={(e) => {
        e.preventDefault();
      }}
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
        <p className="text-sm font-bold text-primary-800">
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
        <p className="text-sm uppercase text-primary-700">
          {t("Supports")}: {imgTypes.concat(vidTypes).join(", ")}
        </p>
      </div>
    </div>
  );

  if (!user) return null;

  return (
    <Modal isOpen={!!value} onClose={hideNewPublish}>
      <ModalOverlay />
      <ModalContent className="max-w-[960px]  overflow-y-auto h-[616px] p-4">
        {mediaType === "photo"
          ? renderPhotoContent()
          : mediaType === "video" && media?.item(0)
            ? renderVideoContent({ onSubmit: (data) => console.log(...data) })
            : renderDropZone()}

      </ModalContent>
    </Modal>
  );
};



const PostDetailsForm: React.FC<{ media?: FileList, setMedia }> = ({ media, setMedia }) => {
  const { t } = useTranslation();
  return (
    <div className="h-full justify-center items-center w-full justify-self-center">

      <Formik
        initialValues={{
          text: "",
          media: [] as File[],
          location: "",
          mentions: "",
          visibility: "Everyone",
          allowComments: false,
          allowDuet: false,
          allowStitch: false,
          allowHQ: false,
          shareTo: [] as string[],
          autoShare: [] as string[],
        }}
        validationSchema={Yup.object().shape({
          text: Yup.string().max(4000, "Max 4000 characters"),
        })}
        onSubmit={(values, { resetForm }) => {
          // onSubmit(values);
          resetForm();
          // onClose();
        }}
      >
        {({ setFieldValue, values }) => (
          <Form className="">
            <div className="space-y-2">
              {/* Media */}
              {media.length > 0 && (
                <div className="relative ">
                  {/* <button
                    type="button"
                    onClick={() => setMedia([])}
                    className="absolute top-2 right-2 z-10 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  >
                    <Trash2 size={16} />
                  </button> */}
                  {media[0].type.startsWith("image") ? (
                    <img
                      src={URL.createObjectURL(media[0])}
                      alt="preview"
                      className="w-full  object-contain rounded-xl"
                    />
                  ) : (
                    <video
                      src={URL.createObjectURL(media[0])}
                      controls
                      className="w-full aspect-video object-cover rounded-xl"
                    />
                  )}
                </div>
              )}

              {/* Text */}
              <div>
                <Field
                  as="textarea"
                  name="text"
                  placeholder="Share your thoughts within 4000 characters"
                  className="w-full border h-24 rounded-xl p-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <ErrorMessage name="text" component="p" className="text-red-500 text-xs mt-1" />
              </div>

              {/* Chips */}
              <div className="flex gap-2 flex-wrap text-xs">
                {["#Hashtags", "@Mention", "🎥 Video", "🎵 Audio"].map((chip) => (
                  <span key={chip} className="px-2 py-1 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200">
                    {chip}
                  </span>
                ))}
              </div>

              {/* Sharing Options */}
              <div>
                <p className="font-semibold text-sm mb-1">Sharing Options</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                  {Object.keys(shareIcons).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className={`px-2 py-1 rounded-lg border flex items-center justify-center gap-1 text-xs ${values.shareTo.includes(opt) ? "bg-black text-white" : "bg-white text-gray-700"
                        }`}
                      onClick={() =>
                        setFieldValue(
                          "shareTo",
                          values.shareTo.includes(opt) ? values.shareTo.filter((s) => s !== opt) : [...values.shareTo, opt]
                        )
                      }
                    >
                      {shareIcons[opt]}
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Post Settings */}
              <div className="space-y-2">
                <p className="text-sm mb-1">Post Settings</p>
                <SettingsList setFieldValue={setFieldValue} values={values} />

                {/* Toggles */}
                {Object.entries(toggleOptions).map(([key, { icon, label }]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between py-2 px-2 cursor-pointer hover:bg-gray-50 rounded-xl"
                  >
                    <div className="flex items-center gap-2 text-sm ">
                      <span className="p-2">{icon}</span>
                      <span>{label}</span>
                    </div>
                    <NewPostSwitch
                      checked={values[key as keyof typeof values] as boolean}
                      onChange={(val) => setFieldValue(key, val)}
                    />
                  </div>
                ))}

              </div>

              {/* Auto-Sharing */}
              <div>
                <p className="font-semibold text-sm mb-4">Auto-Sharing</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                  {Object.keys(shareIcons).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className={`px-2 py-1 rounded-lg border flex items-center justify-center gap-1 ${values.autoShare.includes(opt) ? "bg-black text-white" : "bg-white text-gray-700"
                        }`}
                      onClick={() =>
                        setFieldValue(
                          "autoShare",
                          values.autoShare.includes(opt) ? values.autoShare.filter((s) => s !== opt) : [...values.autoShare, opt]
                        )
                      }
                    >
                      {shareIcons[opt]}
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4">
              <button
                type="submit"
                className="w-full rounded-xl bg-black py-2 text-white font-semibold hover:bg-gray-800 text-sm"
              >
                Publish
              </button>
            </div>
          </Form>
        )}
      </Formik>
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
  setMedia: React.Dispatch<React.SetStateAction<FileList | undefined>>;
  setActionVidBlob: (blob: Blob) => void;
  handleChange: (key: string, value: any) => void;
}> = ({ media, setMedia, setActionVidBlob, handleChange }) => (
  <div className="w-full max-w-3xl mx-auto">
    <VideoEditor
      video={media?.item(0)!}
      maxDuration={180}
      onFinish={(data) => {
        if (data.size > MAX_ACTION_SIZE) return;
        setActionVidBlob(data);
        handleChange("srcUploadId", URL.createObjectURL(data));
      }}
    />
  </div>

);
const VideoDetailsStep: React.FC<{
  form: any;
  coversRef: React.MutableRefObject<Record<number, HTMLVideoElement>>;
  setCoversRef: (idx: number, node: HTMLVideoElement) => void;
  setMedia: React.Dispatch<React.SetStateAction<FileList | undefined>>;
}> = ({ form, coversRef, setCoversRef, setMedia }) => {

  const { t } = useTranslation();
  return (
    <div className="w-full flex-col px-2 h-[calc(100%-6rem)]">
      <div className="mx-auto">
        {/* <PostDetailsForm setMedia={setMedia} /> */}
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
                      playsInline
                      data-idx={idx}
                      className="w-full h-full object-cover rounded-lg"
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



