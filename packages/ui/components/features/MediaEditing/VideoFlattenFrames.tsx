import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import React from "react";
import { useFFmpeg } from "./ffmpeg";

export const VideoFlattenFrames: React.FC<{
  videoBlob: Blob;
  loopSkipFrames: number;
  renderItem: (imageBlob: Blob) => React.ReactNode;
}> = ({ videoBlob, loopSkipFrames, renderItem }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [frames, setFrames] = React.useState<number>(0);
  const [images, setImages] = React.useState<Blob[]>([]);
  const { ffmpeg } = useFFmpeg();

  console.log({ frames });
  React.useEffect(() => {
    const updateFrames = async () => {
      // Load the `@ffmpeg/ffmpeg` library
      if (!ffmpeg) return;
      // Read the video input from the blob and write it to the memory file system
      await ffmpeg.FS("writeFile", "input.mp4", await fetchFile(videoBlob));

      const args =
        "ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=duration -of default=noprint_wrappers=1:nokey=1 input.mp4 > output.txt".split(
          " "
        );

      // Copy the video codec and stream without re-encoding
      // Run the `ffprobe` command on the input video to get its metadata
      const outputFilePath = "output.txt";
      const res = await ffmpeg.run(...args);
      const data = ffmpeg.FS("readFile", outputFilePath);
      const blob = new Blob([data.buffer], { type: "text/plain" });
      const metadata = await blob.text();
      console.log({ res, data, blob, metadata });
      // setFrames(totalFrames);
    };
    updateFrames();
  }, [videoBlob, ffmpeg]);

  const printFrame = (time: number) => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      video.currentTime = time;

      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((v) => {
        setImages((e) => e.concat(v ? [v] : []));
      });
    }
  };

  console.log({ frames });

  React.useEffect(() => {
    const targetedFramesCount = loopSkipFrames / frames;
    console.log({ targetedFramesCount, loopSkipFrames, frames });
    if (frames < 1) return;

    const targetedFrames: number[] = [...Array(targetedFramesCount)].reduce(
      (acc, curr, idx) => {
        const frame = idx * loopSkipFrames;
        return [...acc, frame];
      },
      [] as number[]
    );

    targetedFrames.map((frame, idx) => {
      const targetTime = frame / frames;
      printFrame(targetTime);
    });
  }, [frames]);

  return (
    <>
      <video width={200} height={200} ref={videoRef} autoPlay muted loop />
      <canvas ref={canvasRef} width={640} height={360} className="hidden" />
      {images.map((img) => renderItem(img))}
    </>
  );
};
