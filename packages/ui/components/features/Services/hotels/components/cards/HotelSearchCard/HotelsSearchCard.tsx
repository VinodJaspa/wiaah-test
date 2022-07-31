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
} from "ui";

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
    <div className="flex flex-col w-full p-2 gap-2">
      <div className="relative group rounded-xl overflow-hidden">
        <AspectRatioImage src={thumbnail} alt={name} ratio={1} />

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
          <span className="font-bold">{location.address}</span>
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
