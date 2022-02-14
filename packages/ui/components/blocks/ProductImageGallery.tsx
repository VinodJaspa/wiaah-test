import React, {  useRef, useState } from "react";
import ImageGallery from "react-image-gallery";
import { AiOutlineLeft,  AiOutlineRight } from "react-icons/ai";

export interface ProductImageGalleryProps {
  images?: Array<{
    original: string;
    thumbnail: string | "";
    alt?: string | "";
  }>;
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images = [],
}) => {
  let ref = useRef<any>();
  const vidRef = useRef<any>();
  let [playVideo, setPlayVideo] = useState(false);

  function nextImage() {
    let currentIndex = ref.current.getCurrentIndex();
    if (currentIndex < images.length - 1) {
      ref.current.slideToIndex(currentIndex + 1);
    } else {
      ref.current.slideToIndex(0);
    }
  }

  function previousImage() {
    let currentIndex = ref.current.getCurrentIndex();
    if (currentIndex > 0) {
      ref.current.slideToIndex(currentIndex - 1);
    } else {
      ref.current.slideToIndex(images.length - 1);
    }
  }

  function silideToIndex(index: number) {
    ref?.current?.slideToIndex(index);
  }

  function handleSlideChange(index: any) {
    if (index == images.length - 1) {
      setPlayVideo(true);
      vidRef.current.play();
    } else {
      setPlayVideo(false);
      vidRef.current.pause();
    }
  }
  return (
    <>
      <div className="flex flex-col-reverse justify-start lg:flex-row">
        <div className="mr-4 mt-2 inline-flex flex-row lg:mt-0 lg:flex-col">
          {images.map((item, key: number) => {
            return (
              <div
                key={key}
                onClick={() => silideToIndex(key)}
                className="relative mb-4 mr-4 inline-block h-16 w-16 cursor-pointer overflow-hidden rounded-lg lg:mr-0"
              >
                <div className="gallery-thumbnail absolute w-32">
                  <img src={item.thumbnail} alt={item.alt} className="h-full" />
                </div>
              </div>
            );
          })}
        </div>
        <div className="relative inline-flex items-end">
          <div className="product-cashback absolute top-1 right-1 z-10 rounded-md bg-red-400 p-1 text-xs text-white">
            10% Cashback
          </div>
          <div className="hidden md:block">
            <div
              onClick={() => previousImage()}
              className="absolute bottom-2/4 left-5 z-10 cursor-pointer rounded-full bg-white py-2 px-2"
            >
              <AiOutlineLeft className="text-xl" />
            </div>
            <div
              onClick={() => nextImage()}
              className="absolute bottom-2/4 right-5 z-10 cursor-pointer rounded-full bg-white py-2 px-2"
            >
              <AiOutlineRight className="text-xl" />
            </div>
          </div>
          <ImageGallery
            ref={ref}
            thumbnailPosition="left"
            items={images}
            showFullscreenButton={false}
            showPlayButton={false}
            showThumbnails={false}
            additionalClass={`${playVideo ? "hidden" : ""}`}
            onSlide={handleSlideChange}
          />
          <video
            ref={vidRef}
            className={`${playVideo ? "" : "hidden"}`}
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            controls
          ></video>
        </div>
      </div>
    </>
  );
};
