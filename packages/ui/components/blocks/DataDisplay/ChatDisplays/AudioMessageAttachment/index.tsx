import React, { AudioHTMLAttributes } from "react";
import { DetailedHTMLProps } from "react";
import { useTranslation } from "react-i18next";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";

export interface AudioMessageProps
  extends DetailedHTMLProps<
    AudioHTMLAttributes<HTMLAudioElement>,
    HTMLElement
  > {}

export const AudioMessageAttachment: React.FC<AudioMessageProps> = ({
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
    <div className="relative">
      <div className="absolute hidden">
        <audio
          onTimeUpdate={handleChangeCurrentTime}
          onPlay={handlePlay}
          onPause={handlePause}
          ref={audioRef}
          {...rest}
        />
      </div>
      <div className="gap-2 items-center">
        <div
          className="p-1 text-primary-700 bg-primary-300"
          onClick={handleTogglePlaying}
        >
          {play ? (
            <BsPauseFill className="rounded-full" />
          ) : (
            <BsPlayFill className="rounded-full" />
          )}
        </div>
        <div className="flex items-center gap-[0.1rem]">
          {audioTicks.map((h, i) => (
            <div
              key={i}
              style={{
                height: h,
              }}
              className={`${
                i < currentAudioTick ? "primary.main" : "lightgray"
              } w-[0.3em]`}
            />
          ))}
        </div>
        {audioRef.current && audioRef.current.duration !== NaN && (
          <p className="text-gray-300">
            <DisplayDuration duration={audioRef.current.duration} />
          </p>
        )}
      </div>
    </div>
  );
};

export interface DisplayDurationProps {
  duration: number;
}

export const DisplayDuration: React.FC<DisplayDurationProps> = ({
  duration,
}) => {
  const { hours: h, minutes: m, seconds: s } = useTime(Math.floor(duration));

  const hours = h < 10 ? `0${h}` : h;
  const minutes = m < 10 ? `0${m}` : m;
  const seconds = s < 10 ? `0${s}` : s;
  return <>{`${minutes}:${seconds}`}</>;
};

const useTime = (timeInSec: number) => {
  const second = 1,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

  let hours = Math.floor(timeInSec / hour);
  let minutes = Math.floor(timeInSec / minute);
  let seconds = Math.floor(timeInSec % minute);

  return {
    hours,
    minutes,
    seconds,
  };
};
