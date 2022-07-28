import { ServicesProviderHeaderData } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { AspectRatio, Rate, Button, HStack } from "ui";
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
      <div className="flex flex-col sm:flex-row items-center sm:w-auto sm:items-start w-full gap-4">
        <div className="w-28">
          <AspectRatio ratio={3 / 4}>
            <img
              className="w-full h-full object-cover"
              src={thumbnail}
              alt={name}
            />
          </AspectRatio>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-col h-full gap-4 md:gap-0 justify-between">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex flex-col">
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
              </div>
              <Button className="">{t("Contact host")}</Button>
            </div>
            <HStack className="justify-center sm:justify-start">
              <p
                onClick={() => {}}
                className="text-primary flex cursor-pointer justify-center items-center w-fit "
              >
                {t("Follow")}
              </p>

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
            </HStack>
          </div>
        </div>
      </div>
    </div>
  );
};
