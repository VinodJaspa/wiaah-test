import { BeautyCenterMyServiceDataType } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  BeautyCenterRecommendedSearchCard,
  Badge,
  EditIcon,
  TrashIcon,
} from "ui";

export interface BeautyCenterMyServiceCardProps
  extends BeautyCenterMyServiceDataType {}

export const BeautyCenterMyServiceCard: React.FC<
  BeautyCenterMyServiceCardProps
> = () => {
  const { t } = useTranslation();
  return (
    <div className="border border-gray-400 p-2 flex gap-4 justify-between">
      <div className="w-[13rem]">
        <BeautyCenterRecommendedSearchCard
          id="12"
          name="center name"
          owners={["owner 1", "owner 2"]}
          rate={4}
          reviews={150}
          thumbnail={"/place-3.jpg"}
        />
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
