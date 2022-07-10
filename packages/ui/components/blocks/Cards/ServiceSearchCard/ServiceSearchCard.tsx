import React from "react";
import { useTranslation } from "react-i18next";
import { DateRange } from "types";
import { HStack, Rate, HeartIcon, PriceDisplay, AspectRatio } from "ui";

export interface ServiceSearchCardProps {
  id: string;
  thumbnail: string;
  onLiked: (id: string) => any;
  rate: number;
  location: string;
  type: string;
  providerName: string;
  description: string;
  date: DateRange;
  price: number;
}

export const ServiceSearchCard: React.FC<ServiceSearchCardProps> = ({
  location,
  onLiked,
  rate,
  thumbnail,
  providerName,
  description,
  id,
  date,
  price,
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col w-full p-2 gap-2">
      <div className="relative rounded-xl overflow-hidden">
        <AspectRatio ratio={1}>
          <img
            className="w-full h-full object-cover"
            src={thumbnail}
            alt={providerName}
          />
        </AspectRatio>
        <HeartIcon
          className="absolute top-2 right-2 z-[5] bg-black bg-opacity-50 rounded-full text-white p-1 text-2xl cursor-pointer"
          onClick={() => onLiked(id)}
        />
      </div>
      <div className="flex flex-col gap-1 text-xs sm:text-sm md:text-md lg:text-lg w-full">
        <div className="flex items-center justify-between">
          <span className="font-bold">{location}</span>
          <HStack className="">
            <Rate className="gap-1" rating={rate} allowHalf />
            <span>{rate}</span>
          </HStack>
        </div>
        <div className="text-gray-500 flex flex-col w-full">
          <p>
            {new Date(date.from).toLocaleDateString("en-us", {
              month: "short",
              day: "numeric",
            })}{" "}
            -{" "}
            {new Date(date.to).toLocaleDateString("en-us", {
              month: "short",
              day: "numeric",
            })}
          </p>
          <p>{description}</p>
          {price ? (
            <HStack className="font-bold  text-black">
              <PriceDisplay symbol priceObject={{ amount: price }} />
              <span>{t("total")}</span>
            </HStack>
          ) : null}
        </div>
      </div>
    </div>
  );
};
