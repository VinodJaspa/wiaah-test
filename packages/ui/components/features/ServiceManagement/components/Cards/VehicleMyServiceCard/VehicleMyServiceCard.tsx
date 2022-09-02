import { VehicleMyServiceDataType } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { VehicleSearchCard, Badge, EditIcon, TrashIcon } from "ui";

export interface VehicleMyServiceCardProps extends VehicleMyServiceDataType {}

export const VehicleMyServiceCard: React.FC<VehicleMyServiceCardProps> = (
  props
) => {
  const { t } = useTranslation();
  return (
    <div className="border border-gray-400 rounded p-2 flex justify-between gap-4">
      <div className="w-[13rem]">
        <VehicleSearchCard
          cancelationPolicies={[{ cost: 5, duration: 5, id: "123" }]}
          id="15"
          name="vehicle name"
          pricePerDay={34}
          thumbnail="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6qGP9ztoNcjgTB-vVh46teop0TIp5toqIg25Bf7Xg&s"
          vehicleProps={[{ type: "a/c", value: undefined }]}
        />
      </div>
      <div className="flex flex-col items-end text-xl gap-6">
        <Badge className="whitespace-nowrap">{t("Vehicle")}</Badge>
        <div className="flex gap-2 text-3xl">
          <EditIcon />
          <TrashIcon className="text-secondaryRed" />
        </div>
      </div>
    </div>
  );
};
