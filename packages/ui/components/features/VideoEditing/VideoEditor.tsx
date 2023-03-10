import { MediaUploadModal, useMediaUploadControls } from "@blocks";
import {
  AspectRatio,
  Button,
  HStack,
  Input,
  PlusIcon,
  Spinner,
} from "@partials";
import React from "react";
import { useTranslation } from "react-i18next";
import ffmpeg from "fluent-ffmpeg";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { BiChevronDown } from "react-icons/bi";
// const path = require("path");
// const ffmpegPath = path.join(
//   __dirname,
//   "node_modules",
//   "@ffmpeg",
//   "core",
//   "ffmpeg"
// );

// export const processVideo = async (
//   inputFile: File,
//   startTime: number,
//   endTime: number
// ) => {
//   // Instantiate ffmpeg
//   const ffmpeg = createFFmpeg({
//     log: true,
//     corePath: `${__dirname}/node_modules/@ffmpeg/core/dist/ffmpeg-core.js`,
//   });

//   // Load ffmpeg
//   await ffmpeg.load();

//   // Create input stream from file input
//   const inputFilePath = URL.createObjectURL(inputFile);
//   await ffmpeg.FS("writeFile", "input.mp4", await fetchFile(inputFilePath));

//   // Set start time and duration
//   const args = [
//     "-ss",
//     startTime.toString(),
//     "-t",
//     (endTime - startTime).toString(),
//     "-i",
//     "input.mp4",
//   ];

//   // Copy the video codec and stream without re-encoding
//   args.push("-c:v", "copy", "-map", "0:v:0");

//   // Create output stream and capture as a Blob
//   const outputFilePath = "output.mp4";
//   await ffmpeg.run(...args, outputFilePath);
//   const data = ffmpeg.FS("readFile", outputFilePath);
//   const blob = new Blob([data.buffer], { type: "video/mp4" });

//   // Return the blob
//   return blob;
// };

export const VideoEditor: React.FC<{
  maxDuration: number;
}> = ({ maxDuration }) => {
  const { controls, uploadImage, uploadVideo } = useMediaUploadControls();
  const { t } = useTranslation();
  const [ready, setReady] = React.useState(true);
  const [video, setVideo] = React.useState<File>();
  const [proccessing, setProccessing] = React.useState<boolean>(false);

  const ref = React.useRef<HTMLVideoElement>(null);
  const handlersContainerRef = React.useRef<HTMLDivElement>(null);
  const duration = ref.current?.duration || 0;
  const [from, setFrom] = React.useState<number>(0);
  const [to, setTo] = React.useState<number>(duration);

  const [update, setUpdate] = React.useState(false);

  const handleUpload = async (startTime: number, endTime: number) => {
    if (!video) return;
    if (proccessing) return;
    // return processVideo(video, startTime, endTime);
  };

  return (
    <div className="flex justify-center items-center">
      {ready ? (
        <div className="w-[30rem] h-[30rem] flex flex-col gap-4">
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
          ) : (
            <div
              onClick={() => {
                uploadVideo();
              }}
              className="cursor-pointer flex justify-center flex-col gap-2"
            >
              <PlusIcon />
              <p>{t("Select Video")}</p>
            </div>
          )}
          <div className="w-full flex gap-2 items-center justify-between">
            <div className="flex gap-2 items-center">
              <Input
                type={"number"}
                flushed
                min={0}
                max={duration}
                className="w-16 "
                value={from}
                onChange={(e) => setFrom(Number(e.target.value))}
              />
              -
              <Input
                type={"number"}
                flushed
                min={1}
                max={duration}
                className="w-16 "
                value={to}
                onChange={(e) => setTo(Number(e.target.value))}
              />
            </div>
            <Button>{t("Submit")}</Button>
          </div>
          <div ref={handlersContainerRef} className="h-32 relative border-b-2">
            <VideoDraggableHandler
              maxPosition={duration + 1}
              parentRef={handlersContainerRef}
              position={from}
              setPosition={(e) => setFrom(e)}
            />
            <VideoDraggableHandler
              maxPosition={duration + 1}
              parentRef={handlersContainerRef}
              position={to}
              setPosition={(e) => setTo(e)}
            />
          </div>
        </div>
      ) : (
        <HStack>
          <Spinner />
          <p>{t("Loading")}</p>
        </HStack>
      )}
      <MediaUploadModal
        controls={controls}
        onVidUpload={(e, raw) => {
          console.log("vid uploaded", e, raw);
          setProccessing(true);
          setVideo(raw);
          setProccessing(false);
        }}
      />
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
}> = ({ position, setPosition, maxPosition, parentRef }) => {
  const [dragging, setDragging] = React.useState(false);
  const currPosition = (position / maxPosition) * 100;
  const currPositionPercent =
    currPosition > 100 ? 100 : currPosition < 0 ? 0 : currPosition;

  React.useEffect(() => {
    console.log("ref effect", parentRef);
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
        console.log({ idx, newX, currX, parentX, positions, maxPosition });
        if (idx !== position) {
          setPosition(idx);
        }
      }
    }
    function handleUp() {
      setDragging(false);
    }

    parentRef.current?.addEventListener("mousemove", handleMove);
    parentRef.current?.addEventListener("mouseup", handleUp);

    return () => {
      parentRef.current?.removeEventListener("mousemove", handleMove);
      parentRef.current?.removeEventListener("mousemove", handleUp);
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
      className={`h-full items-center absolute flex flex-col gap-1 top-0`}
    >
      <BiChevronDown />
      <div className="border-l border-l-black h-full" />
    </div>
  );
};
