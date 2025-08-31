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
  const { t } = useTranslation();

  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const showOn = (types: ServiceType[]) => types.includes(serviceType);

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  return (
    <div className="flex flex-col gap-4 w-full font-sans text-sm">
      {/* Thumbnail & Title */}
      <div className="flex gap-3 relative overflow-hidden">
        <span className="absolute top-0 left-0 bg-red-500 px-2 py-1 rounded-tl-md rounded-br-md text-white text-xs font-semibold">
          5% CASHBACK
        </span>
        <Image
          src={thumbnail}
          className="rounded-md h-40 w-56 object-cover"
        />
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-lg">
            {showOn([
              ServiceType.Hotel,
              ServiceType.BeautyCenter,
              ServiceType.Restaurant,
              ServiceType.HolidayRentals,
              ServiceType.HealthCenter,
            ])
              ? shopName
              : name}
          </p>
          <HStack className="flex items-center gap-1">
            <LocationOnPointIcon className="w-4 h-4" />
            <p className="text-gray-500 text-xs">{fullAddress}</p>
          </HStack>
          <div className="flex flex-wrap gap-3 mt-1">
            {mapArray(amenities, (v, i) => (
              <HStack key={i} className="flex items-center gap-1 flex-wrap">
                <ServicePropertiesSwticher slug={v?.slug} />
                <p className="text-xs font-medium">{v.label}</p>
              </HStack>
            ))}
          </div>
        </div>
      </div>

      {/* Cancelation Policy */}
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-sm">{t("Cancelation Policy")}</p>
        <ServiceRefundableTypeDescription
          bookedDate={checkin}
          cost={cancelationPolicy?.cost}
          duration={cancelationPolicy?.duration}
          displayCost
        />
      </div>

      {/* Extras */}
      {showOn([ServiceType.Hotel, ServiceType.HolidayRentals]) && extras.length > 0 && (
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-sm">{t("Extras")}</p>
          {mapArray(extras, (v, i) => (
            <HStack key={i} className="justify-between text-sm">
              <p>{v.name}</p>
              <PriceDisplay price={v.cost} />
            </HStack>
          ))}
        </div>
      )}

      {/* Guests */}
      {showOn([ServiceType.Hotel, ServiceType.HolidayRentals]) && (
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-sm">{t("Guests")}</p>
          <HStack className="gap-2 text-sm">
            <p>{guests.adults} {t("Adults")}</p>
            <p>{guests.childrens} {t("Children")}</p>
          </HStack>
        </div>
      )}

      {/* Booking Info */}
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-sm">{t("You are booking")}:</p>
        {showOn([ServiceType.Hotel, ServiceType.HolidayRentals]) && <p className="text-sm">{name}</p>}
        {showOn([ServiceType.BeautyCenter]) && <TreatmentsCheckoutList treatments={treatments || []} />}
        {showOn([ServiceType.HealthCenter]) && doctors && (
          <div className="flex flex-col gap-1">
            <p className="font-medium text-sm">{t("Doctors")}</p>
            {mapArray(doctors, (v, i) => (
              <HStack key={i} className="justify-between gap-4">
                <HStack className="gap-2">
                  <Image src={v.thumbnail} className="w-14 h-14 rounded-md" />
                  <div className="flex flex-col text-sm gap-0.5 font-medium">
                    <p>{v.name}</p>
                    <p className="text-gray-500 text-xs">{v.speciality}</p>
                  </div>
                </HStack>
                <PriceDisplay price={v.price} />
              </HStack>
            ))}
          </div>
        )}
        {showOn([ServiceType.Restaurant]) && menus && <RestaurantDishsCheckoutList menus={menus} />}
      </div>

      {/* Booking Details */}
      <div className="flex flex-col gap-2 mt-2">
        <p className="font-semibold text-sm">{t("Booking details")}:</p>
        <div className="flex justify-between text-xs">
          <div className="flex flex-col gap-1">
            <p className="font-medium">{showOn([ServiceType.Hotel, ServiceType.HolidayRentals]) ? t("Check in") : t("Start")}</p>
            <p>{formatDate(checkin)}</p>
            <p>{t("From")} <span className="font-semibold">{formatTime(checkin)}</span></p>
          </div>
          <div className="flex flex-col gap-1 text-right">
            <p className="font-medium">{showOn([ServiceType.Hotel, ServiceType.HolidayRentals]) ? t("Check out") : t("End")}</p>
            <p>{formatDate(checkout)}</p>
            <p>{t("Until")} <span className="font-semibold">{formatTime(checkout)}</span></p>
          </div>
        </div>
      </div>

      {/* Total & Actions */}
      <div className="flex justify-between items-center mt-2">
        <PriceDisplay price={total} className="text-lg font-semibold" />
        <div className="flex gap-2">
          <Button colorScheme="darkbrown" className="px-3 py-1 text-xs font-semibold">
            <Link href={`/service/details/${serviceType}/${id}?tabIndex=4`}>
              <HStack className="gap-1">
                <EditNoteIcon className="w-4 h-4" /> {t("Modify Booking")}
              </HStack>
            </Link>
          </Button>
          <Button colorScheme="danger" className="px-3 py-1 text-xs font-semibold">
            <TrashIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Divider className="border-gray-300 my-2" />
    </div>
  );
};

// Child components
export const TreatmentsCheckoutList: React.FC<{
  treatments: { thumbnail: string; price: number; name: string; qty: number }[];
}> = ({ treatments }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-1 mt-1 text-sm">
      <p className="font-medium">{t("Treatments")}</p>
      {mapArray(treatments, (v, i) => (
        <HStack key={i} className="justify-between gap-2">
          <HStack className="gap-2">
            <Image src={v.thumbnail} className="w-14 h-14 rounded-md" />
            <p className="font-medium">{v.name}</p>
          </HStack>
          <p className="font-semibold">{v.qty} x <PriceDisplay price={v.price} /></p>
        </HStack>
      ))}
    </div>
  );
};

export const RestaurantDishsCheckoutList: React.FC<{
  menus: {
    name: string;
    dishs: { thumbnail: string; name: string; ingredints: string[]; price: number; qty: number }[];
  }[];
}> = ({ menus }) => {
  return (
    <div className="flex flex-col gap-2 mt-1 text-sm">
      {mapArray(menus, (menu, i) => (
        <div key={i} className="flex flex-col gap-1">
          <p className="font-medium">{menu.name}</p>
          {mapArray(menu.dishs, (dish, j) => (
            <HStack key={j} className="justify-between gap-2">
              <HStack className="gap-2">
                <Image src={dish.thumbnail} className="w-14 h-14 rounded-md" />
                <div className="flex flex-col text-xs text-gray-600">
                  <p>{dish.name}</p>
                  <p>{dish.ingredints.join(", ")}</p>
                </div>
              </HStack>
              <p className="font-semibold">x{dish.qty}</p>
              <PriceDisplay price={dish.price} />
            </HStack>
          ))}
        </div>
      ))}
    </div>
  );
};
