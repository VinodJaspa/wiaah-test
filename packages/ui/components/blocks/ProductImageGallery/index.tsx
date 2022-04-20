import React, { useRef } from "react";
import { ChakraCarousel, CarouselPreviewer } from "ui";
import { ProductGalleryItem } from "ui/views/market/ProductView";
import { useScreenWidth } from "ui/Hooks";
import { PostAttachment } from "../Social";
import { Box } from "@chakra-ui/react";

export interface ProductImageGalleryProps {
  images?: ProductGalleryItem[];
  cashback?: number;
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images = [],
  cashback,
}) => {
  const { min: small } = useScreenWidth({ minWidth: 1280 });
  const [currentComponent, setCurrentComponent] = React.useState<number>(0);
  return (
    <>
      <div className="flex h-[28rem] w-full flex-col-reverse gap-4 xl:flex-row">
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

        <div className="relative h-full w-full overflow-hidden">
          {cashback && (
            <div className="absolute top-0 right-4 z-10 m-2 rounded-full bg-red-400 px-4 py-2 text-white">
              Cashback {cashback}%
            </div>
          )}
          <ChakraCarousel
            h={"100%"}
            arrows
            activeItem={currentComponent}
            setActiveItem={setCurrentComponent}
          >
            {images.map(({ type, original }, i) => (
              <PostAttachment
                play={currentComponent === i}
                src={original}
                type={type}
              />
            ))}
          </ChakraCarousel>
        </div>
      </div>
    </>
  );
};
