import { Location } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { ServiceData } from "api";
import { AspectRatio } from "ui";

export interface ServicesSearchCardProps {
  serviceData: ServiceData;
  vertical?: boolean;
  minimal?: boolean;
}

export const ServicesSearchCard: React.FC<ServicesSearchCardProps> = ({
  serviceData,
  vertical = false,
}) => {
  const { t } = useTranslation();
  const { description, isNew, location, name, services, thumbnail } =
    serviceData;
  return (
    <div
      style={{ flexDirection: vertical ? "column" : "row" }}
      className={`${
        vertical ? "flex-col" : "flex-row justify-between"
      } flex gap-6 rounded w-full`}
    >
      <div className={`${vertical ? "w-full" : "w-64"}`}>
        <AspectRatio ratio={4 / 6}>
          <img
            className="rounded w-full h-full object-cover"
            src={thumbnail}
            alt={name}
          />
          {isNew ? (
            <p className="px-2 rounded bg-white absolute top-2 left-2">
              {t("New")}
            </p>
          ) : null}
        </AspectRatio>
      </div>
      <div className="flex flex-col gap-2 justify-between" dir="rtl">
        <div className="flex flex-col">
          <p className="font-semibold text-xl">{name}</p>
          <p>
            {location.address}, {location.state} {location.postalCode}
          </p>
        </div>
        <div>
          {services.map((service) => (
            <p>{t(service)}</p>
          ))}
        </div>
        <div>{t(description)}</div>
      </div>
    </div>
  );
};
