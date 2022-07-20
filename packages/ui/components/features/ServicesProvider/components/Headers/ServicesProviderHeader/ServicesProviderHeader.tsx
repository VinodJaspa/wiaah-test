import { ServicesProviderHeaderData } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { AspectRatio, Rate, Button } from "ui";

export interface ServicesProviderHeaderProps
  extends ServicesProviderHeaderData {}

export const ServicesProviderHeader: React.FC<ServicesProviderHeaderProps> = ({
  name,
  rating,
  reviewsCount,
  thumbnail,
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex w-full justify-between gap-4">
      <div className="flex gap-4">
        <div className="w-24">
          <AspectRatio ratio={3 / 4}>
            <img
              className="w-full h-full object-cover"
              src={thumbnail}
              alt={name}
            />
          </AspectRatio>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-bold text-lg">{name}</p>
          <div className="flex gap-2">
            <p>
              {rating}/{t("5")}
            </p>
            <Rate rating={rating} />
            <p className="underline text-primary">
              {reviewsCount} {t("reviews")}
            </p>
          </div>
          <div className="flex gap-2">
            <p>{`15:00`} Arrival</p>
            <p>-</p>
            <p>{`12:00`} Departure</p>
          </div>
        </div>
        <Button className="h-fit">{t("Contact")}</Button>
      </div>

      <Button className="h-fit">{t("Follow")}</Button>
    </div>
  );
};
