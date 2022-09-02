import { BeautyCenterMyServiceDataType } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  AspectRatioImage,
  Rate,
  EditIcon,
  TrashIcon,
  ServicesRequestKeys,
  Badge,
  LocationAddressDisplay,
} from "ui";
import { SeperatedStringArray } from "utils";

export interface BeautyCenterMyServiceCardProps
  extends BeautyCenterMyServiceDataType {}

export const BeautyCenterMyServiceCard: React.FC<
  BeautyCenterMyServiceCardProps
> = () => {
  const { t } = useTranslation();
  const { visit } = useRouting();
  const props = {
    id: "12",
    name: "center name",
    owners: ["owner 1", "owner 2"],
    rate: 4,
    reviews: 150,
    thumbnail: "/place-3.jpg",
  };

  const { id, name, owners, rate, reviews, thumbnail } = props;
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
    <div className="border border-gray-400 p-2 flex gap-4 justify-between">
      <div className="flex shadow gap-2">
        <div className="min-w-[13rem]">
          <AspectRatioImage
            className="group"
            src={thumbnail}
            alt={name}
            ratio={3 / 4}
          />
        </div>
        <div className="p-2 flex flex-col gap-2">
          <p className="font-bold">{name}</p>
          <div className="flex gap-4">
            <Rate rating={rate} />
            <p>
              {reviews} {t("review")}
            </p>
          </div>
          <div className="flex gap-4">
            <p>{SeperatedStringArray(owners, ", ")}</p>
          </div>
          <LocationAddressDisplay {...location} />
        </div>
      </div>

      <div className="flex flex-col items-end text-xl gap-6">
        <Badge className="whitespace-nowrap">{t("Beauty Center")}</Badge>
        <div className="flex gap-2 text-3xl">
          <EditIcon />
          <TrashIcon className="text-secondaryRed" />
        </div>
      </div>
    </div>
  );
};
