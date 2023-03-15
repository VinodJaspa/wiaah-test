import { MediaUploadModal, useMediaUploadControls } from "@blocks";
import {
  AspectRatio,
  Button,
  HStack,
  Image,
  Input,
  PlusIcon,
  Spinner,
  VStack,
} from "@partials";
import { Slider } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  BiPause,
  BiPlay,
  BiSkipPrevious,
  BiSkipNext,
  BiVolumeFull,
  BiVolumeMute,
  BiChevronRight,
  BiChevronLeft,
  BiChevronUp,
  BiChevronDown,
} from "react-icons/bi";
import { throttle } from "lodash";
import { useFFmpeg } from "./ffmpeg";
import { mapArray } from "@UI/../utils/src";

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

  const handleUpload = (file: File) => {
    setVideo(file);
  };

  React.useEffect(() => {
    setUpdate((v) => !v);
  }, [ref]);

  return (
    <div className="w-full relative bg-white h-full flex justify-between flex-col gap-4">
      {video ? (
        <AspectRatio className="bg-black flex" ratio={14 / 9}>
          <div className="flex items-center w-full h-full">
            <video
              className="w-full h-full object-cover"
              onLoad={() => {
                setUpdate((e) => !e);
              }}
              ref={ref}
              src={URL.createObjectURL(video)}
            />
          </div>
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
      <div className="absolute text-white w-full bg-black bg-opacity-50 bottom-0 left-0">
        <VideoEditorControls
          maxDurationExccedError={t("Video length must be at most 3 minutes")}
          maxDuration={maxDuration}
          videoRef={ref}
          onSubmit={(start, end) => {
            handleSubmit(start, end);
          }}
        />
      </div>
      <MediaUploadModal
        controls={controls}
        onVidUpload={(e, raw) => {
          setProccessing(true);
          if (raw) handleUpload(raw);
          setProccessing(false);
        }}
      />
    </div>
  );
};

export const VideoEditorControls: React.FC<{
  maxDuration: number;
  maxDurationExccedError: string;
  onSubmit: (start: number, end: number) => any;
  videoRef: React.RefObject<HTMLVideoElement>;
}> = ({ videoRef: ref, onSubmit, maxDuration, maxDurationExccedError }) => {
  const { t } = useTranslation();
  const [trackWidth, setTrackWidth] = React.useState(100);
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
  const [muted, setMuted] = React.useState<boolean>(false);

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

  React.useEffect(() => {
    if (ref.current) {
      ref.current.muted = muted;
    }
  }, [muted]);

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

  const computedW = 50;

  const containerW = handlersContainerRef.current?.clientWidth || 1;
  const timesLength =
    typeof computedW === "number" && computedW < Infinity && computedW > 0
      ? containerW / computedW
      : 0;

  const times = [...Array(Math.floor(timesLength))].map((_, i) => {
    const timeDiff = duration / 100;

    const timeStep = timeDiff / timesLength;

    const time = i * timeStep;

    const targetTime = time;
    return {
      time: targetTime,
      pos: i * computedW,
    };
  });

  return (
    <div className="flex flex-col gap-2 p-2 rounded justify-center items-center">
      {ready ? (
        <div className="w-full flex flex-col ">
          {!isLengthAcceptable ? (
            <p className="text-red-500">{maxDurationExccedError}</p>
          ) : null}
          {duration > 0 ? (
            <>
              <div className="w-full flex gap-2 items-center justify-between">
                <div className="text-2xl flex gap-2 items-center">
                  <BiSkipPrevious
                    onClick={() => handleSetFrom(from - 10)}
                    className="text-gray-400"
                  />
                  <div
                    className="cursor-pointer text-5xl"
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
                  <BiSkipNext onClick={() => {}} className="text-gray-400" />
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div
                    className="text-xl text-gray-400"
                    onClick={() => {
                      setMuted((e) => !e);
                    }}
                  >
                    {muted ? <BiVolumeMute /> : <BiVolumeFull />}
                  </div>
                  <HStack className="">
                    <p className="px-1 font-bold">
                      {(trackWidth / 100).toFixed(1)}X
                    </p>
                    <HStack className="text-xl select-none">
                      <BiChevronLeft
                        className="cursor-pointer"
                        onClick={(e) => setTrackWidth((v) => v - 50)}
                      ></BiChevronLeft>
                      <BiChevronRight
                        className="cursor-pointer"
                        onClick={(e) => setTrackWidth((v) => v + 50)}
                      ></BiChevronRight>
                    </HStack>
                  </HStack>
                </div>
              </div>
              <div className="w-full overflow-x-scroll mt-2 noScroll px-4">
                <div
                  ref={handlersContainerRef}
                  style={{
                    width: `${trackWidth}%`,
                  }}
                  className="h-36 mt-4 flex items-center relative "
                >
                  {mapArray(times, (v, i) => (
                    <div
                      style={{ left: `${v.pos}px` }}
                      className="flex  flex-col absolute -translate-x-1/2 bottom-full"
                      key={i}
                    >
                      <p>{Math.floor(v.time)}</p>
                    </div>
                  ))}
                  <>
                    <div className="w-full h-3/4 relative ">
                      <VideoEditorTrack
                        //@ts-ignore
                        {...trackWidth}
                        from={from}
                        videoRef={ref}
                        to={to}
                      />
                    </div>
                    <VideoDraggableHandler
                      maxPosition={duration + 1}
                      parentRef={handlersContainerRef}
                      position={from}
                      setPosition={(e) => handleSetFrom(e)}
                      className="select-none"
                    >
                      <div className="relative h-full">
                        <div className="h-full border-l top-0 left-0 border-primary"></div>
                        <div className="w-6 h-10 absolute bg-primary-200 top-1/2 -translate-y-1/2 right-full bg-white-300 rounded-tl-lg rounded-bl-lg border flex justify-center items-center">
                          <BiChevronLeft />
                        </div>
                      </div>
                    </VideoDraggableHandler>
                    <VideoDraggableHandler
                      maxPosition={duration + 1}
                      parentRef={handlersContainerRef}
                      position={to}
                      setPosition={(e) => handleSetTo(e)}
                      className="select-none"
                    >
                      <div className="relative h-full">
                        <div className="h-full border-l top-0 left-0 border-primary"></div>
                        <div className="w-6 h-10 bg-primary-200 absolute top-1/2 -translate-y-1/2 left-full bg-white-300 rounded-tr-lg rounded-br-lg border flex justify-center items-center">
                          <BiChevronRight />
                        </div>
                      </div>
                    </VideoDraggableHandler>
                  </>
                </div>
              </div>
            </>
          ) : null}
        </div>
      ) : (
        <HStack>
          <Spinner />
          <p>{t("Loading")}</p>
        </HStack>
      )}
      {duration > 0 ? (
        <div className="flex w-full justify-end">
          <Button
            onClick={() => {
              onSubmit(computedFrom, computedTo);
            }}
          >
            {t("Submit")}
          </Button>
        </div>
      ) : null}
    </div>
  );
};

const VideoEditorTrack: React.FC<{
  from: number;
  to: number;
  videoRef: React.RefObject<HTMLVideoElement>;
}> = ({ from, to, videoRef }) => {
  const thumbVideoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [duration, setDuration] = React.useState<number>(0);
  const [trackWidth, setTrackWidth] = React.useState<number>(0);
  const [trackHeight, setTrackHeight] = React.useState<number>(0);
  const [vidRatio, setVidRatio] = React.useState<number>(9 / 14);

  React.useEffect(() => {
    if (videoRef.current) {
      if (
        videoRef.current.duration &&
        videoRef.current.duration > 0 &&
        videoRef.current.duration < Infinity
      ) {
        if (duration !== videoRef.current.duration) {
          setDuration(videoRef.current.duration);
        }
        const ratio =
          videoRef.current.clientHeight / videoRef.current.clientWidth;

        // if (typeof ratio === "number" && ratio > 0 && ratio < Infinity) {
        //   if (vidRatio !== ratio) {
        //     setVidRatio(ratio);
        //   }
        // }
      }
    }
  });

  React.useEffect(() => {
    if (trackRef.current) {
      if (
        trackRef.current.clientWidth &&
        trackRef.current.clientWidth >= 0 &&
        trackRef.current.clientWidth < Infinity &&
        trackRef.current.clientHeight &&
        trackRef.current.clientHeight >= 0 &&
        trackRef.current.clientHeight < Infinity
      ) {
        if (trackRef.current.clientWidth !== trackWidth) {
          setTrackWidth(trackRef.current.clientWidth);
        }
        if (trackRef.current.clientHeight !== trackHeight) {
          setTrackHeight(trackRef.current.clientHeight);
        }
      }
    }
  });

  const fromPosition = from / duration;
  const fromPositionPercent =
    fromPosition > 100 ? 100 : fromPosition < 0 ? 0 : fromPosition;

  const toPosition = to / duration;
  const toPositionPercent =
    toPosition > 100 ? 100 : toPosition < 0 ? 0 : toPosition;

  const computedW = vidRatio * trackHeight;

  const timesLength =
    typeof computedW === "number" && computedW < Infinity && computedW > 0
      ? trackWidth / computedW
      : 0;

  const times = [...Array(Math.floor(timesLength))].map((_, i) => {
    const timeDiff = (to - from) / 100;

    const timeStep = timeDiff / timesLength;

    const startTime = from / 100;

    const time = i * timeStep;

    const targetTime = startTime + time;
    return {
      src: captureVideoImage(targetTime),
      time: targetTime,
    };
  });

  function captureVideoImage(time: number) {
    if (time > duration || time < 0) return;

    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (!context) return;
      videoRef.current.currentTime = time;

      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const url = canvas.toDataURL("image/jpeg");

      if (typeof url !== "string") return;
      return url;
    }
  }

  return (
    <>
      <div
        style={{
          left: `${fromPositionPercent}%`,
          width: `${toPositionPercent - fromPositionPercent}%`,
        }}
        ref={trackRef}
        className="absolute select-none bg-black h-full overflow-hidden rounded-lg border-2 top-1/2 -translate-y-1/2"
      >
        <div className="w-full h-full justify-between flex border-primary-200 text-white text-xs relative">
          {times.map((v, i) => (
            <div
              style={{
                height: trackHeight,
                width: computedW,
              }}
              className={"bg-black flex justify-center items-center"}
            >
              <Image
                key={i}
                className="w-full bg-primary-100 text-black"
                src={v.src}
              />
            </div>
          ))}
          <div className="absolute px-2 py-1  bg-primary bottom-0 left-0">
            {Math.floor(from / 100)}:{from % 100}
          </div>
          <div className="absolute px-2 py-1  bg-primary bottom-0 right-0">
            {Math.floor(to / 100)}:{to % 100}
          </div>
        </div>
        <canvas
          className="opacity-0 pointer-events-none fixed hidden"
          ref={canvasRef}
        />
        <video src={videoRef.current?.src} className="" ref={thumbVideoRef} />
      </div>
    </>
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
