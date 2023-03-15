import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import React from "react";

const ffmpeg = createFFmpeg({
  log: true,
});

let ffmpegLoading = false;

export const getFFmpeg = async () => {
  if (ffmpeg.isLoaded() || ffmpegLoading) return ffmpeg;
  ffmpegLoading = true;
  await ffmpeg.load();
  ffmpegLoading = false;
  return ffmpeg;
};

export const useFFmpeg = () => {
  const [FFmpeg, setFFmpeg] = React.useState<typeof ffmpeg>();

  const processVideo = async (
    inputFile: File | Blob | string,
    startTime: number,
    endTime: number
  ) => {
    // Load ffmpeg
    if (!ffmpeg) return;
    // Create input stream from file input
    const inputFilePath =
      typeof inputFile === "string"
        ? inputFile
        : URL.createObjectURL(inputFile);
    await ffmpeg.FS("writeFile", "input.mp4", await fetchFile(inputFilePath));

    // Set start time and duration
    const args = [
      "-ss",
      startTime.toString(),
      "-t",
      (endTime - startTime).toString(),
      "-i",
      "input.mp4",
    ];

    // Copy the video codec and stream without re-encoding
    args.push("-c:v", "copy", "-map", "0:v:0");

    // Create output stream and capture as a Blob
    const outputFilePath = "output.mp4";
    await ffmpeg.run(...args, outputFilePath);
    const data = ffmpeg.FS("readFile", outputFilePath);
    const blob = new Blob([data.buffer], { type: "video/mp4" });

    // Return the blob
    return blob;
  };

  React.useEffect(() => {
    const load = async () => {
      const ffmpeg = await getFFmpeg();

      setFFmpeg(ffmpeg);
    };
    load();
  }, []);
  return {
    ffmpeg: FFmpeg,
    cropVideo: processVideo,
  };
};
