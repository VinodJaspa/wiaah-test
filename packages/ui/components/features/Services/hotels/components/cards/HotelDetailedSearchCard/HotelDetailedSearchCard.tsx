import { FilteredHotelsMetaDataType, LocationCords } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  HeartIcon,
  PriceDisplay,
  EllipsisText,
  Rate,
  AspectRatioImage,
  RateTextPresentation,
} from "ui";

export interface HotelDetailedSearchCardProps
  extends FilteredHotelsMetaDataType {
  onShowOnMap?: (id: string, cords?: LocationCords) => any;
  vertical?: boolean;
  minimal?: boolean;
}

export const HotelDetailedSearchCard: React.FC<HotelDetailedSearchCardProps> = (
  props
) => {
  const {
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
    minimal,
    children,
  } = props;
  const { t } = useTranslation();

  return (
    <div
      className={`${
        vertical ? "flex-col" : "flex-row"
      } flex gap-4 border-2 bg-white border-gray-300 p-2 rounded-lg`}
    >
      <div className="relative w-[min(100%,30rem)]">
        <AspectRatioImage src={thumbnail} alt={title} ratio={1} />
        {minimal ? null : (
          <HeartIcon className="absolute top-2 right-2 z-[5] bg-black bg-opacity-50 rounded-full text-white p-1 text-2xl cursor-pointer" />
        )}
      </div>
      <div className="flex flex-col gap-2 w-full">
        <span className="text-primary-500  underline cursor-pointer">
          {provider}
        </span>
        {minimal ? (
          <p>
            {location.address}, {location.city}, {location.state}
          </p>
        ) : (
          <>
            <span className="text-black text-sm md:text-lg">
              <EllipsisText maxLines={2}>{title}</EllipsisText>
            </span>
            <EllipsisText maxLines={3}>{description}</EllipsisText>
          </>
        )}
      </div>
      {minimal ? (
        <div className="flex justify-between gap-2">
          <Rate rating={rate} />
          <p className="text-right">
            {reviews} {t("reviews")}
          </p>
        </div>
      ) : (
        <div
          className={`${
            vertical ? "flex-row-reverse" : "flex-col items-end"
          } flex justify-between h-auto gap-2`}
        >
          <div className={`${vertical ? "" : "items-end"} flex gap-2`}>
            <div className="flex flex-col">
              <RateTextPresentation rate={rate} />
              <span className="whitespace-nowrap">
                {reviews} {t("reviews")}
              </span>
            </div>
            <span className="bg-primary h-fit p-1 text-xl rounded-lg text-white">
              {rate}
            </span>
          </div>
          {children}
          <div
            className={`${
              vertical ? "items-start" : "items-end"
            } flex gap-1 flex-col`}
          >
            <span
              onClick={() => onShowOnMap && onShowOnMap(id, location.cords)}
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
      )}
    </div>
  );
};
