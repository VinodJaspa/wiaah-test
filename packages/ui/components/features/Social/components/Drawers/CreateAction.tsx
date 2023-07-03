import { HtmlDivProps } from "@UI/../types/src";
import {
  PassPropsToFnOrElem,
  getRandomName,
  mapArray,
  useForm,
} from "@UI/../utils/src";
import { CameraSwitchOutlineIcon } from "@UI/components/partials/icons/CameraSwitchIcon";
import { useSocialControls } from "@blocks";
import { useResponsive } from "hooks";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Avatar,
  Button,
  CheckmarkCircleWhiteFillIcon,
  CheckmarkIcon,
  CloseIcon,
  Drawer,
  DrawerContent,
  HStack,
  Image,
  ImageUploadIcon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  LinkIcon,
  Modal,
  ModalContent,
  ModalOverlay,
  MusicNoteFillIcon,
  SaveFlagOutlineIcon,
  SearchIcon,
  SettingsOutlineIcon,
  StarsIcon,
  TimerOutlineIcon,
  VideoCameraUplaodOutlineIcon,
} from "@partials";
import { useOutsideClick } from "@src/index";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { getRandomImage } from "@UI/placeholder";
import { atom, useRecoilState } from "recoil";
import { ChooseActionRemix, ChooseRemixPlacement } from "./CreateActionRemix";
import { useCreateActionMutation } from "@features/Social/services";

const gradients: { from: string; to: string }[] = [
  {
    from: "#4E59D0",
    to: "#4EB1D0",
  },
  {
    from: "#FFCA00",
    to: "#4EB1D0",
  },

  {
    from: "#4EB1D0",
    to: "#4EB1D0",
  },
  {
    from: "#5EFF00",
    to: "#4EB1D0",
  },
  {
    from: "#33D4B6",
    to: "#4EB1D0",
  },
  {
    from: "#CF20EC",
    to: "#4EB1D0",
  },
  {
    from: "#1C00C7",
    to: "#4EB1D0",
  },
];

const fonts: { label: string; font: string }[] = [
  {
    label: "Classic",
    font: "SF Pro Display",
  },
  {
    label: "Sevillana",
    font: "Sevillana",
  },

  {
    label: "Scada",
    font: "Scada",
  },
  {
    label: "Ubuntu",
    font: "Ubuntu",
  },
  {
    label: "Rufina",
    font: "Rufina",
  },
  {
    label: "SimSun",
    font: "SimSun",
  },
];

const StorySettingsAtom = atom<{
  mediaType: "video" | "image" | "text";
  counting: boolean;
  duration: number;
  countDown: number;
  speed: number;
  selectEffect: boolean;
  cameraType: "front" | "back";
  textBgGradient?: {
    from: string;
    to: string;
  };
  fontSize: number;
  textContent: string;
}>({
  default: {
    mediaType: "video",
    speed: 1,
    duration: 30,
    counting: false,
    countDown: 0,
    cameraType: "back",
    textBgGradient: gradients[0],
    selectEffect: false,
    fontSize: 1,
    textContent: "",
  },
  key: "CreateStorySettings",
});

export const CreateActionDrawer: React.FC = () => {
  const { isPortable } = useResponsive();
  const { value, cancelCreateAction, createAction } =
    useSocialControls("createAction");
  const audioId = typeof value === "object" ? value.audioId : undefined;
  const remixId = typeof value === "object" ? value.remixId : undefined;
  const [placement, setPlacement] = useState<ChooseRemixPlacement>();

  const countingRef = useRef<{
    startCountDown: () => any;
  }>(null);

  const {} = useForm<Parameters<typeof mutate>[0]>({
    allowedActions: [],
    coverUploadId: "",
    srcUploadId: "",
  });

  const { mutate } = useCreateActionMutation();

  const content = (
    <>
      <div className="w-full h-full relative">
        <div></div>
        <StoryMediaCapture />
        <div className="absolute top-8 left-0 w-full">
          <StoryUpperControls onClose={cancelCreateAction} />
        </div>
        <StoryBottomControls />
        <CameraActionSettings />
        <VideoEffectList />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <CameraCountDown ref={countingRef} onFinish={() => {}} />
        </div>
      </div>
      <ChooseActionRemix
        onCancel={() => createAction({ ...value, remixId: undefined })}
        onSelect={() => {}}
        actionId={remixId}
      />
    </>
  );

  return isPortable ? (
    <Drawer
      position="bottom"
      full
      isOpen={!!value}
      onClose={() => cancelCreateAction()}
    >
      <DrawerContent className="noScroll">{content}</DrawerContent>
    </Drawer>
  ) : (
    <Modal isOpen={!!value} onClose={() => cancelCreateAction()}>
      <ModalOverlay />
      <ModalContent className="h-full">{content}</ModalContent>
    </Modal>
  );
};

export const StoryBottomControls: React.FC = () => {
  const [settings, setSettings] = useRecoilState(StorySettingsAtom);

  const { t } = useTranslation();

  const tabs: { key: typeof settings.mediaType; label: string }[] = [
    {
      label: t("Video"),
      key: "video",
    },
    {
      label: t("Photo"),
      key: "image",
    },
    {
      label: t("Text"),
      key: "text",
    },
  ];

  const showOn = (tabs: typeof settings.mediaType[]) =>
    tabs.map((v) => v).includes(settings.mediaType);

  return (
    <div className="absolute bottom-0 left-0  w-full pt-4 bg-black bg-opacity-30 ">
      {showOn(["video", "video"]) ? (
        <div className="text-white w-[min(100%,17.25rem)] mx-auto flex justify-between items-center p-4">
          {showOn(["image"]) ? (
            <ActionIcon>
              <ImageUploadIcon className="text-[1.75rem]" />
            </ActionIcon>
          ) : (
            <ActionIcon>
              <VideoCameraUplaodOutlineIcon className="text-[1.75rem]" />
            </ActionIcon>
          )}

          <button>
            <div className="w-16 h-16 flex justify-center items-center border-4 rounded-full border-white">
              <div
                className={`w-11 h-11 ${
                  showOn(["video"]) ? "bg-red-500" : "bg-white"
                } rounded-full`}
              ></div>
            </div>
          </button>

          <Image
            src={""}
            className="w-10 h-10 rounded-full border border-white"
          />
        </div>
      ) : null}

      {showOn(["text"]) ? (
        <HStack className="gap-4 overflow-x-scroll noScroll m-4">
          {mapArray(gradients, (v, i) => (
            <div
              onClick={() =>
                setSettings((old) => ({
                  ...old,
                  textBgGradient: { from: v.from, to: v.to },
                }))
              }
              style={{
                background: `linear-gradient(180deg, ${v.from} 0%, ${v.to} 100%)`,
              }}
              className="cursor-pointer min-w-[2.25rem] h-9 rounded border-2 border-white relative isolate"
            >
              {settings.textBgGradient?.from === v.from &&
              settings.textBgGradient.to === v.to ? (
                <CheckmarkIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" />
              ) : null}
            </div>
          ))}
        </HStack>
      ) : null}

      <HStack className="mx-auto w-fit gap-5 pb-4">
        {mapArray(tabs, (v, i) => (
          <p
            onClick={() => {
              setSettings((old) => ({ ...old, mediaType: v.key }));
            }}
            key={i}
            className={`${
              settings.mediaType === v.key
                ? "border-b-primary"
                : "border-b-transparent"
            } pb-1 border-b text-white`}
          >
            {v.label}
          </p>
        ))}
      </HStack>
    </div>
  );
};

const ActionIcon: React.FC<HtmlDivProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={`${
        className || ""
      } bg-white bg-opacity-20 w-10 h-10 flex justify-center items-center rounded-full`}
    >
      {children}
    </div>
  );
};

const CameraActionSettings: React.FC<{}> = () => {
  const [settings, setSettings] = useRecoilState(StorySettingsAtom);
  const { t } = useTranslation();
  const [active, setActive] = React.useState<number>();
  const [open, setOpen] = React.useState<Boolean>(false);

  const Durations: {
    duration: number;
    label: string;
  }[] = [
    {
      duration: 30,
      label: "30s",
    },
    {
      duration: 60,
      label: "1m",
    },
    {
      duration: 90,
      label: "1.5m",
    },
    {
      duration: 120,
      label: "2m",
    },
    {
      duration: 180,
      label: "3m",
    },
  ];

  const showOn = (types: typeof settings["mediaType"][]) =>
    types.includes(settings.mediaType);

  return (
    <>
      <div className="absolute bg-black bg-opacity-20 p-2 rounded-full right-0 bottom-1/4 ">
        <div className="flex text-white flex-col gap-4">
          {showOn(["image", "video"]) ? (
            <>
              <CameraActionListMenu
                onOpen={() => setActive(0)}
                onClose={() => setActive(undefined)}
                btn={
                  <ActionIcon>
                    <MusicNoteFillIcon className="text-[1.75rem]" />
                  </ActionIcon>
                }
              ></CameraActionListMenu>

              <CameraActionListMenu
                onOpen={() => setActive(1)}
                onClose={() => setActive(undefined)}
                btn={
                  <ActionIcon>
                    <StarsIcon className="text-[1.75rem]" />
                  </ActionIcon>
                }
              ></CameraActionListMenu>

              <CameraActionListMenu
                onOpen={() => setActive(2)}
                onClose={() => setActive(undefined)}
                btn={
                  <ActionIcon>
                    <div className="w-7 h-7 border-2 border-white rounded-full flex justify-center items-center">
                      <p className="font-semibold text-[0.65rem]">
                        {
                          Durations.find(
                            (v) => v.duration === settings.duration
                          )?.label
                        }
                      </p>
                    </div>
                  </ActionIcon>
                }
              >
                <HStack className="gap-4 bg-white bg-opacity-80 rounded-full p-2">
                  {mapArray(Durations.reverse(), ({ duration, label }) => (
                    <p
                      className={`${
                        duration === settings.duration
                          ? "bg-primary text-white"
                          : "text-black"
                      } w-10 h-10 text-sm cursor-pointer font-medium flex justify-center items-center rounded-full`}
                      onClick={() =>
                        setSettings((v) => ({ ...v, duration: duration }))
                      }
                    >
                      {label}
                    </p>
                  ))}
                </HStack>
              </CameraActionListMenu>

              <CameraActionListMenu
                onOpen={() => setActive(3)}
                onClose={() => setActive(undefined)}
                btn={
                  <ActionIcon>
                    <TimerOutlineIcon className="text-[1.75rem]" />
                  </ActionIcon>
                }
              >
                <HStack className="bg-white bg-opacity-80 p-4 gap-3 rounded-xl">
                  <div className="flex flex-col gap-5 items-center">
                    <ArrowUpIcon
                      className="text-primary text-2xl"
                      onClick={() =>
                        setSettings((v) => ({
                          ...v,
                          countDown: v.countDown + 1,
                        }))
                      }
                    ></ArrowUpIcon>
                    <p className="text-black font-semibold text-lg">
                      {settings?.countDown}
                    </p>
                    <ArrowDownIcon
                      className="text-primary text-2xl"
                      onClick={() =>
                        setSettings((v) => ({
                          ...v,
                          countDown: Math.max(v.countDown - 1, 0),
                        }))
                      }
                    ></ArrowDownIcon>
                  </div>
                  <p className="text-black text-sm">{t("Seconds")}</p>
                  <Button className="whitespace-nowrap">
                    {t("Start now")}
                  </Button>
                </HStack>
              </CameraActionListMenu>

              {showOn(["video"]) ? (
                <CameraActionListMenu
                  btn={
                    <ActionIcon>
                      <div className="w-7 h-7 flex justify-center items-center rounded-full border-2 border-white">
                        <p className="text-white font-medium text-xs">{`${settings.speed}X`}</p>
                      </div>
                    </ActionIcon>
                  }
                >
                  <HStack className="gap-4 bg-white bg-opacity-80 p-2 rounded-full">
                    {mapArray([0.5, 1, 1.5, 2], (v, i) => (
                      <p
                        onClick={() =>
                          setSettings((old) => ({
                            ...old,
                            speed: v,
                          }))
                        }
                        className={`${
                          settings.speed === v
                            ? "bg-primary text-white"
                            : "text-black"
                        } w-10 h-10 rounded-full flex justify-center items-center cursor-pointer text-xs`}
                        key={i}
                      >
                        {v}X
                      </p>
                    ))}
                  </HStack>
                </CameraActionListMenu>
              ) : null}

              <CameraActionListMenu
                btn={
                  <ActionIcon>
                    <LinkIcon className="text-[1.75rem]" />
                  </ActionIcon>
                }
              >
                <HStack className="bg-white bg-opacity-80 rounded-full py-1 px-2">
                  <div className="flex items-center">
                    <LinkIcon className="text-blue-500 text-[1.75rem]"></LinkIcon>
                    <Input
                      className="w-40 bg-transparent border-transparent border-0 ring-transparent text-black stroke-transparent"
                      placeholder={t("Paste or type link") + "...."}
                    />
                  </div>
                  <HStack className="gap-4">
                    <CheckmarkCircleWhiteFillIcon className="text-primary text-[1.75rem]" />
                    <div className="w-7 h-7 bg-white rounded-full">
                      <CloseIcon className="text-[1.75rem] text-secondaryRed" />
                    </div>
                  </HStack>
                </HStack>
              </CameraActionListMenu>

              <ActionIcon onClick={() => setOpen((v) => !!v)}>
                {open ? (
                  <ArrowUpIcon className="text-[1.75rem]" />
                ) : (
                  <ArrowDownIcon className="text-[1.75rem]" />
                )}
              </ActionIcon>
            </>
          ) : null}

          {showOn(["text"]) ? (
            <>
              <ActionIcon>
                <></>
              </ActionIcon>
            </>
          ) : null}
        </div>
      </div>
      {showOn(["text"]) ? (
        <div className="absolute w-8 left-4 top-1/2">
          <div className="relative">
            <input
              type="range"
              min={1}
              max={5}
              step={0.25}
              value={settings.fontSize}
              onChange={(v) =>
                setSettings((old) => ({
                  ...old,
                  fontSize: parseInt(v.target.value),
                }))
              }
              className="noInputTrack -rotate-90 transform-cpu origin-left"
            />

            <svg
              className="absolute top-0 left-0 pointer-events-none -translate-x-1/2 -translate-y-[85%]"
              width="22"
              height="142"
              viewBox="0 0 22 142"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M22 11.0011C22 11.0007 22 11.0004 22 11L22.0001 10.9998H22C21.9999 4.92476 17.0751 0 11 0C4.92487 0 0 4.92487 0 11C0 11.6359 0.0539532 12.2591 0.157531 12.8655L10.9998 141.37L21.8429 12.8629C21.9461 12.2577 21.9999 11.6357 22 11.0011Z"
                fill="white"
                fill-opacity="0.6"
              />
            </svg>
          </div>
        </div>
      ) : null}
    </>
  );
};

const CameraActionListMenu: React.FC<{
  btn: React.ReactElement;
  onClose?: () => any;
  onOpen?: () => any;
}> = ({ children, btn, onClose, onOpen }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState<Boolean>(false);

  useOutsideClick(ref, () => {
    setOpen(false);
  });

  React.useEffect(() => {
    if (open) {
      onOpen && onOpen();
    } else {
      onClose && onClose();
    }
  }, [open]);

  return (
    <div ref={ref} className={`relative`}>
      {PassPropsToFnOrElem(btn, {
        onClick: () => {
          setOpen((v) => !v);
        },
      })}

      <div
        className={`${
          open ? "right-[110%]" : "right-1/2 opacity-0"
        } transition-all origin-right absolute top-1/2 -translate-y-1/2`}
      >
        {children}
      </div>
    </div>
  );
};

const CameraCountDown = React.forwardRef(
  ({ onFinish }: { onFinish: () => any }, ref) => {
    const [settings, setSettings] = useRecoilState(StorySettingsAtom);
    const [seconds, setSeconds] = useState<number | null>(null);
    const countdownInternavel = useRef<NodeJS.Timer>();

    const counting = settings.counting;
    const setCounting = (counting: boolean) =>
      setSettings((settings) => ({ ...settings, counting }));

    React.useImperativeHandle(ref, () => ({
      startCountDown: () => {
        countdownInternavel.current = setInterval(() => {
          setSeconds((old) => {
            if (old === null) {
              setCounting(true);
              return settings.countDown;
            } else if (old <= 0) {
              setCounting(false);
              onFinish && onFinish();
              return null;
            } else {
              return old - 1;
            }
          });
        }, 1000);
      },
    }));

    return counting ? (
      <div className="relative rounded-full border-2 border-white bg-white bg-opacity-40 w-80 h-80 ">
        <div className="text-white text-9xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {seconds}
        </div>
      </div>
    ) : null;
  }
);

const VideoEffectList: React.FC = () => {
  const { t } = useTranslation();
  const [settings, setSettings] = useRecoilState(StorySettingsAtom);
  const [full, setFull] = React.useState<boolean>(true);
  const [filter, setFilter] = React.useState<string>();
  const [selectedEffect, setSelectedEffect] = React.useState<string>();

  const filters: {
    key: string;
    label: string;
  }[] = [
    {
      key: "for_you",
      label: t("For you"),
    },
    {
      key: "new",
      label: t("New"),
    },
    {
      key: "beauty",
      label: t("Beauty"),
    },
  ];

  const effects: {
    photo: string;
    name: string;
    id: string;
  }[] = [...Array(30)].map((_, i) => ({
    name: getRandomName().firstName,
    photo: getRandomImage(),
    id: i.toString(),
  }));

  return settings.selectEffect ? (
    <div className="absolute bottom-0 left-0 h-full flex w-full">
      <div
        className={`flex flex-col gap-2 w-full ${
          full ? "h-full" : "self-end"
        } bg-black bg-opacity-30`}
      >
        {full ? (
          <HStack className="p-4 backdrop-blur gap-4">
            <InputGroup className="bg-white rounded-full w-full">
              <InputLeftElement>
                <SearchIcon className="text-xl"></SearchIcon>
              </InputLeftElement>
              <Input placeholder={t("Type effect name...")} />
              <InputRightElement className="pr-2">
                <CloseIcon className="text-xl"></CloseIcon>
              </InputRightElement>
            </InputGroup>
            <p onClick={() => setFull(false)} className="text-white">
              {t("Cancel")}
            </p>
          </HStack>
        ) : (
          <>
            <HStack className="w-full pt-2 justify-between">
              <HStack className="justify-between w-full gap-4 px-4">
                <div className="w-8 h-8 bg-white rounded-full">
                  <CloseIcon className="text-[2rem] text-secondaryRed" />
                </div>
                <HStack className="gap-8">
                  <div className="w-8 h-8 flex justify-center items-center bg-white rounded-full">
                    <SaveFlagOutlineIcon className="text-4xl " />
                  </div>
                  <div className="w-8 h-8 flex justify-center items-center bg-white rounded-full">
                    <SearchIcon className="text-4xl" />
                  </div>
                </HStack>
                <div className="w-8 h-8 flex justify-center items-center bg-white rounded-full">
                  <CheckmarkIcon className="text-primary text-base" />
                </div>
              </HStack>
            </HStack>
            <HStack className="w-full justify-center gap-6 pb-4">
              {mapArray(filters, (v, i) => (
                <p
                  onClick={() => setFilter(v.key)}
                  className={`${
                    v.key === filter ? "border-b-primary" : "border-transparent"
                  } border-b-2 pb-2 text-white`}
                  key={i}
                >
                  {v.label}
                </p>
              ))}
            </HStack>
          </>
        )}
        <div
          className={`${
            full ? "full" : "h-56"
          } px-4 overflow-y-scroll noScroll grid grid-cols-4 gap-3`}
        >
          {mapArray(effects, (v, i) => (
            <div
              onClick={() => setSelectedEffect(v.id)}
              key={i}
              className={`${
                v.id === selectedEffect
                  ? "border-primary"
                  : "border-transparent"
              } border-2 flex flex-col gap-2 bg-black bg-opacity-50 w-full py-4 rounded-lg items-center`}
            >
              <Avatar className="min-w-[3.25rem]" src={v.photo} />
              <p className="text-white text-xs">{v.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : null;
};

const StoryMediaCapture: React.FC = () => {
  const { t } = useTranslation();
  const [settings, setSettings] = useRecoilState(StorySettingsAtom);
  const [supported, setSupported] = React.useState(false);
  const [streaming, setStreaming] = React.useState<boolean>(false);
  const [refresh, setRefresh] = React.useState<boolean>(false);
  const recorderRef = React.useRef<MediaRecorder | null>(null);
  const { isMobile } = useResponsive();

  const getCameraStream = () => {
    try {
      if (typeof window !== "undefined" && "MediaRecorder" in window) {
        setSupported(true);
        navigator.mediaDevices
          .getUserMedia({
            audio: true,
            video: {
              facingMode:
                isMobile || settings.cameraType === "back"
                  ? "environment"
                  : "user",
            },
          })
          .then((stream) => {
            setStreaming(true);

            const recorder = new MediaRecorder(stream, {
              mimeType: "video/mp4",
            });
            recorderRef.current = recorder;
          })
          .catch((e) => {
            console.log("error getting story media", e);
            setStreaming(false);
          });
      } else {
        setStreaming(false);
      }
    } catch (error) {
      setSupported(false);
      setStreaming(false);
    }
  };

  React.useEffect(() => {
    if (settings.mediaType === "image" || settings.mediaType === "video") {
      getCameraStream();
    }
  }, [refresh, supported, streaming, settings]);

  switch (settings.mediaType) {
    case "video":
    case "image":
      return supported ? (
        <video
          className="w-full h-full object-cover"
          src={recorderRef.current?.stream as any}
        />
      ) : (
        <div className="bg-black w-full h-full flex justify-center items-center">
          <div>
            <p className="text-white text-2xl font-medium">
              {t("Cannot Access Camera")}
            </p>
            <p
              onClick={() => setRefresh((v) => !v)}
              className="cursor-pointer font-semibold text-primary"
            >
              {t("try again")}
            </p>
          </div>
        </div>
      );

    case "text":
      return (
        <div
          className="w-full h-full flex justify-center items-center px-8"
          style={{
            background: `linear-gradient(180deg, ${settings.textBgGradient?.from} 0%, ${settings.textBgGradient?.to} 100%)`,
          }}
        >
          <p
            onInput={(v: any) =>
              setSettings((old) => ({
                ...old,
                textContent: v.target.innerText,
              }))
            }
            style={{
              fontSize: `${settings.fontSize}rem`,
            }}
            className="text-white relative flex justify-center items-center w-full h-full focus-visible:ring-0 focus-visible:stroke-0 outline-none focus-visible:border-0 overflow-y-scroll noScroll"
            contentEditable
          >
            {settings.textContent}
          </p>
          <span
            style={{
              fontSize: `${settings.fontSize}rem`,
            }}
            className="text-white pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            {settings.textContent.length < 1 ? t("Tap here to type") : null}
          </span>
          {/* <Textarea
            style={{
              fontSize: `${settings.fontSize}rem`,
            }}
            placeholder={t("Tap here to type")}
            className="bg-transparent placeholder:text-white text-center h-full border-transparent ring-transparent text-black"
            onChange={(v) => setText(v.target.value)}
            value={text}
          /> */}
        </div>
      );
    default:
      return null;
  }
};

export const StoryUpperControls: React.FC<{ onClose: () => any }> = ({
  onClose,
}) => {
  const { t } = useTranslation();
  const [settings, setSettings] = useRecoilState(StorySettingsAtom);

  const showOn = (types: typeof settings.mediaType[]) =>
    types.includes(settings.mediaType);

  return (
    <HStack className="justify-between px-4 text-white">
      {showOn(["image", "video"]) ? (
        <ActionIcon onClick={onClose}>
          <CloseIcon className="text-[1.75rem]" />
        </ActionIcon>
      ) : null}

      {showOn(["text"]) ? (
        <CloseIcon onClick={onClose} className="text-[1.75rem]" />
      ) : null}

      {showOn(["image", "video"]) ? (
        <ActionIcon
          onClick={() =>
            setSettings((v) => ({
              ...v,
              cameraType: v.cameraType === "front" ? "back" : "front",
            }))
          }
        >
          <CameraSwitchOutlineIcon className="text-[1.75rem]" />
        </ActionIcon>
      ) : null}

      {showOn(["text"]) ? (
        <>
          <SettingsOutlineIcon className="text-[1.75rem]" />
          <p className="cursor-pointer font-medium">{t("Share")}</p>
        </>
      ) : null}
    </HStack>
  );
};
