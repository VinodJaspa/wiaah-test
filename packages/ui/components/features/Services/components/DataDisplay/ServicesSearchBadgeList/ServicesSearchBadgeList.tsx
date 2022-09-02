import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  Badge,
  ForkAndSpoonIcon,
  HealthIcon,
  BeautyCenterIcon,
  CarWheelIcon,
  HotelIcon,
  HouseIcon,
} from "ui";
import { runIfFn } from "utils";

export interface ServicesSearchBadgeListProps {}

export const ServicesSearchBadgeList: React.FC<
  ServicesSearchBadgeListProps
> = () => {
  const { visit } = useRouting();
  const { t } = useTranslation();
  const services: { name: string; icon: React.ReactNode }[] = [
    {
      name: "Hotels",
      icon: HotelIcon,
    },
    {
      name: "Holiday Rentals",
      icon: HouseIcon,
    },
    {
      name: "Restaurants",
      icon: ForkAndSpoonIcon,
    },
    {
      name: "Health Centers",
      icon: HealthIcon,
    },
    {
      name: "Beauty Centers",
      icon: BeautyCenterIcon,
    },
    {
      name: "Vehicle",
      icon: CarWheelIcon,
    },
  ];
  return (
    <div className="flex gap-4 ">
      {Array.isArray(services)
        ? services.map(({ icon, name }, i) => (
            <Badge
              onClick={() =>
                visit((r) =>
                  r.addQuery({
                    serviceType: name.replace(" ", "_").toLowerCase(),
                  })
                )
              }
              className="cursor-pointer flex gap-2 items-center"
              key={i}
            >
              <p>{t(name)}</p>
              <span className="fill-primary text-lg text-primary">
                {runIfFn(icon)}
              </span>
            </Badge>
          ))
        : null}
    </div>
  );
};
