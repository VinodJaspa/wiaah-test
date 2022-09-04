import { HotelMyServiceDataType } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  AspectRatioImage,
  HeartIcon,
  EllipsisText,
  PriceDisplay,
  Badge,
  TrashIcon,
  EditIcon,
  PopularAmenitiesSection,
  ServiceCancelationPolicyInput,
  SearchFilter,
  DotIcon,
  ServiceRefundableTypeDescription,
  LocationAddressDisplay,
} from "ui";

export interface HotelMyServiceCardProps extends HotelMyServiceDataType {}

export const HotelMyServiceCard: React.FC<HotelMyServiceCardProps> = (
  props
) => {
  const {
    children,
    description,
    id,
    pricePerNight,
    provider,
    thumbnail,
    title,
    type,
  } = props;
  const { t } = useTranslation();

  const PopularAmenities = [
    {
      name: "Pool",
      slug: "pool",
    },
    {
      name: "Pet-friendly",
      slug: "pet-friendly",
    },
    {
      name: "Resturant",
      slug: "resturant",
    },
    {
      name: "Breakfast available",
      slug: "breakfast",
    },
    {
      name: "Parking available",
      slug: "parking",
    },
    {
      name: "Laundry",
      slug: "laundry",
    },
    {
      name: "Housekeeping",
      slug: "housekeeping",
    },
    {
      name: "Free Wifi",
      slug: "free_wifi",
    },
    {
      name: "Air conditioning",
      slug: "a/c",
    },
    {
      name: "Gym",
      slug: "gym",
    },
    {
      name: "Business services",
      slug: "business_services",
    },
    {
      name: "Bar",
      slug: "bar",
    },
    {
      name: "Room service",
      slug: "room_service",
    },
    {
      name: "24/7 front desk",
      slug: "24/7_front_desk",
    },
  ];

  const cancelationPolicies = [
    {
      duration: 6,
      cost: 0,
      id: "1",
    },
    {
      duration: 10,
      cost: 10,
      id: "2",
    },
    {
      cost: 50,
      duration: 0,
      id: "3",
    },
    {
      id: "4",
      cost: 0,
      duration: 0,
    },
  ];

  const extras = [
    "No Extras",
    "Book now, pay later",
    "Breakfast",
    "Breakfast + Book now, pay later",
  ];

  const location = {
    address: "street name",
    city: "Geneve",
    cords: {
      lat: 15,
      lng: 16,
    },
    country: "switzerland",
    countryCode: "CHF",
    postalCode: 1565,
    state: "state",
  };

  return (
    <div
      className={`flex flex-col lg:flex-row gap-4 border-2 bg-white border-gray-300 p-2 rounded-lg`}
    >
      <div className="relative min-w-[13rem]">
        <AspectRatioImage src={thumbnail} alt={title} ratio={1} />
        <HeartIcon className="absolute top-2 right-2 z-[5] bg-black bg-opacity-50 rounded-full text-white p-1 text-2xl cursor-pointer" />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <span className="text-black text-sm md:text-lg">
          <EllipsisText maxLines={2}>{title}</EllipsisText>
        </span>
        <EllipsisText maxLines={3}>{description}</EllipsisText>
        <LocationAddressDisplay {...location} />
        <div className="flex flex-col gap-2">
          <p className="font-bold">{t("Extras")}</p>
          {extras.map((extra, i) => (
            <div key={i} className="flex items-center gap-2">
              <DotIcon className="text-xl" />
              <p>{extra}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full min-w-fit gap-1">
        <p className="text-black text-sm md:text-lg">
          {t("Cancelation policy")}
        </p>
        {cancelationPolicies.map((policy, i) => (
          <div key={i} className="flex items-center gap-4 justify-between">
            <div className="flex items-center gap-2">
              <DotIcon className="text-xl" />
              <ServiceRefundableTypeDescription
                {...policy}
                bookedDate={new Date()}
              />
            </div>

            <span className="font-bold">
              {policy.cost > 0 ? (
                <PriceDisplay price={policy.cost} />
              ) : policy.duration > 0 ? (
                <p>{t("FREE")}</p>
              ) : null}
            </span>
          </div>
        ))}
      </div>
      <PopularAmenitiesSection amenities={PopularAmenities} />

      <div className={`flex-col items-end flex justify-between h-auto gap-2`}>
        <div className="flex flex-col text-xl gap-6 items-end">
          <Badge>{t("Hotel")}</Badge>
          <div className="flex gap-2 text-3xl">
            <EditIcon />
            <TrashIcon className="text-secondaryRed" />
          </div>
        </div>
        <div
          className={`
             flex gap-1 flex-col items-end`}
        >
          <span className="whitespace-nowrap flex gap-1 text-2xl">
            <PriceDisplay priceObject={{ amount: pricePerNight }} />/
            {t("night")}
          </span>
        </div>
      </div>
    </div>
  );
};
