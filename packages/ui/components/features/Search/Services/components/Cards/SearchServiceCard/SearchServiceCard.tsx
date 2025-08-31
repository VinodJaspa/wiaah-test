import { LocationAddress } from "@features/Services/components/DataDisplay/LocationAddress/LocationAddress";
import {
  AspectRatio,
  Avatar,
  LocationIcon,
  PriceDisplay,
  ServicesRequestKeys,
  UnDiscountedPriceDisplay,
  VerifiedIcon,
} from "@UI";
import ImageTopbadge from "@UI/components/shadcn-components/components/imageTopbadge";
import { Location } from "api";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { ServicesType } from "types";

export interface SearchServiceCardProps {
  onView?: () => {};
  serviceType: ServicesType;
  serviceData: {
    rating: number;
    price: number | [number, number];
    discount: number;
    title: string;
    location: Location;
    thumbnail: string;
    label: string;
    reviews: number;
    id: string;
  };
  sellerInfo: {
    id?: string;
    name: string;
    profession: string;
    thumbnail: string;
    verified: boolean;
  };
}

export const SearchServiceCard: React.FC<SearchServiceCardProps> = ({
  sellerInfo,
  serviceData,
  serviceType,
  onView,
}) => {
  const { t } = useTranslation();
  const {
    id,
    location,
    price,
    rating,
    title,
    thumbnail,
    label,
    discount,
    reviews,
  } = serviceData;
  const router = useRouter();
  const { visit } = useRouting();

  return (
    <div
      onClick={() => router.push(`/service/details/${serviceType}/${id}`)}
      className="flex flex-col w-full cursor-pointer rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
    >
      {/* Thumbnail + Badge + Seller Info */}
      <AspectRatio className="relative" ratio={1}>
        {discount ? (
          <ImageTopbadge text={`${discount}% ${t("OFF")}`} />
        ) : null}

        <img
          src={thumbnail}
          className="w-full h-full object-cover"
          alt={title}
        />

        {/* Seller & Price Bar */}
        <div
          style={{ backdropFilter: "blur(5px)" }}
          className="absolute bottom-0 left-0 w-full h-[22%] bg-black/40 flex items-center justify-between px-2 sm:px-3"
        >
          {/* Seller */}
          <Link
            href={`/profile/${sellerInfo.id}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 flex-shrink-0"
          >
            <Avatar
              src={sellerInfo.thumbnail}
              className="rounded-full border-2 border-white w-7 h-7 sm:w-8 sm:h-8"
            />
            <div className="flex items-center gap-1">
              <p className="font-bold text-[0.7rem] sm:text-xs truncate max-w-[90px] text-white">
                {sellerInfo.name}
              </p>
              {sellerInfo.verified && (
                <VerifiedIcon className="text-[0.55rem] sm:text-[0.6rem]" />
              )}
            </div>
          </Link>

          {/* Price */}
          <div className="flex text-xs sm:text-sm gap-1 items-center">
            {typeof price === "number" ? (
              <div className="flex flex-col text-right">
                <p className="text-[0.65rem] sm:text-xs opacity-80 text-white">
                  {t("Price by Night")}
                </p>
                <div className="flex items-center gap-1">
                  <UnDiscountedPriceDisplay
                    className="text-[0.65rem] sm:text-xs text-red-500"
                    amount={price}
                    discount={discount}
                  />
                  <PriceDisplay
                    price={price}
                    className="font-semibold text-[0.7rem] sm:text-sm text-white"
                  />
                </div>
              </div>
            ) : Array.isArray(price) ? (
              <div className="flex flex-col text-right">
                {serviceType === "vehicle" && (
                  <p className="text-[0.65rem] sm:text-xs opacity-80">
                    {t("Price by Day")}
                  </p>
                )}
                <div className="flex items-center gap-1">
                  <UnDiscountedPriceDisplay
                    className="text-[0.65rem] sm:text-xs text-red-500"
                    amount={price[0]}
                    discount={discount}
                  />
                  <PriceDisplay
                    price={price[0]}
                    className="font-semibold text-[0.7rem] sm:text-sm"
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </AspectRatio>

      {/* Content */}
      <div className="py-3 sm:py-4 flex flex-col gap-2 sm:gap-3">
        {/* Title */}
        <p className="font-bold text-sm sm:text-base text-lightBlack line-clamp-2">
          {title}
        </p>

        {/* Location + Map Link */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
          <div className="flex items-start sm:items-center gap-1 text-[0.7rem] sm:text-xs text-iconGray">
            <LocationIcon className="text-primary text-sm sm:text-base flex-shrink-0" />
            <LocationAddress
              location={{
                city: location.city,
                lat: location.lat,
                lon: location.lon,
                address: location.address,
                state: location.state || "",
                country: location.country,
                postalCode: location.postalCode,
              }}
            />
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              visit((routes) =>
                routes.visitServiceOnMap(location, ServicesRequestKeys.hotels)
              );
            }}
            className="text-[0.7rem] sm:text-xs underline text-primary self-start sm:self-auto"
          >
            {t("Show on map")}
          </button>
        </div>
      </div>
    </div>
  );
};

