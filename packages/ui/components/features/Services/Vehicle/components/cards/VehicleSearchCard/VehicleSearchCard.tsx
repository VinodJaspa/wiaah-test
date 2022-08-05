import React from "react";
import {
  AspectRatio,
  PriceDisplay,
  VehicleProprtiesList,
  Button,
  ServicesRequestKeys,
} from "ui";
import { VehicleSearchData } from "api";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
export interface VehicleSearchCardProps extends VehicleSearchData {
  showTotal?: boolean;
}

export const VehicleSearchCard: React.FC<VehicleSearchCardProps> = (props) => {
  const {
    name,
    pricePerDay,
    thumbnail,
    vehicleProps,
    showTotal = false,
  } = props;
  const { visit } = useRouting();
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="w-full">
        <AspectRatio className="group" ratio={3 / 4}>
          <img
            className="w-full h-full rounded object-cover"
            src={thumbnail}
            alt={name}
          />
          <div
            className={
              "bg-black bg-opacity-0 transition-all opacity-0 pointer-events-none group-hover:opacity-100 group-hover:bg-opacity-25 group-hover:pointer-events-auto top-0 left-0 w-full h-full absolute flex justify-center items-center"
            }
          >
            <Button
              onClick={() =>
                visit((routes) =>
                  routes.visitService(props, ServicesRequestKeys.vehicle)
                )
              }
            >
              {t("Details")}
            </Button>
          </div>
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
            {showTotal ? (
              <span className="flex gap-2">
                <PriceDisplay
                  priceObject={{
                    amount: pricePerDay * 3,
                  }}
                />
                {t("total")}
              </span>
            ) : null}
          </div>
        ) : null}
        <span className="text-lg">
          <VehicleProprtiesList VehicleProps={vehicleProps} />
        </span>
      </div>
    </div>
  );
};
