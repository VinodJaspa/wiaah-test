import React from "react";
import { useTranslation } from "react-i18next";
import { AspectRatio, Rate, Button, HStack } from "@UI";
import { DateDetails } from "utils";
import { ServiceOwnerAccount } from "api";
import PrimaryButton from "@UI/components/shadcn-components/Buttons/primaryButton";

export interface MarketServicesProviderHeaderProps {
  name: string;
  rating: number;
  reviewsCount: number;
  thumbnail: string;
  travelPeriod?: string[];
}

export const MarketServicesProviderHeader: React.FC<
  MarketServicesProviderHeaderProps
> = ({ name, rating, reviewsCount, thumbnail, travelPeriod }) => {
  const departure = travelPeriod ? DateDetails(travelPeriod[0]) : null;
  const arrival = travelPeriod ? DateDetails(travelPeriod[1]) : null;

  const { t } = useTranslation();

  return (
    <div className="flex w-full justify-between gap-4">
      <div className="flex flex-col sm:flex-row items-center sm:w-auto sm:items-start w-full gap-3">
        <div className="w-24">
          <AspectRatio ratio={3 / 4}>
            <img
              className="w-full h-full object-cover rounded-lg"
              src={thumbnail}
              alt={name}
            />
          </AspectRatio>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-col h-full gap-3 md:gap-2 justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-base">{name}</p>
                <div className="flex gap-2 items-center text-sm text-gray-600">
                  <p>
                    {rating}/{t("5")}
                  </p>
                  <Rate rating={rating} />
                  <p className="underline text-primary">
                    {reviewsCount} {t("reviews")}
                  </p>
                </div>
              </div>
              <PrimaryButton className="bg-primary">{t("Contact host")}</PrimaryButton>
       
            </div>

            <HStack className="justify-center sm:justify-start gap-3 text-sm">
              <p
                onClick={() => {}}
                className="text-primary cursor-pointer"
              >
                {t("Follow")}
              </p>

              {travelPeriod && arrival && departure ? (
                <div className="flex gap-2 text-gray-600">
                  <p>
                    {`${arrival.hour}:${arrival.twoDigitMinute}`} {t("Arrival")}
                  </p>
                  <span>-</span>
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
