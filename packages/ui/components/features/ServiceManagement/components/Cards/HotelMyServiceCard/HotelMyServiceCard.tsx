import { HotelMyServiceDataType } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  AspectRatioImage,
  HeartIcon,
  EllipsisText,
  PriceDisplay,
  Badge,
  TrashIcon,
  EditIcon,
  PopularAmenitiesSection,
  DotIcon,
  ServiceRefundableTypeDescription,
  LocationAddress,
} from "@UI";
import { mapArray, setTestid } from "utils";

export interface HotelMyServiceCardProps extends HotelMyServiceDataType {
  onEdit: (id: string) => any;
  onRemove: (id: string) => any;
}

export const HotelMyServiceCard: React.FC<HotelMyServiceCardProps> = (
  props,
) => {
  const {
    description,
    id,
    amenites,
    cancelationPolicies,
    extras,
    location,
    pricePerNight,
    thumbnail,
    title,
    onEdit,
    onRemove,
  } = props;
  const { t } = useTranslation();

  const amenitiesNames = amenites.map((amenity) => amenity.name);

  return (
    <div
      className={`flex flex-col lg:flex-row gap-4 border-2 bg-white border-gray-300 p-2 rounded-lg`}
    >
      <div className="relative isolate min-w-[13rem]">
        <AspectRatioImage src={thumbnail} alt={title} ratio={1.2} />
        <HeartIcon className="absolute top-2 right-2 z-[5] bg-black bg-opacity-50 rounded-full text-white p-1 text-2xl cursor-pointer" />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <span className="text-black text-sm md:text-lg">
          <EllipsisText maxLines={2}>{title}</EllipsisText>
        </span>
        <EllipsisText maxLines={3}>{description}</EllipsisText>
        <LocationAddress
          location={{
            city: location.city,
            country: location.country!,
            state: location.state!,
            address: location.address!,
            postalCode: location.postalCode!,
            lat: location.lat!,
            lon: location.lon!,
          }}
        />
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
        {mapArray(cancelationPolicies, (policy, i) => (
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
      <div className="h-64 w-full overflow-y-scroll noScroll">
        <PopularAmenitiesSection amenities={amenitiesNames} />
      </div>

      <div className={`flex-col items-end flex justify-between h-auto gap-2`}>
        <div className="flex flex-col text-xl gap-6 items-end">
          <Badge>{t("Hotel")}</Badge>
          <div className="flex gap-2 text-3xl">
            <EditIcon
              {...setTestid("EditServiceBtn")}
              className="cursor-pointer"
              onClick={() => onEdit && onEdit(id)}
            />
            <TrashIcon
              {...setTestid("RemoveServiceBtn")}
              onClick={() => onRemove && onRemove(id)}
              className="text-secondaryRed cursor-pointer"
            />
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
