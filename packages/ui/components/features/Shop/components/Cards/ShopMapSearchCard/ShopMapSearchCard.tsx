import { ShopMapSearchDataType } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { AspectRatioImage } from "@UI";

export interface ShopMapSearchCardProps extends ShopMapSearchDataType {
  children?: React.ReactNode;
}

export const ShopMapSearchCard: React.FC<ShopMapSearchCardProps> = ({
  categories,
  name,
  rate,
  thumbnail,
  children,
  location,
  description,
  reviews,
  price,
}) => {
  const { address, city, country, postalCode, state } = location;
  const { t } = useTranslation();
  return (
    <div className="flex gap-3 p-2 h-fit border border-2 broder-gray-500 rounded-xl w-full">
      <img src={thumbnail} className="w-32 h-32 rounded-md" alt={name} />
      <div className=" flex flex-col gap-2 w-fit">
        <p className="text-primary underline">{address}</p>
        <p className="text-lg font-semibold">{name}</p>
        <p>{description}</p>
      </div>
      <div className="flex flex-col gap-2 text-gray-500">
        <div className="flex gap-1">
          <p className="text-sm ">{reviews} reviews</p>
          <p className="bg-primary p-1 text-lg text-white">{rate}</p>
        </div>
        <p className="text-primary underline">Show on map</p>
        <p>{price}$</p>
        <p>Including taxes & fees</p>
        <p>
          {country}, {city}, {address}
        </p>
      </div>
    </div>
  );
};
