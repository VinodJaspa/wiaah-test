import { ShopMapSearchDataType } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { AspectRatioImage, Rate } from "@UI";

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
}) => {
  const { address, city, country, postalCode, state } = location;
  const { t } = useTranslation();
  return (
    <div className="flex flex-col w-full">
      <AspectRatioImage src={thumbnail} alt={name} ratio={9 / 16} />
      <div className="p-2">
        <p className="font-bold">{name}</p>
        <p>
          {address}, {postalCode} {state}, {city}, {country}
        </p>
        <Rate rating={rate} />
      </div>
    </div>
  );
};
