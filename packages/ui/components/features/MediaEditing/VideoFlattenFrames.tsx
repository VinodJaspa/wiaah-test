import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import React from "react";
import { useFFmpeg } from "./ffmpeg";

export const VideoFlattenFrames: React.FC<{
  videoSrc: string;
  loopSkipMS: number;
  renderItem: (imageBlob: Blob) => React.ReactNode;
}> = ({ videoSrc, loopSkipMS, renderItem }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [images, setImages] = React.useState<Blob[]>([]);
  const [update, setUpdate] = React.useState(false);

  const parts =
    videoRef.current && videoRef.current.duration > 0
      ? videoRef.current.duration * 100
      : 0;
  console.log({ parts, images }, videoRef.current?.duration);
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

  React.useEffect(() => {
    setUpdate((v) => !v);
  }, [videoRef]);

  const print = () => {
    if (parts < 1) return;
    const targetedFramesCount = loopSkipMS / parts;
    console.log({ targetedFramesCount, loopSkipMS, frames });

    const targetedFrames: number[] = [...Array(targetedFramesCount)].reduce(
      (acc, curr, idx) => {
        const frame = idx * loopSkipMS;
        return [...acc, frame];
      },
      [] as number[]
    );

    targetedFrames.map((frame, idx) => {
      const targetTime = frame / parts;
      printFrame(targetTime);
    });
  };

  print();
  return (
    <>
      <video width={200} height={200} src={videoSrc} ref={videoRef} />
      <canvas ref={canvasRef} width={640} height={360} className="hidden" />
      {images.map((img) => renderItem(img))}
    </>
  );
};
