import React from "react";
import {
  AspectRatio,
  PriceDisplay,
  Button,
  ServicesRequestKeys,
  Image,
} from "@UI";
import { VehicleProprtiesList } from "@UI/components/features/Services/Vehicle/components/Lists/VehicleProprtiesList";
import { Vehicle } from "api";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
export interface VehicleSearchCardProps extends Vehicle {
  showTotal?: boolean;
}

export const VehicleSearchCard: React.FC<VehicleSearchCardProps> = (props) => {
  const { price, properties, presentations, showTotal = false, title } = props;
  const { visit } = useRouting();
  const { t } = useTranslation();
  const thumbnail = presentations?.find(({ type }) => type === "img")?.src;
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="w-full">
        <AspectRatio className="group" ratio={3 / 4}>
          <Image
            className="w-full h-full rounded object-cover"
            src={presentations?.at(0)?.src}
            alt={title}
          />
          <div
            className={
              "bg-black bg-opacity-0 transition-all opacity-0 pointer-events-none group-hover:opacity-100 group-hover:bg-opacity-25 group-hover:pointer-events-auto top-0 left-0 w-full h-full absolute flex justify-center items-center"
            }
          >
            <Button
              onClick={() =>
                visit((routes) =>
                  routes.visitService(props, ServicesRequestKeys.vehicle),
                )
              }
            >
              {t("Details")}
            </Button>
          </div>
        </AspectRatio>
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-semibold text-lg">{title}</p>
        {price ? (
          <div className="flex flex-col font-bold gap-2">
            <span className="text-lg text-primary flex whitespace-nowrap gap-2">
              <PriceDisplay price={price} /> | {t("day")}
            </span>
            <span className="flex gap-2">
              <PriceDisplay
                priceObject={{
                  amount: price * 3,
                }}
              />
              {t("total")}
            </span>
          </div>
        ) : null}
        <span className="text-lg">
          <VehicleProprtiesList VehicleProps={properties} />
        </span>
      </div>
    </div>
  );
};
