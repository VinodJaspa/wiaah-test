import React from "react";
import { useTranslation } from "react-i18next";
import { usePublishRef } from "state";
import { HtmlSvgProps } from "types";
import {
  CarWheelIcon,
  GPSIcon,
  TransportSeatIcon,
  AirConditionIcon,
} from "@UI";
import { runIfFn } from "utils";

export interface VehicleServiceDescriptionSectionProps {
  description: string;
  maxSpeed: number;
  seats: number;
  GPS: boolean;
  airCondition: boolean;
}

export const VehicleServiceDescriptionSection: React.FC<
  VehicleServiceDescriptionSectionProps
> = ({ GPS, airCondition, description, maxSpeed, seats }) => {
  const descriptionRef = usePublishRef((keys) => keys.description);
  const { t } = useTranslation();
  const items: {
    text: string;
    icon: React.ReactNode;
  }[] = [
    {
      text: `${maxSpeed}Km/s ${t("Max Speed")}`,
      icon: <CarWheelIcon />,
    },
    {
      text: `${GPS ? t("GPS Availiable") : ""}`,
      icon: <GPSIcon />,
    },
    {
      text: `${seats} ${t("Seats")}`,
      icon: <TransportSeatIcon />,
    },
    {
      text: `${airCondition ? t("Air Condition") : ""}`,
      icon: <AirConditionIcon />,
    },
  ];

  return (
    <div ref={descriptionRef} className="flex flex-col gap-[1.875rem]">
      <p className="md:text-lg">{description}</p>
      <div
        style={{
          gridTemplateColumns:
            "repeat(auto-fit, minmax(3rem,calc(25% - 0.6rem)))",
        }}
        className="grid grid-cols-[] gap-3"
      >
        {items.map(({ icon, text }, i) => (
          <div
            className="flex rounded-lg bg-[#EFF0F2] text-darkBrown  flex-col gap-4 justify-center items-center h-[9.375rem] w-full"
            key={i}
          >
            <>{runIfFn<HtmlSvgProps>(icon, { className: "text-[2.125rem]" })}</>
            <p className="font-semibold">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
