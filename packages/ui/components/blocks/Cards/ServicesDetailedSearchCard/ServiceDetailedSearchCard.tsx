import { FilteredServiceMetaDataType } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { DateRange } from "types";
import {
  AspectRatio,
  Button,
  HeartIcon,
  PriceDisplay,
  Rate,
} from "../../../partials";
import EllipsisText from "../../EllipsisText";

export interface ServiceDetailedSearchCardProps
  extends FilteredServiceMetaDataType {}

export const ServiceDetailedSearchCard: React.FC<ServiceDetailedSearchCardProps> =
  ({
    description,
    provider,
    rate,
    thumbnail,
    title,
    serviceClass,
    reviews = 0,
    date,
    id,
    pricePerNight,
    taxesAndFeesIncluded,
    totalPrice,
  }) => {
    const { t } = useTranslation();

    const handleShowPrices = () => {
      // tobe implemented
    };

    return (
      <div className="flex gap-4 border-2 border-gray-300 p-2 rounded-lg">
        <div className="relative w-[min(100%,40rem)]">
          <AspectRatio ratio={4 / 6}>
            <img
              className="w-full h-full object-cover "
              src={thumbnail}
              alt={provider}
            />
          </AspectRatio>
          <HeartIcon className="absolute top-2 right-2 z-[5] bg-black bg-opacity-50 rounded-full text-white p-1 text-2xl cursor-pointer" />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <span className="text-primary-500  underline cursor-pointer">
            {provider}
          </span>
          <span className="text-black text-sm md:text-lg lg:text-xl">
            <EllipsisText maxLines={2}>{title}</EllipsisText>
          </span>
          {/* <Rate allowHalf rating={serviceClass} />
        <div className="flex gap-2">
        </div> */}

          <p>
            <EllipsisText maxLines={2}>{description}</EllipsisText>
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-2 items-end">
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
              <span className="whitespace-nowrap">
                {reviews} {t("reviews")}
              </span>
            </div>
            <span className="bg-primary p-1 text-xl rounded-lg text-white">
              {rate}
            </span>
          </div>
          {/* <Button className="whitespace-nowrap" onClick={handleShowPrices}>
          {t("Show prices")}
        </Button> */}
          <div className="flex gap-1 items-end flex-col h-full">
            <span className="text-primary-500 underline cursor-pointer">
              {t("Show on map")}
            </span>
            <PriceDisplay
              className="text-lg font-bold"
              priceObject={{ amount: totalPrice }}
            />
            <span className="whitespace-nowrap flex gap-1">
              <PriceDisplay priceObject={{ amount: pricePerNight }} />{" "}
              {t("per night")}
            </span>
            {taxesAndFeesIncluded ? (
              <span className="whitespace-nowrap">
                {t("includes taxes & fees")}
              </span>
            ) : null}
            <span className="whitespace-nowrap font-semibold">
              {new Date(date.from).toLocaleDateString("en-us", {
                month: "short",
                day: "numeric",
              })}{" "}
              {"-"}{" "}
              {new Date(date.to).toLocaleDateString("en-us", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    );
  };
