import { HtmlDivProps } from "@UI/../types/src";
import { PassPropsToFnOrElem, getRandomName, mapArray } from "@UI/../utils/src";
import { CameraSwitchOutlineIcon } from "@UI/components/partials/icons/CameraSwitchIcon";
import { useSocialControls } from "@blocks";
import { useSecondsCountdown } from "hooks";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Avatar,
  Button,
  CheckmarkCircleWhiteFillIcon,
  CheckmarkIcon,
  CloseIcon,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  HStack,
  Image,
  ImageUploadIcon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  LinkIcon,
  MusicNoteFillIcon,
  SaveFlagOutlineIcon,
  SearchIcon,
  StarsIcon,
  TimerOutlineIcon,
  VideoCameraUplaodOutlineIcon,
} from "@partials";
import { useOutsideClick } from "@src/index";
import React from "react";
import { useTranslation } from "react-i18next";
import { getRandomImage } from "@UI/placeholder";
import { atom, useRecoilState, useSetRecoilState } from "recoil";

const gradients: { from: string; to: string }[] = [];

const StorySettingsAtom = atom<{
  mediaType: "video" | "image" | "text";
  starting: boolean;
  duration: number;
  countDown: number;
  speed: number;
  cameraType: "front" | "back";
  textBgGradient?: {
    from: string;
    to: string;
  };
}>({
  default: {
    mediaType: "video",
    speed: 1,
    duration: 30,
    starting: false,
    countDown: 0,
    cameraType: "back",
    textBgGradient: gradients[0],
  },
  key: "CreateStorySettings",
});

export const CreateActionDrawer: React.FC = () => {
  const { value, cancelCreateAction } = useSocialControls("createAction");
  const setSettings = useSetRecoilState(StorySettingsAtom);
  const [tab, setTab] = React.useState<number>(0);
  const { t } = useTranslation();

  const tabs: { key: number; label: string }[] = [
    {
      label: t("Video"),
      key: 0,
    },
    {
      label: t("Photo"),
      key: 1,
    },
    {
      label: t("Text"),
      key: 2,
    },
  ];

  const showOn = (tabs: number[]) => tabs.includes(tab);

  return (
    <Drawer
      position="bottom"
      full
      isOpen={!!value}
      onClose={() => cancelCreateAction()}
    >
      <DrawerContent className="noScroll">
        <div className="w-full h-full relative">
          <StoryMediaCapture />
          <div className="absolute top-8 left-0 w-full">
            <HStack className="justify-between px-4 text-white">
              <DrawerCloseButton>
                <ActionIcon>
                  <CloseIcon className="text-[1.75rem]" />
                </ActionIcon>
              </DrawerCloseButton>

              <ActionIcon>
                <CameraSwitchOutlineIcon className="text-[1.75rem]" />
              </ActionIcon>
            </HStack>
          </div>
          <div className="absolute bottom-0 left-0  w-full pt-4 bg-black bg-opacity-30 ">
            {showOn([0, 1]) ? (
              <div className="text-white w-[min(100%,17.25rem)] mx-auto flex justify-between items-center p-4">
                {showOn([1]) ? (
                  <ActionIcon>
                    <ImageUploadIcon className="text-[1.75rem]" />
                  </ActionIcon>
                ) : (
                  <ActionIcon>
                    <VideoCameraUplaodOutlineIcon className="text-[1.75rem]" />
                  </ActionIcon>
                )}

                <div className="w-16 h-16 flex justify-center items-center border-4 rounded-full border-white">
                  <div
                    className={`w-11 h-11 ${
                      showOn([0]) ? "bg-red-500" : "bg-white"
                    } rounded-full`}
                  ></div>
                </div>

                <Image
                  src={
                    "https://s3-alpha-sig.figma.com/img/9ceb/196b/85f04912be00c8732cd6067602a84c78?Expires=1684108800&Signature=WKyllV~m9EkodeBRsvzf1AvtdyQ5We8SBZD-h~OwE1U3I77NeNRBjPWuUh562a9PXFUQ95-mb~Eqpw-bH2m8eJ4cx063GMx-~lhSiJm6FPrCW8Zbsl98OkbA5N~8iyff1oSApDLJi8xsck-BTxseN6m9do4-U0uH0F8O8Go6iUaWYH4zvWHJL4naN4yY9CclGr~sWtz1161Gn8lFk09Gp~MHgexg~kQUWa3sLVsofLifJRxjAqR2He2E8tQK1A36LUHjZqKqEKU6nqf1KHXKsL76SzJk00Ie3b~kTp6f4B2FgjHPnflgkPYpHVUE1ZFOT4ywM-Pl4oaNbfPuxJqXjw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                  }
                  className="w-10 h-10 rounded-full border border-white"
                />
              </div>
            ) : null}
            {showOn([2]) ? <HStack></HStack> : null}
            <HStack className="mx-auto w-fit gap-5 pb-4">
              {mapArray(tabs, (v, i) => (
                <p
                  onClick={() => setTab(v.key)}
                  key={i}
                  className={`${
                    tab === v.key ? "border-b-primary" : "border-b-transparent"
                  } pb-1 border-b text-white`}
                >
                  {v.label}
                </p>
              ))}
            </HStack>
          </div>

          <div className="absolute right-4 bottom-1/4 ">
            <CameraActionSettings />
          </div>
          <div className="absolute bottom-0 left-0 h-full flex w-full">
            <VideoEffectList />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <CameraCountDown count={150} onFinish={() => {}} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
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
    <div className="flex text-white flex-col gap-4">
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
                {Durations.find((v) => v.duration === settings.duration)?.label}
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
              onClick={() => setSettings((v) => ({ ...v, duration: duration }))}
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
                setSettings((v) => ({ ...v, countDown: v.countDown + 1 }))
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
          <Button className="whitespace-nowrap">{t("Start now")}</Button>
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
                  settings.speed === v ? "bg-primary text-white" : "text-black"
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
    </div>
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
  ({ count = 0, onFinish }: { count: number; onFinish: () => any }, ref) => {
    const [settings, setSettings] = useRecoilState(StorySettingsAtom);
    const dateRef = React.useRef(
      new Date(new Date().setSeconds(new Date().getSeconds() + count))
    );
    const seconds = useSecondsCountdown(dateRef.current, (v) => {
      if (v > 0) {
        return true;
      } else {
        onFinish && onFinish();
        return false;
      }
    });

    return (
      <div className="relative rounded-full border-2 border-white bg-white bg-opacity-40 w-80 h-80 ">
        <div className="text-white text-9xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {seconds}
        </div>
      </div>
    );
  }
);

const VideoEffectList: React.FC = () => {
  const { t } = useTranslation();
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

  return (
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
              v.id === selectedEffect ? "border-primary" : "border-transparent"
            } border-2 flex flex-col gap-2 bg-black bg-opacity-50 w-full py-4 rounded-lg items-center`}
          >
            <Avatar className="min-w-[3.25rem]" src={v.photo} />
            <p className="text-white text-xs">{v.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const StoryMediaCapture: React.FC = () => {
  const { t } = useTranslation();
  const [settings, setSettings] = useRecoilState(StorySettingsAtom);
  const [supported, setSupported] = React.useState(false);
  const [streaming, setStreaming] = React.useState<boolean>(false);
  const [refresh, setRefresh] = React.useState<boolean>(false);
  const recorderRef = React.useRef<MediaRecorder | null>(null);

  const getCameraStream = () => {
    try {
      if (typeof window !== "undefined" && "MediaRecorder" in window) {
        setSupported(true);
        if (streaming) return;
        navigator.mediaDevices
          .getUserMedia({ audio: true, video: true })
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
        <div className="w-full h-full flex justify-center items-center">
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
      return <></>;
    default:
      return null;
  }
};
