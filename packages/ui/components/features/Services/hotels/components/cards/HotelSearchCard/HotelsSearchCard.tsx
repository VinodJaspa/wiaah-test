import { HotelsMetaData } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  HStack,
  Rate,
  HeartIcon,
  PriceDisplay,
  AspectRatioImage,
  Button,
  ServicesRequestKeys,
} from "@UI";

export interface HotelSearchCardProps extends HotelsMetaData {
  onLiked: (id: string) => any;
}

export const HotelSearchCard: React.FC<HotelSearchCardProps> = (props) => {
  const {
    location,
    onLiked,
    rate,
    thumbnail,
    name,
    description,
    id,
    date,
    price,
  } = props;
  const { visit } = useRouting();
const { t } = useTranslation();
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="relative group overflow-hidden">
        <AspectRatioImage src={thumbnail} alt={name} ratio={3 / 4} />

        <HeartIcon
          className="absolute top-2 right-2 z-[5] bg-black bg-opacity-50 rounded-full text-white p-1 text-2xl cursor-pointer"
          onClick={() => onLiked(id)}
        />
        <div
          className={
            "bg-black bg-opacity-0 transition-all opacity-0 pointer-events-none group-hover:opacity-100 group-hover:bg-opacity-25 group-hover:pointer-events-auto top-0 left-0 w-full h-full absolute flex justify-center items-center"
          }
        >
          <Button
            onClick={() =>
              visit((routes) =>
                routes.visitService(props, ServicesRequestKeys.hotels)
              )
            }
          >
            {t("Details")}
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-1 text-xs sm:text-sm md:text-md lg:text-lg w-full">
        <div className="flex items-center justify-between">
          <span className="font-bold">
            {location.city}, {location.country}
          </span>
        </div>
        <div className="text-gray-500 flex flex-col w-full">
          <p>{name}</p>
          {price ? (
            <HStack className="font-bold  text-black">
              <PriceDisplay symbol priceObject={{ amount: price }} />
              <span>/{t("night")}</span>
            </HStack>
          ) : null}
        </div>
        <HStack className="">
          <Rate className="gap-1" rating={rate} allowHalf />
          <span>{rate}</span>
        </HStack>
      </div>
    </div>
  );
};
