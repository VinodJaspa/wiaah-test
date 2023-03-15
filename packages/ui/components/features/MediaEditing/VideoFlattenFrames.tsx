import { Carousel } from "@blocks";
import {
  AspectRatio,
  CaruoselLeftArrow,
  CaruoselRightArrow,
  Slider,
  Spinner,
} from "@partials";
import { mapArray } from "@UI/../utils/src";
import React from "react";
import { useFFmpeg } from "./ffmpeg";

export const VideoFlattenFrames: React.FC<{
  videoSrc: string;
  videoEverySec: number;
  renderItem: (imageBlob: Blob, idx: number) => React.ReactNode;
  onFrameSelected: (blob: Blob, idx: number) => any;
}> = ({ videoSrc, renderItem, videoEverySec, onFrameSelected }) => {
  const [videos, setVideos] = React.useState<Blob[]>([]);
  const [duration, setDuration] = React.useState<number>();
  const { cropVideo } = useFFmpeg();

  React.useEffect(() => {
    if (!duration) return;
    const load = async () => {
      let vids: (Blob | undefined)[] = [];
      for (let i = 0; i < Math.floor(duration); i++) {
        const data = await cropVideo(videoSrc, i, i + 1);
        vids.push(data);
      }

      setVideos(vids.filter((v) => !!v) as Blob[]);
    };
    load();
  }, [videoSrc, videoEverySec, duration]);

  return (
    <>
      <video
        src={videoSrc}
        className="hidden"
        onLoadedMetadata={(event) =>
          //@ts-ignore
          setDuration(event.target.duration as number)
        }
      />
      <div className="overflow-hidden">
        <AspectRatio ratio={14 / 9}>
          {!videos || videos.length < 1 ? (
            <div className="w-full h-full flex justify-center items-center">
              <Spinner className="text-primary text-4xl" />
            </div>
          ) : (
            <Slider
              draggingActive={false}
              gap={8}
              itemsCount={4}
              onSliderChange={(v) => {
                if (videos.at(0) && onFrameSelected) {
                  onFrameSelected(videos.at(v) as Blob, v);
                }
              }}
            >
              {mapArray(videos, (vid, idx) => renderItem(vid, idx))}
            </Slider>
          )}
        </AspectRatio>
      </div>
    </>
  );
};
