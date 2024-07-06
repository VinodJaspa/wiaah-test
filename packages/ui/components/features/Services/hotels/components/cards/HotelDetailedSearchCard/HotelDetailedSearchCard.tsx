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
} from "@UI";

export interface HotelDetailedSearchCardProps {
  onShowOnMap?: (id: string, cords?: LocationCords) => any;
  vertical?: boolean;
  minimal?: boolean;
  description: string;
  sellerName: string;
  rate: number;
  reviews: number;
  name: string;
  thumbnail: string;
  price: number;
  location: {
    address: string;
    city: string;
    country: string;
    state: string;
    cords: {
      lat: number;
      lng: number;
    };
  };
  id: string;
  taxesAndFeesIncluded: boolean;
  children?: React.ReactNode;
}

export const HotelDetailedSearchCard: React.FC<HotelDetailedSearchCardProps> = (
  props
) => {
  const {
    description,
    rate,
    thumbnail,
    reviews = 0,
    id,
    location,
    onShowOnMap,
    vertical,
    minimal,
    children,
    name,
    price,
    sellerName,
    taxesAndFeesIncluded,
  } = props;
  const { t } = useTranslation();

  return (
    <div
      className={`${vertical ? "flex-col" : "flex-row"
        } flex gap-4 border-2 bg-white border-gray-300 p-2 rounded-lg`}
    >
      <div className="relative w-[min(100%,30rem)]">
        <AspectRatioImage src={thumbnail} alt={name} ratio={1} />
        {minimal ? null : (
          <HeartIcon className="absolute top-2 right-2 z-[5] bg-black bg-opacity-50 rounded-full text-white p-1 text-2xl cursor-pointer" />
        )}
      </div>
      <div className="flex flex-col gap-2 w-full">
        <span className="text-primary-500  underline cursor-pointer">
          {sellerName}
        </span>
        {minimal ? (
          <p>
            {location.address}, {location.city}, {location.state}
          </p>
        ) : (
          <>
            <span className="text-black text-sm md:text-lg">
              <p>{name}</p>
            </span>
            <p>{description}</p>
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
          className={`${vertical ? "flex-row-reverse" : "flex-col items-end"
            } flex justify-between h-auto gap-2`}
        >
          <div className={`${vertical ? "" : "items-end"} flex gap-2`}>
            <div className="flex flex-col">
              <RateTextPresentation rate={rate} />
              <span className="whitespace-nowrap">
                {reviews} {t("reviews")}
              </span>
            </div>
            <span className="bg-primary w-10 h-10 flex justify-center items-center text-xl rounded-lg text-white">
              {rate}
            </span>
          </div>
          <>{children}</>
          <div
            className={`${vertical ? "items-start" : "items-end"
              } flex gap-1 flex-col`}
          >
            <span
              onClick={() => onShowOnMap && onShowOnMap(id, location.cords)}
              className="text-primary-500 underline cursor-pointer"
            >
              {t("Show on map")}
            </span>
            <div className="flex gap-2">
              <span className="whitespace-nowrap flex gap-1">
                <PriceDisplay priceObject={{ amount: price }} />/{t("night")}
              </span>
            </div>
            {taxesAndFeesIncluded ? (
              <span className="whitespace-nowrap">
                {t("includes taxes & fees")}
              </span>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};
