import React from "react";
import { VehicleProperties } from "api";
import {
  HStack,
  AirConditionIcon,
  CarWindowIcon,
  TransportGuestsIcon,
  TransportLuggageIcon,
  GPSIcon,
} from "@UI";
import { useTranslation } from "react-i18next";
import { randomNum } from "utils";

export interface VehicleProprtiesListProps {
  VehicleProps: VehicleProperties;
}

export const VehicleProprtiesList: React.FC<VehicleProprtiesListProps> = ({
  VehicleProps,
}) => {
  return (
    <HStack className="flex-wrap">
      {Object.entries(VehicleProps).map(([key, value], i) => (
        <VehicleProprtiesSwticher
          key={`${randomNum(50)}--${i}`}
          vehicleProp={key as keyof VehicleProperties}
          value={value}
        />
      ))}
    </HStack>
  );
};

export const VehicleProprtiesSwticher: React.FC<{
  vehicleProp: keyof VehicleProperties;
  value: VehicleProperties[keyof VehicleProperties];
}> = ({ vehicleProp, value }) => {
  const { t } = useTranslation();
  switch (vehicleProp) {
    case "airCondition":
      return (
        <HStack>
          <AirConditionIcon />
          <p>{t("A/C")}</p>
        </HStack>
      );
    case "gpsAvailable":
      return (
        <HStack>
          <GPSIcon />
          <p>{t("GPS")}</p>
        </HStack>
      );
    case "seats":
      return (
        <HStack>
          <TransportGuestsIcon />
          <p>{value}</p>
        </HStack>
      );
    case "windows":
      return (
        <HStack>
          <CarWindowIcon />
          <p>{value}</p>
        </HStack>
      );
    case "lugaggeCapacity":
      return (
        <HStack>
          <TransportLuggageIcon />
          <p>{value}</p>
        </HStack>
      );
    default:
      return null;
  }
};
