import { HolidayRentalsMyServiceDataType } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  AspectRatioImage,
  HeartIcon,
  EllipsisText,
  Badge,
  EditIcon,
  TrashIcon,
  PriceDisplay,
} from "ui";

export interface HolidayRentalsMyServiceCardProps
  extends HolidayRentalsMyServiceDataType {}

export const HolidayRentalsMyServiceCard: React.FC<
  HolidayRentalsMyServiceCardProps
> = (props) => {
  const {
    children,
    description,
    id,
    provider,
    thumbnail,
    title,
    type,
    pricePerNight,
  } = props;
  const { t } = useTranslation();
  const { visit } = useRouting();
  return (
    <div
      className={`flex gap-4 border-2 bg-white border-gray-300 p-2 rounded-lg`}
    >
      <div className="relative min-w-[13rem]">
        <AspectRatioImage src={thumbnail} alt={title} ratio={1} />
        <HeartIcon className="absolute top-2 right-2 z-[5] bg-black bg-opacity-50 rounded-full text-white p-1 text-2xl cursor-pointer" />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <span className="text-primary-500  underline cursor-pointer">
          {provider}
        </span>
        <span className="text-black text-sm md:text-lg">
          <EllipsisText maxLines={2}>{title}</EllipsisText>
        </span>
        <EllipsisText maxLines={3}>{description}</EllipsisText>
      </div>

      <div className={`flex-col items-end flex justify-between h-auto gap-2`}>
        <div className="flex flex-col text-xl gap-6 items-end">
          <Badge className="whitespace-nowrap">{t("Holiday Rentals")}</Badge>
          <div className="flex gap-2 text-3xl">
            <EditIcon />
            <TrashIcon className="text-secondaryRed" />
          </div>
        </div>
        <div
          className={`
             flex gap-1 flex-col items-end`}
        >
          <span
            onClick={() => visit((r) => r.visitServiceOnMap(props, type))}
            className="text-primary-500 underline cursor-pointer"
          >
            {t("Show on map")}
          </span>
          <span className="whitespace-nowrap flex gap-1 text-2xl">
            <PriceDisplay priceObject={{ amount: pricePerNight }} />/
            {t("night")}
          </span>
        </div>
      </div>
    </div>
  );
};
