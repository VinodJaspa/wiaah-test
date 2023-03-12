import { createFFmpeg } from "@ffmpeg/ffmpeg";
import React from "react";

const ffmpeg = createFFmpeg({
  log: true,
});

export const getFFmpeg = async () => {
  if (ffmpeg.isLoaded()) return ffmpeg;
  await ffmpeg.load();
  return ffmpeg;
};

export const useFFmpeg = () => {
  const [FFmpeg, setFFmpeg] = React.useState<typeof ffmpeg>();

  React.useEffect(() => {
    const load = async () => {
      const ffmpeg = await getFFmpeg();

      setFFmpeg(ffmpeg);
    };
    load();
  }, []);
  return {
    ffmpeg: FFmpeg,
  };
};
