import { ServicesProviderHeaderData } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { AspectRatio, Rate, Button } from "ui";
import { DateDetails } from "utils";

export interface ServicesProviderHeaderProps
  extends ServicesProviderHeaderData {}

export const ServicesProviderHeader: React.FC<ServicesProviderHeaderProps> = ({
  name,
  rating,
  reviewsCount,
  thumbnail,
  travelPeriod,
}) => {
  const departure = travelPeriod ? DateDetails(travelPeriod.departure) : null;
  const arrival = travelPeriod ? DateDetails(travelPeriod.arrival) : null;

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
          {travelPeriod && arrival && departure ? (
            <div className="flex gap-2">
              <p>
                {`${arrival.hour}:${arrival.twoDigitMinute}`} {t("Arrival")}
              </p>
              <p>-</p>
              <p>
                {`${departure.hour}:${departure.twoDigitMinute}`}{" "}
                {t("Departure")}
              </p>
            </div>
          ) : null}
        </div>
        <div className="flex flex-col justify-between gap-1">
          <p
            onClick={() => {}}
            className="text-primary flex justify-center items-center w-full h-8 "
          >
            {t("Follow")}
          </p>
          <Button className="h-fit">{t("Contact host")}</Button>
        </div>
      </div>
    </div>
  );
};
