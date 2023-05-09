import { randomNum } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";
import { useSocialControls } from "@blocks";
import {
  AspectRatio,
  Avatar,
  Button,
  CloseIcon,
  Drawer,
  DrawerContent,
  HStack,
  Image,
  MediaPauseIcon,
  PlayFillIcon,
  Stepper,
  StepperContent,
} from "@partials";
import { t } from "i18next";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { random } from "lodash";

const music: {
  thumbnail: string;
  name: string;
  src: string;
  artist: { name: string; thumbnail: string };
} = {
  name: "Transilvanian Hunger",
  artist: {
    name: "Darkthrone",
    thumbnail:
      "https://s3-alpha-sig.figma.com/img/ce29/a4c7/a0224ec001bae4747996664d3bca4fc1?Expires=1684108800&Signature=GCIGcPM23tndSz1HrXp8IlGzWxtJ-UV7vq0HsK-bLfrXrnkDPLE~SCMUqV1VXu7R2irN2tjNT6D8MiBoHUEDMLBCvEOe-MZiKcN-rFOayDqcmWpjtL61vFLOMVxFJmhf2gpq4XdXXlNfOrnVY3wmwuxdq8fQnwpJVGN4yMqqVWNTRTNEP2qD7LYJ5oi1Up6vdjo~enwbm1goG1-gX-v09Ljbe8S9vluQ2KwpT-AAOKxOsJNrz3YxeqB3jc~b9hAK~dI4ykfMWVW9NDbULDzjDYdclS1ebXIdmxiYcb5m42PkdZMlZQkptu-Trzap8riCz3s58P5N8cWY~arJaF4OyA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  thumbnail:
    "https://s3-alpha-sig.figma.com/img/46bd/9ab7/39eb1412aa53c4fec6b04e42019a12fb?Expires=1684108800&Signature=dkAYj86pt1OKy~12w0jCGIFhmIULO~vJWBE3VwHvD-Mcl4Js0mLTuYzUoPRqsfEw75DYq-STzOwG9JcWQ4Wr2OmLtz2LfQZaAwID8ZoI4IsjMH7kkRh8NxL2p89K8Hos6Ytd3fNcV4SRrlISPjKgbwg7AO7pegRtpnfVPwGlS0bKw6ez9IYtD3hgKIISidYgwmO96Qp-7XyK7PcactebKWrbvmmL2MOYN-Ma3djMX31410qiO9jXw3gsdUv-Ed3ERLd4j88T7Ca0XvnfoklyjlQ43lI0Ubo3YOpVfP2aIMYqgtLCkC4EJ~CHs1waC8fVX680hwfulVTdacohLref2A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  src: "",
};

export const EditMusicDrawer = () => {
  const { value, cancelEditMusic } = useSocialControls();
  const isOpen = typeof value === "string";

  return (
    <Drawer
      onClose={() => cancelEditMusic()}
      isOpen={isOpen}
      full
      position="bottom"
    >
      <DrawerContent className="flex flex-col bg-[#000]">
        <Stepper controls={{ value: 1, onChange(idx) {} }}>
          {({ nextStep, currentStepIdx }) => (
            <div className="w-full h-full relative">
              <HStack className="justify-between absolute top-0 left-0 text-white p-4 w-full">
                <CloseIcon className="text-3xl"></CloseIcon>
                <p className="text-lg font-medium">{currentStepIdx}/2</p>

                <p className="font-medium text-[1.063rem]">{t("Next")}</p>
              </HStack>
              <StepperContent>
                <AudioEditor />
                <ActionVideoEditor src={"/video.mp4"} />
              </StepperContent>
            </div>
          )}
        </Stepper>
      </DrawerContent>
    </Drawer>
  );
};

const ActionVideoEditor: React.FC<{
  src: string;
}> = ({ src }) => {
  const [time, setTime] = React.useState<number>(0);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  return (
    <div className="w-full h-full flex flex-col noScroll">
      <Image className="w-full h-full object-cover" src={getRandomImage()} />
      <div className="relative py-2 px-4">
        <div className="bg-primary rounded h-12 py-1 flex overflow-hidden relative justify-between">
          <div className="border-8 border-y-[12px] absolute left-0 top-0 border-primary h-full bg-black">
            |
          </div>

          {[...Array(12)].map(() => (
            <Image
              src={getRandomImage()}
              className="w-full h-full object-cover"
            />
          ))}

          <div className="border-8 border-y-[12px] absolute right-0 top-0 border-primary h-full bg-black">
            |
          </div>
        </div>

        <div className="absolute left-1/2 flex top-1/2 -translate-y-1/2 w-1 bg-white h-16">
          <div className="-translate-y-full -translate-x-1/2 self-center pb-2">
            <p className="px-2 py-1 text-white text-xs rounded-xl font-medium bg-black bg-opacity-60">
              00:45
            </p>
          </div>
        </div>
      </div>

      <div className="w-full  text-white flex justify-center gap-2 text-sm font-medium">
        <p>{t("Min")} 00:03</p> / <p>03:00 {t("Max")}</p>
      </div>
    </div>
  );
};

const AudioEditor = () => {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const { t } = useTranslation();
  const [progress, setProgress] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onprogress = () => {
        const time = audioRef.current?.currentTime || 0;
        const dur = audioRef.current?.duration || 0;
        setProgress(time / dur);
      };
      audioRef.current.onpause = () => {
        setPlaying(false);
      };
      audioRef.current.onplay = () => {
        setPlaying(true);
      };

      audioRef.current.onloadedmetadata = () => {
        const dur = audioRef.current?.duration || 0;

        setDuration(dur);
      };
    }
  }, [audioRef]);

  return (
    <div
      style={{
        width: `min(100%, 15.125rem)`,
      }}
      className="mx-auto"
    >
      <div className="mb-6">
        <AspectRatio ratio={1.62}>
          <Image src={music.thumbnail} className="w-full h-full object-cover" />
        </AspectRatio>
      </div>
      <div className="flex flex-col gap-3 justify-center items-center mb-4">
        <Avatar className="w-[2.625rem]" src={music.artist.thumbnail} />
        <div className="flex flex-col gap-1">
          <p className="text-[1.063rem] font-semibold">{music.name}</p>
          <p className="text-sm font-medium text-center">{music.artist.name}</p>
        </div>
      </div>
      <HStack className="gap-1 mb-6">
        <div
          onClick={() => (playing ? pause() : play())}
          className="rounded-full flex items-center justify-center text-[0.625rem] w-7 h-7 bg-black bg-opacity-10 hover:bg-opacity-100 focus:bg-opacity-100"
        >
          {playing ? <MediaPauseIcon /> : <PlayFillIcon></PlayFillIcon>}
        </div>
        <input
          type="range"
          min={0}
          max={duration}
          className="w-full audioRangeInput"
        />
        <p className="text-sm font-medium">
          {Intl.NumberFormat("en-us", { minimumIntegerDigits: 2 }).format(
            Math.floor(duration / 60)
          )}
          :
          {Intl.NumberFormat("en-us", { minimumIntegerDigits: 2 }).format(
            duration % 60
          )}
        </p>
      </HStack>
      <AudioController src={music.src} />
    </div>
  );
};

const AudioController: React.FC<{
  src: string;
}> = () => {
  const [dragging, setDragging] = React.useState<0 | 1>();

  return (
    <div className="w-full relative h-12 border-2 flex items-center px-2 rounded-lg border-primary">
      <span className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-0 h-8 border-4 border-primary z-10 bg-white rounded w-1"></span>
      <span className="absolute top-1/2 -translate-y-1/2 translate-x-1/2 right-0 h-8 border-4 border-primary z-10 bg-white rounded w-1"></span>
      <div className="absolute flex items-center gap-1">
        {[...Array(50)].map((v, i) => (
          <div
            key={i}
            style={{ height: `${random(2, 16)}px` }}
            className={`w-[2px] rounded-lg bg-black`}
          />
        ))}
      </div>
    </div>
  );
};
