import React, { useState, useRef, RefObject, useEffect } from "react";
import { HiOutlinePlay } from "react-icons/hi2";
import { PiPause } from "react-icons/pi";

export type VideoThumbnailProps = {
  videoSrc: string;
  views: string;
  description?: string;
  isFocused: boolean;
  onFocus: () => void;
  handleOpen?: () => void;
  isShort: boolean;
};

export const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
  videoSrc,
  views,
  description,
  isFocused,
  onFocus,
  handleOpen,
  isShort,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef: RefObject<HTMLVideoElement> = useRef(null);

  const handleButtonPress = () => {
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

  const handleVideoPress = () => {
    if (handleOpen) {
      handleOpen();
      setIsPlaying(false);
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.code === "Space" && isFocused) {
      event.preventDefault();
      handleButtonPress();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isPlaying, isFocused]);

  return (
    <div
      className={`relative ${isShort && "max-w-xs"} mx-auto ${isFocused ? "focused" : ""
        }`}
      onFocus={onFocus}
      tabIndex={0} // Makes the div focusable
    >
      <div className="relative md:h-[395px] h-[160px] bg-black overflow-hidden">
        <video
          onClick={handleVideoPress}
          ref={videoRef}
          className="w-full h-full object-cover"
          loop
          muted
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute md:bottom-4 md:left-4 bottom-1 left-1 text-white">
          <p className="mb-2 hidden md:flex">{description}</p>
          <div className="flex items-center space-x-1 text-l relative z-10">
            {isPlaying ? (
              <PiPause
                className="w-5 h-5 mb-1 z-20 cursor-pointer"
                onClick={handleButtonPress}
              />
            ) : (
              <HiOutlinePlay
                className="w-5 h-5 mb-1 z-20 cursor-pointer"
                onClick={handleButtonPress}
              />
            )}
            <p className="z-10">{views}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoThumbnail;
