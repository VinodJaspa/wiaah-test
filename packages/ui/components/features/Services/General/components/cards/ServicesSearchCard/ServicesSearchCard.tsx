import React from "react";
import { useTranslation } from "react-i18next";
import { ServiceData } from "api";
import { AspectRatioImage, Button, ServicesRequestKeys } from "@UI";
import { useRouting } from "routing";

export interface ServicesSearchCardProps {
  serviceData: ServiceData;
  vertical?: boolean;
  minimal?: boolean;
}

export const ServicesSearchCard: React.FC<ServicesSearchCardProps> = ({
  serviceData,
  vertical = false,
}) => {
  const { visit } = useRouting();
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
        <AspectRatioImage
          className="group"
          alt={name}
          src={thumbnail}
          ratio={4 / 6}
        >
          {isNew ? (
            <p className="px-2 rounded bg-white absolute top-2 left-2">
              {t("New")}
            </p>
          ) : null}
          <div
            className={
              "bg-black bg-opacity-0 transition-all opacity-0 pointer-events-none group-hover:opacity-100 group-hover:bg-opacity-25 group-hover:pointer-events-auto top-0 left-0 w-full h-full absolute flex justify-center items-center"
            }
          >
            <Button
              onClick={() =>
                visit((routes) =>
                  routes.visitService(serviceData, ServicesRequestKeys.general)
                )
              }
            >
              {t("Details")}
            </Button>
          </div>
        </AspectRatioImage>
      </div>
      <div className="flex flex-col gap-2 justify-between" dir="rtl">
        <div className="flex flex-col">
          <p className="font-semibold text-xl">{name}</p>
          <p>
            {location.address}, {location.state} {location.postalCode}
          </p>
        </div>
        <div>
          {Array.isArray(services)
            ? services.map((service) => <p>{t(service)}</p>)
            : null}
        </div>
        <div>{t(description)}</div>
      </div>
    </div>
  );
};
