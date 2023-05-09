import { NumberShortner } from "@UI/components/helpers";
import { getRandomImage } from "@UI/placeholder";
import { useSocialControls } from "@blocks";
import {
  ArrowLeftAlt1Icon,
  AspectRatio,
  Avatar,
  Button,
  Drawer,
  DrawerContent,
  HStack,
  Image,
  MediaPauseIcon,
  PaperPlaneAngleOutlineIcon,
  PlayFillIcon,
  SaveFlagOutlineIcon,
  VerifiedIcon,
  VerticalDotsIcon,
} from "@partials";
import React from "react";
import { useTranslation } from "react-i18next";

export const SocialMusicDrawer: React.FC = () => {
  const { t } = useTranslation();
  const { value, closeMusicDetails } = useSocialControls("showMusicId");
  const isOpen = typeof value === "string";

  return (
    <Drawer
      isLazy
      full
      position="bottom"
      isOpen={isOpen}
      onClose={closeMusicDetails}
    >
      <DrawerContent>
        <div className="flex flex-col h-full gap-4">
          <HStack className="px-4 pt-8 justify-between">
            <ArrowLeftAlt1Icon onClick={() => {}} className="cursor-pointer" />
            <VerticalDotsIcon onClick={() => {}} className="cursor-pointer" />
          </HStack>
          <HStack className="gap-3 px-4">
            <Image
              className="h-20 w-28 object-cover rounded-xl"
              src={getRandomImage()}
            />
            <div className="flex flex-col gap-3">
              <p className="text-lg font-semibold">Leave The Door Open</p>
              <HStack>
                <Avatar src={getRandomImage()} className="min-w-[1.5rem]" />
                <HStack className="gap-1">
                  <p className="font-medium">Wiaah</p>
                  <VerifiedIcon className="text-secondaryBlue text-xs" />
                </HStack>
              </HStack>
            </div>
          </HStack>
          <div className="mb-2 px-4">
            <MusicController src="" />
          </div>
          <HStack className="gap-6 mb-2 px-4">
            <Button
              className="w-full"
              colorScheme="darkbrown"
              onClick={() => {}}
            >
              {t("Use audio")}
            </Button>
            <SaveFlagOutlineIcon
              onClick={() => {}}
              className="cursor-pointer min-w-[1.5rem] min-h-[1.5rem] "
            />
            <PaperPlaneAngleOutlineIcon
              onClick={() => {}}
              className="cursor-pointer min-w-[1.5rem] min-h-[1.5rem]"
            />
          </HStack>
          <p className="text-lg font-semibold px-4">
            {NumberShortner(140000)} {t("actions")}
          </p>
          <div className="grid grid-cols-3 max-h-full overflow-y-scroll thinScroll gap-[1px]">
            {[...Array(20)].map((v) => (
              <AspectRatio ratio={1.53}>
                <Image
                  src={getRandomImage()}
                  className="w-full h-full object-cover"
                />
                <HStack className="text-white absolute bottom-1 left-2">
                  <PlayFillIcon className="text-xs" />
                  <p className="text-[0.5rem]">{NumberShortner(127500)}</p>
                </HStack>
              </AspectRatio>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

const MusicController: React.FC<{ src: string }> = ({ src }) => {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const { t } = useTranslation();
  const [progress, setProgress] = React.useState<number>(0);
  const [playing, setPlaying] = React.useState<boolean>(false);
  const [duration, setDuration] = React.useState<number>(100);

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

  const goTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  return (
    <>
      <audio className="fixed opacity-0 hidden" src={src} ref={audioRef} />
      <HStack className="">
        {playing ? (
          <MediaPauseIcon onClick={pause} />
        ) : (
          <PlayFillIcon onClick={play} />
        )}
        <input
          className="audioRangeInput w-full"
          min={0}
          max={duration}
          value={progress}
          onChange={(v) => {
            goTo(parseInt(v.target.value));
          }}
        />
        <p className="text-xs font-medium">
          {Intl.NumberFormat("en-us", { minimumIntegerDigits: 2 }).format(
            Math.floor(duration / 60)
          )}
          :
          {Intl.NumberFormat("en-us", { minimumIntegerDigits: 2 }).format(
            Math.floor(duration % 60)
          )}
        </p>
      </HStack>
    </>
  );
};
