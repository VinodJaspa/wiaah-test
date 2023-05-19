import { mapArray } from "@UI/../utils/src";
import { ServiceCancelationPolicy, ServiceType } from "@features/API";
import {
  AspectRatio,
  Button,
  HStack,
  Image,
  LocationOnPointIcon,
  PriceDisplay,
} from "@partials";
import React from "react";
import { useTranslation } from "react-i18next";
import { ServicePropertiesSwticher } from "../Switchers";
import { ServiceRefundableTypeDescription } from "../DataDisplay";
import {
  RestaurantDishsCheckoutList,
  TreatmentsCheckoutList,
} from "./ServicesCheckoutCards";

export enum ServiceBookingCardVariant {
  buyer = "buyer",
  seller = "seller",
}

export interface ServicePendingAppointmentCardProps {
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
  doctors?: {
    thumbnail: string;
    name: string;
    speciality: string;
    price: number;
  }[];
  treatments?: {
    name: string;
    price: number;
    thumbnail: string;
    qty: number;
  }[];
  menus?: {
    name: string;
    dishs: {
      name: string;
      price: number;
      qty: number;
      ingredints: string[];
      thumbnail: string;
    }[];
  }[];
  variant: ServiceBookingCardVariant;
}

export const ServicePendingAppointmentCard: React.FC<
  ServicePendingAppointmentCardProps
> = ({
  amenities,
  cancelationPolicy,
  checkin,
  checkout,
  extras,
  fullAddress,
  guests,
  name,
  serviceType,
  shopName,
  thumbnail,
  total,
  children,
  doctors,
  menus,
  treatments,
  variant,
}) => {
  const { t } = useTranslation();

  const showOn = (types: ServiceType[]) => types.includes(serviceType);
  return (
    <div className="flex font-inter flex-col gap-4 w-full pb-2">
      <div className="flex flex-col gap-3">
        <AspectRatio ratio={0.48}>
          <Image
            src={thumbnail}
            className="rounded-[0.625rem] object-cover w-full h-full"
          />
        </AspectRatio>
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-lg">
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
            <LocationOnPointIcon className="text-base" />
            <p className="text-[#525252] text-xs">{fullAddress}</p>
          </HStack>
          {showOn([ServiceType.Hotel, ServiceType.Vehicle]) ? (
            <div className="flex flex-wrap gap-2">
              {mapArray(amenities, (v, i) => (
                <HStack className="flex-wrap">
                  <ServicePropertiesSwticher key={i} slug={v?.slug} />
                  <p className="text-[0.8125rem]">{v.label}</p>
                </HStack>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col w-full gap-2">
        <p className="font-semibold">{t("Cancelation Policy")}</p>

        <div className="text-sm">
          <ServiceRefundableTypeDescription
            bookedDate={checkin}
            cost={cancelationPolicy?.cost}
            duration={cancelationPolicy?.duration}
            displayCost
          />
        </div>
      </div>

      {showOn([ServiceType.Hotel]) ? (
        <div className="flex flex-col w-full gap-2">
          <p className="font-semibold">{t("Extras")}:</p>
          {mapArray(extras, (v, i) => (
            <HStack className="justify-between">
              <p className="font-medium text-sm">{v?.name}</p>
              <span className="font-bold text-xl">
                <PriceDisplay price={v?.cost} />
              </span>
            </HStack>
          ))}
        </div>
      ) : null}

      {showOn([ServiceType.Hotel]) ? (
        <div className="flex flex-col w-full gap-2">
          <p className="font-semibold">{t("Guests")}:</p>
          <HStack className="font-medium text-sm">
            <p>
              {guests?.adults || 0} {t("Adults")}
            </p>
            <p>
              {guests?.childrens || 0} {t("Childrens")}
            </p>
          </HStack>
        </div>
      ) : null}

      {showOn([
        ServiceType.Hotel,
        ServiceType.BeautyCenter,
        ServiceType.HealthCenter,
        ServiceType.Restaurant,
      ]) ? (
        <div className="flex flex-col w-full gap-2">
          <p className="font-semibold">{t("Booking Item")}:</p>
          {showOn([ServiceType.Hotel]) ? (
            <p className="text-sm">{name}</p>
          ) : null}

          {showOn([ServiceType.BeautyCenter]) ? (
            <TreatmentsCheckoutList treatments={treatments || []} />
          ) : null}

          {showOn([ServiceType.HealthCenter]) ? (
            <div className="flex flex-col gap-2 mt-2">
              <p className="font-medium">{t("Dcotors")}</p>
              {mapArray(doctors, (v, i) => (
                <div className="flex justify-between gap-8">
                  <div className="flex gap-4">
                    <Image src={v.thumbnail} className="w-[4.563rem] h-16" />
                    <div className="font-semibold text-lg flex flex-col gap-2">
                      <p>{v.name}</p>
                      <p>{v.speciality}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-xl font-semibold">
                    <PriceDisplay price={v.price}></PriceDisplay>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {showOn([ServiceType.Restaurant]) ? (
            <RestaurantDishsCheckoutList menus={menus || []} />
          ) : null}
        </div>
      ) : null}
      <div className="pt-2 flex flex-col w-full gap-4">
        <p className="font-semibold">{t("Booking details")}:</p>

        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <p className="font-bold text-[0.9375rem] border-b-2 border-black w-fit pb-2">
              {showOn([
                ServiceType.Hotel,
                ServiceType.BeautyCenter,
                ServiceType.Restaurant,
              ])
                ? t("Check in")
                : null}
              {showOn([ServiceType.Vehicle]) ? t("Rental starts") : null}
              {showOn([ServiceType.HealthCenter])
                ? t("Consultation starts")
                : null}
            </p>
            <p className="font-medium">
              {checkin
                ? new Date(checkin).toLocaleDateString("en-us", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : null}
            </p>
            <p className="text-sm font-bold">
              {checkin
                ? new Date(checkin).toLocaleTimeString("en-us", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })
                : null}
            </p>
            {showOn([ServiceType.Hotel]) ? (
              <p className="font-bold text-sm">
                {t("Guests")}:{" "}
                <span className="">
                  {typeof guests === "object"
                    ? Object.values(guests).reduce((acc, curr) => {
                        return acc + curr;
                      }, 0)
                    : null}
                </span>
              </p>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold text-[0.9375] border-b-2 w-fit border-black pb-2">
              {showOn([ServiceType.Hotel]) ? t("Check out") : null}
              {showOn([ServiceType.Vehicle]) ? t("Rental ends") : null}
            </p>
            {showOn([ServiceType.Hotel]) ? (
              <p className="font-medium text-sm">
                {checkout
                  ? new Date(checkout).toLocaleDateString("en-us", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : null}
              </p>
            ) : null}

            {showOn([ServiceType.Hotel]) ? (
              <p className="text-sm font-semibold">
                {t("Until")}{" "}
                <span className="font-bold">
                  {checkout
                    ? new Date(checkout).toLocaleTimeString("en-us", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })
                    : null}
                </span>
              </p>
            ) : null}

            {showOn([ServiceType.Hotel]) ? (
              <p className="font-bold text-sm">
                {t("Nights")}:{" "}
                <span className="font-bold">
                  {checkout
                    ? new Date(checkout).getDate() - new Date(checkin).getDate()
                    : null}
                </span>
              </p>
            ) : null}
          </div>
        </div>
      </div>
      {variant === ServiceBookingCardVariant.buyer ? (
        <HStack className="justify-between">
          <PriceDisplay className="text-2xl font-bold" price={total} />
          <Button colorScheme="danger" className="font-medium">
            {t("Cancel the booking")}
          </Button>
        </HStack>
      ) : (
        <div className="flex flex-col gap-4 w-full">
          <HStack className="justify-end text-[1.375rem] font-bold">
            <PriceDisplay price={total} />
          </HStack>
          <div className="flex font-medium w-full gap-6 items-center">
            <Button className="w-full" colorScheme="darkbrown">
              {t("Approve")}
            </Button>
            <Button colorScheme="danger" className="w-full">
              {t("Refuse")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
