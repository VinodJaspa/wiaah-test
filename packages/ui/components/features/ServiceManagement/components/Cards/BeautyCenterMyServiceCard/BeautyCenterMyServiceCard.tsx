import { BeautyCenterMyServiceDataType } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  AspectRatioImage,
  Rate,
  EditIcon,
  TrashIcon,
  Badge,
  LocationAddress,
} from "@UI";
import { SeperatedStringArray, setTestid } from "utils";

export interface BeautyCenterMyServiceCardProps
  extends BeautyCenterMyServiceDataType {
  onEdit: (id: string) => any;
  onRemove: (id: string) => any;
}

export const BeautyCenterMyServiceCard: React.FC<
  BeautyCenterMyServiceCardProps
> = ({ onEdit, onRemove, ...props }) => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();

  const { id, name, owners, rate, reviews, thumbnail } = props;
  const location = {
    address: "street name",
    city: "Geneve",
    lat: 15,
    lon: 16,
    country: "switzerland",
    countryCode: "CHF",
    postalCode: 1565,
    state: "state",
  };

  return (
    <div className="border border-gray-400 p-2 flex flex-col sm:flex-row gap-4 justify-between">
      <div className="flex flex-col sm:flex-row shadow gap-2">
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
          <LocationAddress location={location} />
        </div>
      </div>

      <div className="flex flex-col items-end text-xl gap-6">
        <Badge className="whitespace-nowrap">{t("Beauty Center")}</Badge>
        <div className="flex gap-2 text-3xl">
          <EditIcon
            {...setTestid("EditServiceBtn")}
            className="cursor-pointer"
            onClick={() => onEdit && onEdit(id)}
          />
          <TrashIcon
            {...setTestid("RemoveServiceBtn")}
            onClick={() => onRemove && onRemove(id)}
            className="text-secondaryRed cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
