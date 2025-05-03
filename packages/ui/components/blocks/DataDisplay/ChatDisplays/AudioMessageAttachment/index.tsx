import React from "react";
import { DurationDisplay, PlayButtonFillIcon, PlayFillIcon } from "@UI";
import { useTranslation } from "react-i18next";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import { HtmlAudioProps } from "types";

export interface AudioMessageProps extends HtmlAudioProps {
  src: string;
}

export const AudioMessageAttachment: React.FC<AudioMessageProps> = ({
  src,
  ...rest
}) => {
  const [play, setPlay] = React.useState<boolean>(false);
  const [currentAudioTick, setCurrentAudioTick] = React.useState<number>(0);
  const audioRef = React.useRef<HTMLAudioElement>(null);
const { t } = useTranslation();

  const audioTicks = React.useMemo(() => {
    return [...Array(30)].map(() => `${Math.random() * (2 - 0.3) + 0.3}em`);
  }, []);

  React.useEffect(() => {
    if (audioRef.current) {
      if (play) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [play]);

  function handlePlay() {
    setPlay(true);
  }
  function handlePause() {
    setPlay(false);
  }

  function handleChangeCurrentTime(
    e: React.SyntheticEvent<HTMLAudioElement, Event>
  ) {
    if (!audioRef.current) return;
    const { currentTime, duration } = audioRef.current;
    const progressPercent = currentTime / duration;

    setCurrentAudioTick(progressPercent * audioTicks.length);
  }
  function handleTogglePlaying() {
    setPlay((play) => !play);
  }
  return (
    <div className="relative px-4 py-2 bg-[#F4F4F4] rounded-xl">
      <div className="absolute hidden">
        <audio
          onTimeUpdate={handleChangeCurrentTime}
          onPlay={handlePlay}
          onPause={handlePause}
          //@ts-ignore
          ref={audioRef}
          src={src}
          {...rest}
        />
      </div>
      <div className="gap-2 flex items-center">
        <div className="text-xs text-primary" onClick={handleTogglePlaying}>
          {play ? <BsPauseFill /> : <PlayFillIcon />}
        </div>
        <div className="flex items-center gap-[0.1rem]">
          {audioTicks.map((h, i) => (
            <div
              key={i}
              style={{
                height: h,
              }}
              className={`${i < currentAudioTick ? "bg-primary" : "bg-gray-400"
                } w-[0.2em]`}
            />
          ))}
        </div>
        {audioRef.current && !Number.isNaN(audioRef.current.duration) && (
          <p className="text-black">
            <DurationDisplay duration={audioRef.current.duration} />
          </p>
        )}
      </div>
    </div>
  );
};
