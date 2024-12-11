import React, { useState } from "react";
import {
  AspectRatioImage,
  Button,
  DotIcon,
  HStack,
  LocationIcon,
  PriceDisplay,
  StarIcon,
} from "@partials";
import { useTranslation } from "react-i18next";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { LuMessageSquare } from "react-icons/lu";

export interface Location {
  address: string;
  city: string;
  country: string;
  lat: number;
  long: number;
  state: string;
}

interface MarketRestaurantServiceSearchCardAltProps {
  name: string;
  thumbnail: string;
  rating: number;
  reviews: number;
  location: Location;
  price: number;
}

export const MarketRestaurantServiceSearchCardAlt: React.FC<
  MarketRestaurantServiceSearchCardAltProps
> = ({ name, thumbnail, rating, reviews, location, price }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-1 p-1">
      <Carousel slides={["/shop.jpeg", "/shop-2.jpeg", "/shop-3.jpeg"]} />
      <div className="flex flex-col gap-2 p-1">
        <HStack>
          <p className="font-semibold">{location.country}</p>
        </HStack>
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold">{t("Le bruite qui court")}</p>
          <p className=" text-lg font-semibold">5</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="font-medium text-gray-500">{location.address}</p>
          <div className="font-medium text-gray-500 flex gap-1 items-center">
            <LuMessageSquare />
            <p>{reviews}</p>
          </div>
        </div>
        <p className="flex items-end text-[0.938rem] gap-1">
          <span className="text-gray-500">{t("Average Price")}</span>
          <PriceDisplay price={price} className="font-medium text-gray-500" />
        </p>
        <div className="border-l-2 border-red-500 flex text-red-500 font-medium p-1   ">
          <p>50% $on the map</p>
        </div>
        {/* this is hard coded values*/}
        <div className="flex font-medium gap-1">
          <span>Italian, healthy, pizza</span>
          <span>-</span>
          <span>$$$</span>
        </div>
      </div>
    </div>
  );
};

interface CarouselProps {
  slides: string[];
}

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length,
    );
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Image */}
      <div className="relative w-full h-[300px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-200 ${
              index === currentIndex ? "translate-x-0" : "translate-x-full"
            } ${index < currentIndex ? "-translate-x-full" : ""}`}
          >
            <AspectRatioImage
              alt={`slide-${index}`}
              imageClassName="relative hover:bg-opacity-40"
              src={slide}
              ratio={1.05}
            >
              <Button
                colorScheme="primary"
                className="hidden hover:visible absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                Details
              </Button>
            </AspectRatioImage>
            {slide && (
              <div className="absolute top-4 left-4 bg-gray-200 text-black px-2 py-1 rounded-md shadow-md">
                % Great Deal
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 -translate-y-1/2 left-4 bg-gray-200 text-black  p-1"
      >
        <IoIosArrowBack />
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 -translate-y-1/2 right-4 bg-gray-200 text-black  p-1"
      >
        <IoIosArrowForward />
      </button>

      {/* Dot Indicators */}
      <div className="flex justify-center mt-4 absolute left-1/2 transform -translate-x-1/2 bottom-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 mx-1 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
