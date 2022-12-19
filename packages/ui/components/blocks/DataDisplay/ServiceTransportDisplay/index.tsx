import React from "react";
import { useTranslation } from "react-i18next";
import { ServiceTransport } from "types";
import {
  HStack,
  TransportGuestsIcon,
  TransportSeatIcon,
  TransportLuggageIcon,
  AirConditionIcon,
  IdCardIcon,
  ConnectorsIcon,
} from "@UI";

export interface ServiceTransportDisplayProps extends ServiceTransport {}

export const ServiceTransportDisplay: React.FC<
  ServiceTransportDisplayProps
> = ({
  airCondition,
  luggageCapacity,
  guests,
  passengers,
  seats,
  type,
  typeOfDevice,
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-4 flex-wrap font-bold">
      {typeof guests === "number" ? (
        <HStack>
          <TransportGuestsIcon />
          <p>{guests}</p>
        </HStack>
      ) : null}
      {typeof seats === "number" ? (
        <HStack>
          <TransportSeatIcon />
          <p>{seats}</p>
        </HStack>
      ) : null}
      {typeof luggageCapacity === "number" ? (
        <HStack>
          <TransportLuggageIcon />
          <p>{luggageCapacity}</p>
        </HStack>
      ) : null}
      {typeof typeOfDevice === "string" ? (
        <HStack>
          <ConnectorsIcon />
          <p>{typeOfDevice.split("")[0].toUpperCase()}</p>
        </HStack>
      ) : null}
      {airCondition === true ? (
        <HStack>
          <AirConditionIcon />
          <p>{t("A/C")}</p>
        </HStack>
      ) : null}
      {typeof passengers === "number" ? (
        <HStack>
          <IdCardIcon outline />
          <p>{passengers}</p>
        </HStack>
      ) : null}
    </div>
  );
};
