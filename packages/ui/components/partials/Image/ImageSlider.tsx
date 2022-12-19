import React from "react";
import { BsDot } from "react-icons/bs";
import { ArrowLeftIcon, ArrowRightIcon, Slider } from "@UI";

export interface ImageSliderProps {
  images: string[];
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentImgIdx, setCurrentImgIdx] = React.useState<number>(0);
  if (!Array.isArray(images)) return null;
  function handleNextImg() {
    setCurrentImgIdx((curr) => {
      const nextIdx = curr + 1;
      if (typeof images[nextIdx] === "string") return nextIdx;
      return curr;
    });
  }
  function handlePrevImg() {
    setCurrentImgIdx((curr) => {
      const prevIdx = curr - 1;
      if (typeof images[prevIdx] === "string") return prevIdx;
      return curr;
    });
  }
  return (
    <div className="w-full h-full overflow-hidden relative">
      <Slider currentItemIdx={currentImgIdx}>
        {Array.isArray(images)
          ? images.map((src, i) => (
              <img
                style={{ width: `100%` }}
                className={`object-cover h-full`}
                key={i}
                src={src}
              />
            ))
          : null}
      </Slider>
      <div className="w-full h-full bg-gradient-to-t from-[rgba(0,0,0,0.3)] absolute top-0 left-0"></div>
      <div className="absolute bottom-0 left-1/2 flex items-center -translate-x-1/2">
        {[...Array(images.length)].map((_, i) => (
          <span
            className={`${
              currentImgIdx === i
                ? "text-6xl text-white"
                : "text-5xl text-gray-400"
            } font-bold`}
          >
            <BsDot />
          </span>
        ))}
      </div>
      <div className="absolute top-1/2 left-0 w-full px-4 flex items-center justify-between -translate-y-1/2">
        {currentImgIdx === 0 ? (
          <span></span>
        ) : (
          <span
            className="cursor-pointer text-lg p-1 bg-white"
            onClick={handlePrevImg}
          >
            <ArrowLeftIcon />
          </span>
        )}
        {currentImgIdx === images.length - 1 ? null : (
          <span
            className="cursor-pointer text-lg p-1 bg-white"
            onClick={handleNextImg}
          >
            <ArrowRightIcon />
          </span>
        )}
      </div>
    </div>
  );
};
