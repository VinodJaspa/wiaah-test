import React from "react";
import { useTranslation } from "react-i18next";
import { AspectRatio, Button, HeartIcon, Rate } from "../../../partials";

export interface ServiceDetailedSearchCardProps {
  title: string;
  thumbnail: string;
  provider: string;
  rate: number;
  serviceClass: number;
  description: string;
  reviews: number;
  id: string;
}

export const ServiceDetailedSearchCard: React.FC<ServiceDetailedSearchCardProps> =
  ({
    description,
    provider,
    rate,
    thumbnail,
    title,
    serviceClass,
    reviews = 0,
  }) => {
    const { t } = useTranslation();

    const handleShowPrices = () => {
      // tobe implemented
    };

    return (
      <div className="flex gap-4 border-2 border-gray-300 p-2 rounded-lg">
        <div className="relative w-64">
          <AspectRatio ratio={1}>
            <img
              className="w-full h-full rounded-lg"
              src={thumbnail}
              alt={provider}
            />
          </AspectRatio>
          <HeartIcon className="absolute top-2 right-2 z-[5] bg-black bg-opacity-50 rounded-full text-white p-1 text-2xl cursor-pointer" />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <span className="text-primary-500 text-sm md:text-lg lg:text-xl xl:text-2xl">
            {title}
          </span>
          <Rate allowHalf rating={serviceClass} />
          <div className="flex gap-2">
            <span className="text-primary-500  underline cursor-pointer">
              {provider}
            </span>
            <span className="text-primary-500 underline cursor-pointer">
              {t("Show on map")}
            </span>
          </div>
          <p>{description}</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <div className="flex flex-col">
              <span className="font-bold ">
                {rate < 3
                  ? t("Considerable")
                  : rate < 4
                  ? t("Good")
                  : rate < 5
                  ? t("Fabulous")
                  : rate === 5
                  ? t("Excellent")
                  : t("Bad")}
              </span>
              <span className="">
                {reviews} {t("reviews")}
              </span>
            </div>
            <span className="bg-primary p-1 text-xl rounded-lg text-white">
              {rate}
            </span>
          </div>
          <Button className="whitespace-nowrap" onClick={handleShowPrices}>
            {t("Show prices")}
          </Button>
        </div>
      </div>
    );
  };
