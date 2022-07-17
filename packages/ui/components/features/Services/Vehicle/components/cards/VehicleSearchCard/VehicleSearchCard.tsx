import React from "react";
import { AspectRatio, PriceDisplay, VehicleProprtiesList } from "ui";
import { VehicleSearchData } from "api";
import { useTranslation } from "react-i18next";
export interface VehicleSearchCardProps extends VehicleSearchData {}

export const VehicleSearchCard: React.FC<VehicleSearchCardProps> = ({
  name,
  pricePerDay,
  thumbnail,
  vehicleProps,
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="w-full">
        <AspectRatio ratio={1}>
          <img
            className="w-full h-full rounded object-cover"
            src={thumbnail}
            alt={name}
          />
        </AspectRatio>
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-semibold text-lg">{name}</p>
        {pricePerDay ? (
          <div className="flex flex-col font-bold gap-2">
            <span className="text-lg text-primary flex whitespace-nowrap gap-2">
              <PriceDisplay
                priceObject={{
                  amount: pricePerDay,
                }}
              />{" "}
              | {t("day")}
            </span>
            <span className="flex gap-2">
              <PriceDisplay
                priceObject={{
                  amount: pricePerDay * 3,
                }}
              />
              {t("total")}
            </span>
          </div>
        ) : null}
        <span className="text-lg">
          <VehicleProprtiesList VehicleProps={vehicleProps} />
        </span>
      </div>
    </div>
  );
};
