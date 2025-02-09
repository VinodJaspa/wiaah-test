import { LocationAddress } from "@features/Services/components/DataDisplay/LocationAddress/LocationAddress";
import {
  AspectRatio,
  Avatar,
  LocationIcon,
  PriceDisplay,
  Rate,
  SlimRightArrow,
  UnDiscountedPriceDisplay,
  VerifiedIcon,
} from "@UI";
import { Location } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
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
  return (
    <div className="flex flex-col w-full">
      <AspectRatio className="rounded-2xl overflow-hidden" ratio={1}>
        <div className="bg-primary px-8  text-white absolute top-4 origin-center -left-8 -rotate-45">
          <p>
            {discount}% {t("OFF")}
          </p>
        </div>
        <img
          src={thumbnail}
          className="w-full h-full object-cover"
          alt={title}
        />
        <div className="absolute top-4 right-4 rounded-lg bg-white text-primary px-4 py-2">
          {label}
        </div>
        <div
          style={{
            backdropFilter: "blur(5px)",
          }}
          className="flex items-center justify-between px-5 absolute bg-black text-white bg-opacity-10 w-full h-[18%] bottom-0 left-0"
        >
          <div className="flex gap-2 items-center">
            <Avatar
              src={sellerInfo.thumbnail}
              className={"-translate-y-1/4 rounded-full border-2 border-white"}
            />
            <div>
              <p className="font-bold text-xs">{sellerInfo.name}</p>
              <div className="flex items-center gap-1">
                <p className="font-normal text-[0.563rem]">
                  {sellerInfo.profession}
                </p>
                {sellerInfo.verified ? (
                  <VerifiedIcon className="text-[0.563rem]" />
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex text-sm font-extrabold gap-1 items-center">
            {typeof price === "number" ? (
              <div className="flex flex-col items-end">
                <PriceDisplay price={price} />
                <UnDiscountedPriceDisplay
                  className="text-xs"
                  amount={price}
                  discount={discount}
                />
              </div>
            ) : Array.isArray(price) ? (
              <div className="flex flex-col items-end">
                <div className="flex gap-1 items-center">
                  <PriceDisplay price={price[0]} /> -{" "}
                  <PriceDisplay price={price[1]} />
                </div>
                <div className="flex gap-1 text-xs items-center">
                  <UnDiscountedPriceDisplay
                    amount={price[0]}
                    discount={discount}
                  />{" "}
                  -{" "}
                  <UnDiscountedPriceDisplay
                    amount={price[1]}
                    discount={discount}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </AspectRatio>
      <div className="py-4 flex flex-col gap-3">
        <p className="font-bold text-sm text-lightBlack">{title}</p>
        <div className="flex gap-1 items-center justify-between">
          <div className="flex gap-1 text-xs text-iconGray">
            <LocationIcon className="text-primary text-base w-6" />
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
          <p className="underline whitespace-nowrap text-primary">
            {t("Show on map")}
          </p>
        </div>
        <div className="flex justify-between gap-2">
          <div
            onClick={() => onView && onView()}
            className="cursor-pointer flex text-primary gap-2 items-end"
          >
            <p className="font-extrabold text-base">{t("View")}</p>
            <SlimRightArrow className="text-xl" />
          </div>
          <div className="flex items-center gap-1">
            <Rate className="text-sm gap-[0.25rem]" rating={rating} />
            <p className="text-[0.5rem] font-semibold text-lightBlack whitespace-nowrap">{`(${reviews} ${t(
              "Reviews",
            )})`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
