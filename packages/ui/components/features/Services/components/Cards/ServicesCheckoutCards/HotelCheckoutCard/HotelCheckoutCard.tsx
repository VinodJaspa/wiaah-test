import { ServiceCancelationPolicy, ServiceType } from "@features/API";
import { ServiceRefundableTypeDescription } from "@features/Services/components/DataDisplay";
import { ServicePropertiesSwticher } from "@features/Services/components/Switchers";
import {
  Button,
  Divider,
  EditNoteIcon,
  HStack,
  Image,
  LocationOnPointIcon,
  PriceDisplay,
  TrashIcon,
} from "@partials";
import { mapArray } from "@UI/../utils/src";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

export interface ServiceCheckoutCardProps {
  id: string;
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

export const ServiceCheckoutCard: React.FC<ServiceCheckoutCardProps> = ({
  id,
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
  doctors,
  menus,
  treatments,
}) => {
  const [mounted, setMounted] = React.useState(false);

const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const showOn = (types: ServiceType[]) => types.includes(serviceType);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  if (!mounted) {
    return null;
  }

  return (
    <React.Fragment>
      <div className="flex font-inter flex-col gap-4 w-full pb-2">
        <div className="flex gap-3 relative overflow-hidden">
          <span className="absolute top-0 left-0 font-semibold bg-red-500 px-3 py-2 rounded-tl-[0.625rem] rounded-br-[0.625rem] text-white">
            5% CASHBACK
          </span>
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

        {showOn([ServiceType.Hotel, ServiceType.HolidayRentals]) ? (
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

        {showOn([ServiceType.Hotel, ServiceType.HolidayRentals]) ? (
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

        {showOn([
          ServiceType.Hotel,
          ServiceType.HolidayRentals,
          ServiceType.BeautyCenter,
          ServiceType.HealthCenter,
          ServiceType.Restaurant,
        ]) ? (
          <div className="flex flex-col w-full gap-2">
            <p className="text-[22px] font-semibold">{t("You are booking")}:</p>
            {showOn([ServiceType.Hotel, ServiceType.HolidayRentals]) ? (
              <p>{name}</p>
            ) : null}

            {showOn([ServiceType.BeautyCenter]) ? (
              <TreatmentsCheckoutList
                treatments={treatments || []}
              ></TreatmentsCheckoutList>
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
          <p className="text-[22px] font-semibold">{t("Booking details")}:</p>

          <div className="flex justify-between">
            <div className="flex flex-col gap-4">
              <p className="font-semibold text-[19px] border-b-2 border-black w-fit pb-2">
                {showOn([
                  ServiceType.Hotel,
                  ServiceType.HolidayRentals,
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
              <p className="font-medium">{formatDate(new Date(checkin))}</p>
              <p>
                {t("From")}{" "}
                <span className="font-bold">
                  {formatTime(new Date(checkin))}
                </span>
              </p>
              {showOn([ServiceType.Hotel, ServiceType.HolidayRentals]) ? (
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
                {showOn([ServiceType.Hotel, ServiceType.HolidayRentals])
                  ? t("Check out")
                  : null}
                {showOn([ServiceType.Vehicle]) ? t("Rental ends") : null}
              </p>
              {showOn([ServiceType.Hotel, ServiceType.HolidayRentals]) ? (
                <p className="font-medium">
                  {new Date(checkout).toLocaleDateString("en-us", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              ) : null}
              {showOn([ServiceType.Vehicle]) ? (
                <p className="font-medium">
                  {new Date(checkout).toLocaleDateString("en-us", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              ) : null}

              {showOn([ServiceType.Vehicle]) ? (
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
              ) : null}

              {showOn([ServiceType.Hotel, ServiceType.HolidayRentals]) ? (
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
        <div className="flex flex-col justify-between w-full">
          <HStack className="justify-end text-[1.75rem] font-bold">
            <PriceDisplay price={total} />
          </HStack>
          <div className="flex justify-end gap-4 w-full items-center">
            <Button className="h-[3.25rem] w-fit" colorScheme="darkbrown">
              <Link href={`/service/details/${serviceType}/${id}?tabIndex=4`}>
                <HStack className="text-lg whitespace-nowrap font-semibold">
                  <EditNoteIcon />
                  {t("Modify Booking")}
                </HStack>
              </Link>
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
      <Divider className="border-black my-3" />
    </React.Fragment>
  );
};

export const TreatmentsCheckoutList: React.FC<{
  treatments: {
    thumbnail: string;
    price: number;
    name: string;
    qty: number;
  }[];
}> = ({ treatments }) => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  return (
    <div className="flex flex-col gap-2 mt-2">
      <p className="font-medium">{t("Treatments")}</p>
      {mapArray(treatments, (v, i) => (
        <div className="flex justify-between gap-8">
          <div className="flex gap-4">
            <Image src={v.thumbnail} className="w-[4.563rem] h-16" />
            <p className="font-semibold text-lg">{v.name}</p>
          </div>
          <div className="flex whitespace-nowrap gap-1 items-center text-xl font-semibold">
            <PriceDisplay price={v.price}></PriceDisplay>
            <p className="flex items-center"> x {v.qty}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export const RestaurantDishsCheckoutList: React.FC<{
  menus: {
    name: string;
    dishs: {
      thumbnail: string;
      name: string;
      ingredints: string[];
      price: number;
      qty: number;
    }[];
  }[];
}> = ({ menus }) => {
  return (
    <div className="flex flex-col gap-6 mt-2">
      {mapArray(menus, (v, i) => (
        <div className="flex flex-col gap-4 w-full">
          <p className="font-semibold text-lg">{v.name}</p>
          {mapArray(v.dishs, (v, i) => (
            <div key={i} className="flex justify-between items-center gap-8">
              <div className="flex gap-4">
                <Image src={v.thumbnail} className="w-[4.563rem] h-16" />
                <div className="font-semibold text-lg flex flex-col">
                  <p>{v.name}</p>
                  <p className="font-medium text-sm text-[#868686]">
                    {v.ingredints.join(", ")}
                  </p>
                </div>
              </div>
              <p className="font-semibold text-xl">X{v.qty}</p>
              <div className="flex items-center text-xl font-semibold">
                <PriceDisplay price={v.price}></PriceDisplay>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
