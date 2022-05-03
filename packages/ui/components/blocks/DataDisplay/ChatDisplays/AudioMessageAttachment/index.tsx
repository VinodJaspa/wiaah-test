import { Flex, HStack, Text, IconButton, Box } from "@chakra-ui/react";
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
  // const { hours, minutes, seconds } =
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
    <Box position={"relative"}>
      <Box position={"absolute"} visibility="hidden">
        <audio
          onTimeUpdate={handleChangeCurrentTime}
          onPlay={handlePlay}
          onPause={handlePause}
          ref={audioRef}
          {...rest}
        />
      </Box>
      <Flex gap="0.5rem" align={"center"}>
        <IconButton
          colorScheme={"gray"}
          variant="icon"
          p="0.25em"
          color={"primary.700"}
          bgColor="primary.300"
          rounded={"full"}
          aria-label={t("start_audio", "start audio")}
          as={play ? BsPauseFill : BsPlayFill}
          onClick={handleTogglePlaying}
        />
        <HStack spacing={"0.1rem"}>
          {audioTicks.map((h, i) => (
            <Box
              key={i}
              w="0.3em"
              h={h}
              bgColor={i < currentAudioTick ? "primary.main" : "lightgray"}
            ></Box>
          ))}
        </HStack>
        {audioRef.current && audioRef.current.duration !== NaN && (
          <Text color="lightgray">
            <DisplayDuration duration={audioRef.current.duration} />
          </Text>
        )}
      </Flex>
    </Box>
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
