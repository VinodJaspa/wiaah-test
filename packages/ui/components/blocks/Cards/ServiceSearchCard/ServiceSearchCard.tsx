import React from "react";
import { useTranslation } from "react-i18next";
import { HStack, Rate, HeartIcon, PriceDisplay } from "ui";

export interface ServiceSearchCardProps {
  id: string;
  thumbnail: string;
  onLiked: (id: string) => any;
  rate: number;
  location: string;
  type: string;
  providerName: string;
  description: string;
  date: {
    from: number;
    to: number;
  };
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
    <div className="flex flex-col w-60 p-2 gap-2">
      <div className="relative h-60 rounded-xl overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={thumbnail}
          alt={providerName}
        />
        <HeartIcon
          className="absolute top-2 right-2 z-[5] bg-black bg-opacity-50 rounded-full text-white p-1 text-2xl cursor-pointer"
          onClick={() => onLiked(id)}
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex items-center justify-between">
          <span className="font-bold text-xs">{location}</span>
          <HStack className="text-[0.6rem]">
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
