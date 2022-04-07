import React, { useRef } from "react";
import { Carousel, CarouselPreviewer } from "./";
import { t } from "i18next";
import { useMediaQuery } from "react-responsive";
import { Spacer } from "../partials";
import { ProductGalleryItem } from "../../views/market/ProductView";
import { useScreenWidth } from "../../Hooks";

export interface ProductImageGalleryProps {
  images?: ProductGalleryItem[];
  cashback?: number;
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images = [],
  cashback,
}) => {
  const { min: small } = useScreenWidth({ minWidth: 1280 });
  console.log("small", small);
  const [currentComponent, setCurrentComponent] = React.useState<number>();
  return (
    <>
      <div className="flex h-[28rem] w-full flex-col-reverse gap-4 xl:h-full xl:flex-row">
        <div className="h-fit w-full xl:h-full xl:w-fit">
          <CarouselPreviewer
            setCurrentComponentNum={currentComponent}
            borderColor="#57bf9c"
            direction={small ? "horizontal" : "vertical"}
            getCurrentComponent={(component) => setCurrentComponent(component)}
            components={images.map(({ original, thumbnail, alt, type }, i) => {
              if (type === "image") {
                return {
                  Component: (
                    <img alt={alt} src={original} className="w-full" />
                  ),
                };
              } else if (type === "video") {
                return {
                  Component: (
                    <video className="bg-orange-100">
                      <source src={thumbnail} type="video/webm" />
                    </video>
                  ),
                };
              } else {
                return {
                  Component: <div>{original}</div>,
                };
              }
            })}
          />
        </div>

        <div className="relative h-full w-full">
          {cashback && (
            <div className="absolute top-0 right-4 z-10 m-2 rounded-full bg-red-400 px-4 py-2 text-white">
              Cashback {cashback}%
            </div>
          )}
          <Carousel
            setCurrentComponentNum={currentComponent}
            getCurrentComponent={(component) => setCurrentComponent(component)}
          >
            {images.map(({ original, thumbnail, alt, type }, i) => {
              if (type === "image") {
                return {
                  Component: (
                    <img alt={alt} src={original} className="w-full" />
                  ),
                };
              } else if (type === "video") {
                return {
                  Component: (
                    <video className="h-full w-auto " controls>
                      <source src={original} type="video/webm" />
                    </video>
                  ),
                };
              } else {
                return {
                  Component: <div>{original}</div>,
                };
              }
            })}
          </Carousel>
        </div>
      </div>
    </>
  );
};
