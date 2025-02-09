import {
  Badge,
  BeautyCenterIcon,
  CarWheelIcon,
  ForkAndSpoonIcon,
  HealthIcon,
  HotelIcon,
  HouseIcon,
} from "@UI";
import React from "react";
import { useTranslation } from "react-i18next";
import { ServicesType } from "types";
import { mapArray, runIfFn } from "utils";

type ServiceBadgeData = {
  name: string;
  icon: React.ReactNode;
  key: string;
};

export interface ServicesSearchBadgeListProps {
  onClick: (serviceType: string) => any;
  additionalLinks?: ServiceBadgeData[];
  activeKey: ServicesType;
}

export const ServicesSearchBadgeList: React.FC<
  ServicesSearchBadgeListProps
> = ({ onClick, additionalLinks = [], activeKey }) => {
  const { t } = useTranslation();

  const services: ServiceBadgeData[] = additionalLinks.concat([
    {
      name: "Hotels",
      icon: <HotelIcon />,
      key: "hotel",
    },
    {
      name: "Holiday Rentals",
      icon: <HouseIcon />,
      key: "holidays_rentals",
    },
    {
      name: "Restaurants",
      icon: <ForkAndSpoonIcon />,
      key: "restaurant",
    },
    {
      name: "Health Centers",
      icon: <HealthIcon />,
      key: "health_center",
    },
    {
      name: "Beauty Centers",
      icon: <BeautyCenterIcon />,
      key: "beauty_center",
    },
    {
      name: "Vehicle",
      icon: <CarWheelIcon />,
      key: "vehicle",
    },
  ]);

  return (
    <div className="w-full overflow-x-scroll noScroll gap-4 justify-center flex">
      {mapArray(services, ({ icon, name, key }, i) => (
        <Badge
          variant={activeKey === key ? "success" : "off"}
          onClick={() => onClick && onClick(key)}
          className="cursor-pointer w-40 justify-between flex gap-2 items-center"
          key={i}
        >
          <p className="whitespace-nowrap">{t(name)}</p>
          <span
            className={`${
              activeKey === key ? "text-primary" : "text-lightBlack"
            } text-lg`}
          >
            {runIfFn(icon)}
          </span>
        </Badge>
      ))}
    </div>
  );
};
