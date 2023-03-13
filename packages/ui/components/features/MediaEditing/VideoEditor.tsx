import { MediaUploadModal, useMediaUploadControls } from "@blocks";
import {
  AspectRatio,
  Button,
  Divider,
  HStack,
  Input,
  PlusIcon,
  Spinner,
} from "@partials";
import React from "react";
import { useTranslation } from "react-i18next";
import { BiChevronDown, BiPause, BiPlay } from "react-icons/bi";
import { throttle } from "lodash";
import { useFFmpeg } from "./ffmpeg";

export const VideoEditor: React.FC<{
  maxDuration: number;
  onFinish: (data: Blob) => any;
}> = ({ maxDuration, onFinish }) => {
  const { t } = useTranslation();
  const { controls, uploadVideo } = useMediaUploadControls();
  const [proccessing, setProccessing] = React.useState<boolean>(false);
  const [video, setVideo] = React.useState<File>();
  const [update, setUpdate] = React.useState(false);
  const ref = React.useRef<HTMLVideoElement>(null);
  const { ffmpeg, cropVideo } = useFFmpeg();

  const handleSubmit = async (startTime: number, endTime: number) => {
    if (!video) return;
    if (proccessing) return;

    const data = await cropVideo(video, startTime, endTime);

    onFinish && data && onFinish(data);
  };

  React.useEffect(() => {}, []);

  return (
    <div className="w-ful bg-white h-full flex justify-between flex-col gap-4">
      {video ? (
        <AspectRatio ratio={9 / 16}>
          <video
            onLoad={() => {
              setUpdate((e) => !e);
            }}
            ref={ref}
            width={"100%"}
            height={"100%"}
            src={URL.createObjectURL(video)}
          />
        </AspectRatio>
      ) : ffmpeg ? (
        <div
          onClick={() => {
            uploadVideo();
          }}
          className="cursor-pointer w-full h-full items-center flex justify-center flex-col gap-2"
        >
          <div className="flex flex-col gap-2 items-center bg-white rounded p-8">
            <PlusIcon />
            <p>{t("Select Video")}</p>
          </div>
        </div>
      ) : (
        <HStack>
          <Spinner />
          <p>{t("Loading")}</p>
        </HStack>
      )}
      <VideoEditorControls
        maxDuration={maxDuration}
        videoRef={ref}
        onSubmit={(start, end) => {
          handleSubmit(start, end);
        }}
      ></VideoEditorControls>
      <MediaUploadModal
        controls={controls}
        onVidUpload={(e, raw) => {
          setProccessing(true);
          setVideo(raw);
          setProccessing(false);
        }}
      />
    </div>
  );
};

export const VideoEditorControls: React.FC<{
  maxDuration: number;
  onSubmit: (start: number, end: number) => any;
  videoRef: React.RefObject<HTMLVideoElement>;
}> = ({ videoRef: ref, onSubmit, maxDuration }) => {
  const { t } = useTranslation();
  const [playing, setPlaying] = React.useState(false);
  const handlersContainerRef = React.useRef<HTMLDivElement>(null);
  const durationMultiplier = 100;
  const duration =
    ref.current && ref.current.duration > 0
      ? ref.current.duration * durationMultiplier
      : 0;
  const [from, setFrom] = React.useState<number>(0);
  const [to, setTo] = React.useState<number>(duration);
  const [ready, setReady] = React.useState(true);
  const [durationUpdate, setDurationUpdate] = React.useState(false);
  const [lastHandler, setLastHandler] = React.useState<0 | 1>(0);

  const computedFrom = from / durationMultiplier;
  const computedTo = to / durationMultiplier;

  const debouncedUpdateVidTime = React.useCallback(
    throttle((e: number) => {
      if (ref.current) {
        ref.current.currentTime = e;
      }
    }, 100),
    [ref]
  );

  const handleSetFrom = (e: number) => {
    setFrom((v) => (e >= to ? v : e));
    if (lastHandler !== 0) {
      setLastHandler(0);
    }
  };

  const handleSetTo = (e: number) => {
    setTo((v) => (e <= from ? v : e));
    if (lastHandler !== 1) {
      setLastHandler(1);
    }
  };

  React.useEffect(() => {
    if (ref.current) {
      const playing = !ref.current.paused;
      setPlaying(playing);
    }
  }, [ref]);

  React.useEffect(() => {
    function handleLoad(e: Event) {
      //@ts-ignore
      const dur = e.target.duration as number;
      setTo(dur * durationMultiplier);
    }
    if (ref.current) {
      ref.current.addEventListener("loadedmetadata", handleLoad);
    }
    return () => {
      ref.current?.removeEventListener("loadedmetadata", handleLoad);
    };
  }, [ref]);

  if (!durationUpdate) {
    if (duration > 0) {
      setTo(duration);
      setDurationUpdate(true);
    }
  }

  if (playing && ref.current) {
    ref.current.currentTime = lastHandler === 0 ? from : to;
    ref.current.onprogress = (e) => {
      if (lastHandler === 0) {
        handleSetFrom(Math.floor(e.timeStamp));
      } else {
        handleSetTo(Math.floor(e.timeStamp));
      }
    };
  }

  if (ref.current) {
    if (lastHandler === 0) {
      debouncedUpdateVidTime(computedFrom);
    } else {
      debouncedUpdateVidTime(computedTo);
    }
  }

  const isLengthAcceptable = computedTo - computedFrom < maxDuration;

  return (
    <div className="flex p-2 rounded justify-center items-center">
      {ready ? (
        <div className="w-full flex flex-col gap-4">
          {!isLengthAcceptable ? (
            <p className="text-red-500">
              {t("Video length must be at most")} {maxDuration} {t("seconds")}
            </p>
          ) : null}
          <div className="w-full flex gap-2 items-center justify-between">
            <div className="flex gap-2 items-center">
              <div
                className="cursor-pointer text-4xl"
                onClick={() => {
                  if (playing) {
                    ref.current?.pause();
                    setPlaying(false);
                  } else {
                    ref.current?.play();
                    setPlaying(true);
                  }
                }}
              >
                {playing ? <BiPause /> : <BiPlay />}
              </div>
              <Input
                type={"number"}
                flushed
                min={0}
                max={duration}
                step={0.01}
                className="w-24"
                value={from / 100}
                onChange={(e) => handleSetFrom(Number(e.target.value) * 100)}
              />
              -
              <Input
                type={"number"}
                flushed
                min={1}
                max={duration}
                step={0.01}
                className="w-24"
                value={to / 100}
                onChange={(e) => handleSetTo(Number(e.target.value) * 100)}
              />
            </div>
            <Button onClick={() => onSubmit(computedFrom, computedTo)}>
              {t("Submit")}
            </Button>
          </div>
          <div ref={handlersContainerRef} className="h-12 mt-4 relative">
            <div className="border-b-primary border-b absolute w-full top-1/3"></div>
            <div className="border-b-gray-400 border-b absolute w-full top-2/3"></div>
            <VideoDraggableHandler
              maxPosition={duration + 1}
              parentRef={handlersContainerRef}
              position={from}
              setPosition={(e) => handleSetFrom(e)}
              className="select-none"
            >
              <BiChevronDown
                className={`${
                  lastHandler === 0 ? "fill-primary" : "fill-black"
                } absolute bottom-full text-2xl`}
              />
              <div className="border-l border-l-primary h-full" />
            </VideoDraggableHandler>
            <VideoDraggableHandler
              maxPosition={duration + 1}
              parentRef={handlersContainerRef}
              position={to}
              setPosition={(e) => handleSetTo(e)}
              className="select-none"
            >
              <BiChevronDown
                className={`${
                  lastHandler === 1 ? "fill-primary" : "fill-black"
                } absolute bottom-full text-2xl`}
              />
              <div className="border-l border-l-primary h-full" />
            </VideoDraggableHandler>
          </div>
        </div>
      ) : (
        <HStack>
          <Spinner />
          <p>{t("Loading")}</p>
        </HStack>
      )}
    </div>
  );
};

function findClosestNumber(arr: number[], target: number) {
  let closestNum = arr[0];
  let closestDiff = Math.abs(target - closestNum);

  for (let i = 1; i < arr.length; i++) {
    const currentNum = arr[i];
    const currentDiff = Math.abs(target - currentNum);

    if (currentDiff < closestDiff) {
      closestNum = currentNum;
      closestDiff = currentDiff;
    }
  }

  return closestNum;
}

const VideoDraggableHandler: React.FC<{
  position: number;
  setPosition: (pos: number) => any;
  maxPosition: number;
  parentRef: React.RefObject<HTMLElement>;
  className?: string;
}> = ({
  position,
  setPosition,
  maxPosition,
  parentRef,
  children,
  className,
}) => {
  const [dragging, setDragging] = React.useState(false);
  const currPosition = (position / maxPosition) * 100;
  const currPositionPercent =
    currPosition > 100 ? 100 : currPosition < 0 ? 0 : currPosition;

  React.useEffect(() => {
    function handleMove(e: React.MouseEvent) {
      if (dragging && parentRef && parentRef.current) {
        const rect = parentRef.current.getBoundingClientRect();

        // console.log({ maxPosition });
        const parentX = rect.x;
        const parentMaxX = parentX + rect.width;
        const currX = e.clientX;

        const gap = rect.width / maxPosition;

        const positions = [
          ...Array(
            typeof maxPosition === "number" && maxPosition >= 0
              ? Math.floor(maxPosition)
              : 0
          ),
        ].map((_, i) => {
          const distance = i * gap;
          return parentX + distance;
        });

        const newX = findClosestNumber(positions, currX);

        const idx = positions.findIndex((e) => e === newX);
        if (idx !== position) {
          setPosition(idx);
        }
      }
    }
    function handleUp() {
      setDragging(false);
    }

    //@ts-ignore
    document?.addEventListener("mousemove", handleMove);
    document?.addEventListener("mouseup", handleUp);

    return () => {
      //@ts-ignore
      document?.removeEventListener("mousemove", handleMove);
      document?.removeEventListener("mouseup", handleUp);
    };
  }, [parentRef, dragging]);

  return (
    <div
      onMouseMove={(e) => {}}
      onMouseDown={() => {
        setDragging(true);
      }}
      onMouseUp={() => {
        setDragging(false);
      }}
      style={{
        left: `${currPositionPercent}%`,
      }}
      className={`${
        className || ""
      } h-full items-center absolute flex flex-col gap-1 top-0`}
    >
      {children}
    </div>
  );
};
