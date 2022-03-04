import React, { useRef } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Carousel } from "antd";
import { t } from "i18next";

export interface ProductImageGalleryProps {
  images?: Array<{
    original: string;
    thumbnail: string | "";
    alt?: string | "";
  }>;
  video?: string | false;
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images = [],
  video = false,
}) => {
  let ref = useRef<any>();
  const vidRef = useRef<any>();

  function nextImage() {
    ref?.current?.next();
  }

  function previousImage() {
    ref?.current?.prev();
  }

  function silideToIndex(index: number) {
    ref?.current?.goTo(index, false);
  }

  function handleSlideChange(index: any) {
    // if (index == images.length) {
    //   vidRef?.current?.play();
    // } else {
    //   vidRef?.current?.pause();
    // }
  }
  return (
    <>
      <div className="flex flex-col-reverse items-start justify-start xl:flex-row">
        <div className="mt-3 mr-0 inline-flex flex-row xl:mr-4 xl:mt-0 xl:flex-col">
          {images.map((item, key: number) => {
            return (
              <div
                key={key}
                onClick={() => silideToIndex(key)}
                className="mr-4 mb-0 inline-block h-16 w-16 cursor-pointer xl:mb-4 xl:mr-0 "
              >
                <img
                  src={item.thumbnail}
                  alt={item.alt}
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
            );
          })}
        </div>
        <div className="relative w-full overflow-hidden lg:grow">
          <div className="product-cashback absolute top-1 right-1 z-10 rounded-md bg-red-400 p-1 text-xs text-white">
            10% {t("Cashback", "Cashback")}
          </div>

          <div
            onClick={() => previousImage()}
            className="slider-arrow absolute left-2 z-10 hidden cursor-pointer rounded-full bg-white py-2 px-2 lg:inline-flex"
          >
            <AiOutlineLeft className="text-xl" />
          </div>
          <div
            onClick={() => nextImage()}
            className="slider-arrow absolute right-2 z-10 hidden cursor-pointer rounded-full bg-white py-2 px-2 lg:inline-flex"
          >
            <AiOutlineRight className="text-xl" />
          </div>

          <div className="">
            <Carousel
              ref={ref}
              className=""
              afterChange={handleSlideChange}
              dots={false}
            >
              {images.map((item, key: number) => {
                return (
                  <img src={item.original} alt="" key={key} className="" />
                );
              })}
              {video && (
                <video ref={vidRef} className="" src={video} controls />
              )}
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
};
