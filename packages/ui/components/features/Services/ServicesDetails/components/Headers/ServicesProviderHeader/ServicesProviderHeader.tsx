import { ServicesProviderHeaderData } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { AspectRatio, Rate, Button, HStack, HeartIcon, ShareIcon } from "ui";
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
    <div
      style={{
        boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.1)",
      }}
      className="flex w-full justify-between rounded-[1.25rem] gap-4 px-10 py-[1.875rem]"
    >
      <div className="flex flex-col gap-6">
        <p className="font-semibold text-[1.75rem]">{name}</p>
        <div className="flex flex-wrap gap-4 items-center">
          <p className="text-lg font-semibold text-lightBlack">
            {rating}/{5}
          </p>
          <Rate className="text-xl" rating={rating} allowHalf />
          <p className="text-lg font-semibold text-primary">{`(${reviewsCount} ${t(
            "Reviews"
          )})`}</p>
          <HeartIcon className="text-lg text-lightBlack" />
          <ShareIcon className="text-lg text-lightBlack" />
        </div>
      </div>
      <div className="flex justify-between flex-col">
        <div className="flex flex-wrap gap-4">
          {travelPeriod && arrival && departure ? (
            <>
              <div className="flex gap-4">
                <div className="flex gap-1">
                  <p className="font-bold text-xl">
                    {arrival?.hour}:{arrival?.twoDigitMinute}
                  </p>
                  <p className="text-lightBlack text-lg">{t("Arrival")}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex gap-1">
                  <p className="font-bold text-xl">
                    {departure?.hour}:{departure?.twoDigitMinute}
                  </p>
                  <p className="text-lightBlack text-lg">{t("Departure")}</p>
                </div>
              </div>
            </>
          ) : null}
        </div>
        <div className="flex gap-2">
          <Button>{t("Follow")}</Button>

          <Button outline>{t("Contact")}</Button>
        </div>
      </div>
    </div>
  );
};
//  {travelPeriod && arrival && departure ? (
//                 <div className="flex gap-2">
//                   <p>
//                     {`${arrival.hour}:${arrival.twoDigitMinute}`} {t("Arrival")}
//                   </p>
//                   <p>-</p>
//                   <p>
//                     {`${departure.hour}:${departure.twoDigitMinute}`}{" "}
//                     {t("Departure")}
//                   </p>
//                 </div>
//               ) : null}
