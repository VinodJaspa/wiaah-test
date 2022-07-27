import React from "react";
import { VehiclePropertie } from "api";
import {
  HStack,
  AirConditionIcon,
  CarWindowIcon,
  TransportGuestsIcon,
  TransportLuggageIcon,
  GPSIcon,
} from "ui";
import { useTranslation } from "react-i18next";
import { randomNum } from "utils";

export interface VehicleProprtiesListProps {
  VehicleProps: VehiclePropertie[];
}

export const VehicleProprtiesList: React.FC<VehicleProprtiesListProps> = ({
  VehicleProps,
}) => {
  return (
    <HStack className="flex-wrap">
      {Array.isArray(VehicleProps)
        ? VehicleProps.map((prop, i) => (
            <VehicleProprtiesSwticher
              key={`${randomNum(5000)}--${i}`}
              vehicleProp={prop}
            />
          ))
        : null}
    </HStack>
  );
};

export const VehicleProprtiesSwticher: React.FC<{
  vehicleProp: VehiclePropertie;
}> = ({ vehicleProp }) => {
  const { t } = useTranslation();
  switch (vehicleProp.type) {
    case "a/c":
      return (
        <HStack>
          <AirConditionIcon />
          <p>{t("A/C")}</p>
        </HStack>
      );
    case "gps":
      return (
        <HStack>
          <GPSIcon />
          <p>{t("GPS")}</p>
        </HStack>
      );
    case "passengers":
      return (
        <HStack>
          <TransportGuestsIcon />
          <p>{vehicleProp.value}</p>
        </HStack>
      );
    case "windows":
      return (
        <HStack>
          <CarWindowIcon />
          <p>{vehicleProp.value}</p>
        </HStack>
      );
    case "bags":
      return (
        <HStack>
          <TransportLuggageIcon />
          <p>{vehicleProp.value}</p>
        </HStack>
      );
    default:
      return null;
  }
};
