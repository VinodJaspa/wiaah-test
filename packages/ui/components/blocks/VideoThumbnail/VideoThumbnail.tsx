import React, { useState, useRef, RefObject } from "react";
import { HiOutlinePlay } from "react-icons/hi2";
import { PiPause } from "react-icons/pi";
import { isPlainObject } from "react-query/types/core/utils";

type VideoThumbnailProps = {
  videoSrc: string;
  views: string;
  description?: string;
};

export const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
  videoSrc,
  views,
  description,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef: RefObject<HTMLVideoElement> = useRef(null);

  const handleVideoPress = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="relative max-w-xs mx-auto">
      <div className="relative md:h-[395px] h-[160px] bg-black overflow-hidden">
        <video
          ref={videoRef}
          onClick={handleVideoPress}
          className="w-full h-full object-cover"
          loop
          muted
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute md:bottom-4 md:left-4 bottom-1 left-1 text-white">
          <p className="mb-2 hidden md:flex">{description}</p>
          <div className="flex items-center space-x-1 text-l">
            {isPlaying ? (
              <PiPause className="w-5 h-5 mb-1" onClick={handleVideoPress} />
            ) : (
              <HiOutlinePlay
                className="w-5 h-5 mb-1"
                onClick={handleVideoPress}
              />
            )}
            <p> {views}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoThumbnail;
