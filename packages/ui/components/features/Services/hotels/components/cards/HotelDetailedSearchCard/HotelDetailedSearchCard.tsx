import { FilteredHotelsMetaDataType, LocationCords } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { AspectRatio, HeartIcon, PriceDisplay, EllipsisText } from "ui";

export interface HotelDetailedSearchCardProps
  extends FilteredHotelsMetaDataType {
  onShowOnMap?: (id: string, cords?: LocationCords) => any;
  vertical?: boolean;
}

export const HotelDetailedSearchCard: React.FC<
  HotelDetailedSearchCardProps
> = ({
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
  location,
  onShowOnMap,
  vertical,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={`${
        vertical ? "flex-col" : "flex-row"
      } flex gap-4 border-2 border-gray-300 p-2 rounded-lg`}
    >
      <div className="relative w-[min(100%,30rem)]">
        <AspectRatio ratio={4 / 5}>
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
        <span className="text-black text-sm md:text-lg">
          <EllipsisText maxLines={2}>{title}</EllipsisText>
        </span>
        <p>
          <EllipsisText maxLines={3}>{description}</EllipsisText>
        </p>
      </div>
      <div
        className={`${
          vertical ? "flex-row-reverse" : "flex-col items-end"
        } flex justify-between h-auto gap-2`}
      >
        <div className={`${vertical ? "" : "items-end"} flex gap-2`}>
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
          <span className="bg-primary h-fit p-1 text-xl rounded-lg text-white">
            {rate}
          </span>
        </div>
        {/* <Button className="whitespace-nowrap" onClick={handleShowPrices}>
          {t("Show prices")}
        </Button> */}
        <div
          className={`${
            vertical ? "items-start" : "items-end"
          } flex gap-1 flex-col`}
        >
          <span
            onClick={() => onShowOnMap && onShowOnMap(id, location)}
            className="text-primary-500 underline cursor-pointer"
          >
            {t("Show on map")}
          </span>
          <div className="flex gap-2">
            <PriceDisplay
              className="text-md font-bold"
              priceObject={{ amount: totalPrice }}
            />
            <span className="whitespace-nowrap flex gap-1">
              <PriceDisplay priceObject={{ amount: pricePerNight }} />/
              {t("night")}
            </span>
          </div>
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
