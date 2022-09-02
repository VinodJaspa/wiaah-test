import { VehicleMyServiceDataType } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  AspectRatio,
  Button,
  PriceDisplay,
  VehicleProprtiesList,
  Badge,
  EditIcon,
  TrashIcon,
  ServicesRequestKeys,
  AspectRatioImage,
  ServiceRefundableTypeDescription,
  DotIcon,
  LocationAddressDisplay,
} from "ui";

export interface VehicleMyServiceCardProps extends VehicleMyServiceDataType {}

export const VehicleMyServiceCard: React.FC<VehicleMyServiceCardProps> = () => {
  const { t } = useTranslation();
  const { visit } = useRouting();
  const props = {
    cancelationPolicies: [
      {
        duration: 6,
        cost: 0,
        id: "1",
      },
      {
        duration: 10,
        cost: 10,
        id: "2",
      },
      {
        cost: 50,
        duration: 0,
        id: "3",
      },
      {
        id: "4",
        cost: 0,
        duration: 0,
      },
    ],
    id: "15",
    name: "vehicle name",
    pricePerDay: 34,
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6qGP9ztoNcjgTB-vVh46teop0TIp5toqIg25Bf7Xg&s",
    vehicleProps: [
      {
        type: "a/c",
        value: true,
      },
      {
        type: "gps",
        value: true,
      },
      {
        type: "passengers",
        value: 5,
      },
      {
        type: "windows",
        value: 4,
      },
      {
        type: "bags",
        value: 3,
      },
    ],
  };

  const {
    cancelationPolicies,
    id,
    name,
    pricePerDay,
    thumbnail,
    vehicleProps,
  } = props;

  const location = {
    address: "street name",
    city: "Geneve",
    cords: {
      lat: 15,
      lng: 16,
    },
    country: "switzerland",
    countryCode: "CHF",
    postalCode: 1565,
    state: "state",
  };

  return (
    <div className="border border-gray-400 rounded p-2 flex justify-between gap-4">
      <div className="flex gap-4 w-full">
        <div className="min-w-[13rem]">
          <AspectRatioImage alt={name} ratio={3 / 4} src={thumbnail} />
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-semibold text-lg">{name}</p>
          {pricePerDay ? (
            <div className="flex flex-col font-bold gap-2"></div>
          ) : null}
          <span className="text-lg">
            <VehicleProprtiesList VehicleProps={vehicleProps} />
          </span>
          <LocationAddressDisplay {...location} />
        </div>
        <div className="flex flex-col gap-2">
          {cancelationPolicies.map((policy, i) => (
            <div key={i} className="flex items-center gap-4 justify-between">
              <div className="flex items-center gap-2">
                <DotIcon className="text-xl" />
                <ServiceRefundableTypeDescription
                  {...policy}
                  bookedDate={new Date()}
                />
              </div>

              <span className="font-bold">
                {policy.cost > 0 ? (
                  <PriceDisplay price={policy.cost} />
                ) : policy.duration > 0 ? (
                  <p>{t("FREE")}</p>
                ) : null}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 justify-between">
        <div className="flex flex-col items-end text-xl gap-6">
          <Badge className="whitespace-nowrap">{t("Vehicle")}</Badge>
          <div className="flex gap-2 text-3xl">
            <EditIcon />
            <TrashIcon className="text-secondaryRed" />
          </div>
        </div>
        <span className="text-lg text-primary flex whitespace-nowrap gap-2">
          <PriceDisplay
            priceObject={{
              amount: pricePerDay,
            }}
          />{" "}
          | {t("day")}
        </span>
      </div>
    </div>
  );
};
