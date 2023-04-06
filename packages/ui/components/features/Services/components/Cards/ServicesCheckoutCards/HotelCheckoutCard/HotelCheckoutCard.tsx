import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  EditNoteIcon,
  HStack,
  HeartIcon,
  Image,
  LocationOnPointIcon,
  PriceDisplay,
  TrashIcon,
} from "@partials";
import { ServiceCancelationPolicy, ServiceType } from "@features/API";
import { mapArray } from "@UI/../utils/src";
import { ServicePropertiesSwticher } from "@features/Services/components/Switchers";
import { ServiceRefundableTypeDescription } from "@features/Services/components/DataDisplay";

export interface HotelCheckoutCardProps {
  thumbnail: string;
  name: string;
  shopName: string;
  fullAddress: string;
  amenities: { slug: string; label: string }[];
  cancelationPolicy: ServiceCancelationPolicy;
  extras: { name: string; cost: number }[];
  guests: { adults: number; childrens: number };
  checkin: Date;
  checkout: Date;
  total: number;
  serviceType: ServiceType;
  doctors?: { name: string; speciality: string; price: number }[];
  treatments?: { name: string; price: number }[];
  menus?: {
    name: string;
    dishs: { name: string; price: number; qty: number }[];
  }[];
}

export const ServiceCheckoutCard: React.FC<HotelCheckoutCardProps> = ({
  amenities,
  cancelationPolicy,
  extras,
  fullAddress,
  name,
  shopName,
  thumbnail,
  checkin,
  checkout,
  guests,
  total,
  serviceType,
}) => {
  const { t } = useTranslation();

  const showOn = (types: ServiceType[]) => types.includes(serviceType);

  return (
    <div className="flex font-inter flex-col gap-6 w-full pb-2">
      <div className="flex gap-3">
        <Image
          src={thumbnail}
          className="rounded-[0.625rem] h-[10.375rem] object-cover w-[13.75rem]"
        />
        <div className="flex flex-col gap-2">
          <p className="font-bold text-2xl">
            {showOn([
              ServiceType.Hotel,
              ServiceType.BeautyCenter,
              ServiceType.Restaurant,
              ServiceType.HolidayRentals,
              ServiceType.HealthCenter,
            ])
              ? shopName
              : null}
            {showOn([ServiceType.Vehicle]) ? name : null}
          </p>
          <HStack className="flex text-xl gap-1">
            <LocationOnPointIcon />
            <p className="text-[#525252] text-xs">{fullAddress}</p>
          </HStack>
          <div className="flex flex-wrap text-2xl gap-4">
            {mapArray(amenities, (v, i) => (
              <HStack className="flex-wrap">
                <ServicePropertiesSwticher key={i} slug={v?.slug} />
                <p className="text-lg font-medium">{v.label}</p>
              </HStack>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full gap-2">
        <p className="text-[1.375rem] font-semibold">
          {t("Cancelation Policy")}
        </p>

        <ServiceRefundableTypeDescription
          bookedDate={checkin}
          cost={cancelationPolicy?.cost}
          duration={cancelationPolicy?.duration}
          displayCost
        />
      </div>

      {showOn([ServiceType.Hotel]) ? (
        <div className="flex flex-col w-full gap-2">
          <p className="text-[22px] font-semibold">{t("Extras")}:</p>
          {mapArray(extras, (v, i) => (
            <HStack className="justify-between">
              <p className="font-medium">{v?.name}</p>
              <span className="font-bold text-xl">
                <PriceDisplay price={v?.cost} />
              </span>
            </HStack>
          ))}
        </div>
      ) : null}

      {showOn([ServiceType.Hotel]) ? (
        <div className="flex flex-col w-full gap-2">
          <p className="text-[22px] font-semibold">{t("Guests")}:</p>
          <HStack className="font-medium">
            <p>
              {guests?.adults || 0} {t("Adults")}
            </p>
            <p>
              {guests?.childrens || 0} {t("Childrens")}
            </p>
          </HStack>
        </div>
      ) : null}

      {showOn([ServiceType.Hotel]) ? (
        <div className="flex flex-col w-full gap-2">
          <p className="text-[22px] font-semibold">{t("You are booking")}:</p>
          <p>{name}</p>
        </div>
      ) : null}
      <div className="pt-2 flex flex-col w-full gap-4">
        <p className="text-[22px] font-semibold">{t("Booking details")}:</p>

        <div className="flex justify-between">
          <div className="flex flex-col gap-4">
            <p className="font-semibold text-[19px] border-b-2 border-black w-fit pb-2">
              {showOn([ServiceType.Hotel]) ? t("Check in") : null}
              {showOn([ServiceType.Vehicle]) ? t("Rental starts") : null}
            </p>
            <p className="font-medium">
              {new Date(checkin).toLocaleDateString("en-us", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
            <p className="">
              {t("From")}{" "}
              <span className="font-bold">
                {new Date(checkin).toLocaleTimeString("en-us", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </span>
            </p>
            {showOn([ServiceType.Hotel]) ? (
              <p className="font-medium">
                {t("Guests")}:{" "}
                <span className="">
                  {Object.values(guests).reduce((acc, curr) => {
                    return acc + curr;
                  }, 0)}
                </span>
              </p>
            ) : null}
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-semibold text-[19px] border-b-2 w-fit border-black pb-2">
              {showOn([ServiceType.Hotel]) ? t("Check out") : null}
              {showOn([ServiceType.Vehicle]) ? t("Rental ends") : null}
            </p>
            <p className="font-medium">
              {new Date(checkout).toLocaleDateString("en-us", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
            <p className="">
              {t("Until")}{" "}
              <span className="font-bold">
                {new Date(checkout).toLocaleTimeString("en-us", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </span>
            </p>

            {showOn([ServiceType.Hotel]) ? (
              <p className="font-medium">
                {t("Nights")}:{" "}
                <span className="font-bold">
                  {new Date(checkout).getDate() - new Date(checkin).getDate()}
                </span>
              </p>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <HStack className="justify-end text-[1.75rem] font-bold">
          <PriceDisplay price={total} />
        </HStack>
        <div className="flex justify-between w-full gap-4 items-center">
          <Button className="h-[3.25rem]" colorScheme="darkbrown">
            <HStack className="text-lg whitespace-nowrap font-semibold">
              <EditNoteIcon />
              {t("Modify booking")}
            </HStack>
          </Button>
          <Button className="h-[3.25rem]" colorScheme="darkbrown" outline>
            <HStack className="font-semibold text-lg">
              <HeartIcon />
              {t("Add to wishlist")}
            </HStack>
          </Button>
          <Button
            colorScheme="danger"
            center
            className="px-5 text-2xl py-[0.875rem]"
          >
            <TrashIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};
