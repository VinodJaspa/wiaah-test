import { mapArray } from "@UI/../utils/src";
import { ServiceCancelationPolicy, ServiceType } from "@features/API";
import {
  AspectRatio,
  Button,
  DotIcon,
  EditAltIcon,
  HStack,
  Image,
  LocationOnPointIcon,
  PriceDisplay,
  TrashIcon,
} from "@partials";
import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { ServicePropertiesSwticher } from "../Switchers";
import { ServiceRefundableTypeDescription } from "../DataDisplay";
import { startCase } from "lodash";

export interface MyServiceResponsiveCardProps {
  children?: ReactNode;
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
}

export const MyServiceResponsiveCard: React.FC<
  MyServiceResponsiveCardProps
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
}) => {
  const { t } = useTranslation();

    const showOn = (types: ServiceType[]) => types.includes(serviceType);
    return (
      <div className="flex font-inter flex-col gap-4 w-full pb-2">
        <div className="flex flex-col gap-3">
          <AspectRatio ratio={2}>
            <Image
              src={thumbnail}
              className="rounded-[0.625rem] object-cover w-full h-full"
            />
            <p className="bg-darkBrown text-white rounded absolute top-1 right-1">
              {startCase(serviceType)}
            </p>
          </AspectRatio>
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
            <p className="font-semibold">{t("Extras")}:</p>
            {mapArray(extras, (v, i) => (
              <HStack className="justify-between">
                <HStack>
                  <DotIcon className="w-1 h-1" />
                  <p className="font-medium text-sm">{v?.name}</p>
                </HStack>
                <span className="font-bold text-xl">
                  <PriceDisplay price={v?.cost} />
                </span>
              </HStack>
            ))}
          </div>
        ) : null}

        <div className="flex flex-col gap-4 w-full">
          <HStack className="justify-end text-[1.75rem] font-bold">
            <PriceDisplay price={total} />
          </HStack>
          <div className="flex font-medium w-full gap-6 items-center">
            <Button colorScheme="danger" className="w-full">
              <HStack>
                <TrashIcon className="text-2xl" />
                <p>{t("Delete service")}</p>
              </HStack>
            </Button>
            <Button className="w-full" colorScheme="darkbrown">
              <HStack>
                <EditAltIcon className="text-2xl" />
                <p>{t("Edit service")}</p>
              </HStack>
            </Button>
          </div>
        </div>
      </div>
    );
  };
