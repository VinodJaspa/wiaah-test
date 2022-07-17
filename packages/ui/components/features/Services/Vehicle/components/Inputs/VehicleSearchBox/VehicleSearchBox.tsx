import { FormatedSearchableFilter } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  FilterInput,
  VehiclePickupLocationInput,
  VehiclePickupDateInput,
  VehiclePickupTimeInput,
  VehicleDropOffDateInput,
  Button,
} from "ui";

export interface VehicleSearchBoxProps {
  onSearch?: (filters: FormatedSearchableFilter) => any;
}

export const VehicleSearchBox: React.FC<VehicleSearchBoxProps> = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-2 rounded p-2 text-black bg-primary-200">
      {/* <p>{t("Find the right car for you")}</p> */}
      <FilterInput
        label={t("Drop car off at different location")}
        variant="box"
      />
      <div className="flex gap-2 h-12 items-center">
        <VehiclePickupLocationInput />
        <VehiclePickupDateInput />
        <VehiclePickupTimeInput />
        <VehicleDropOffDateInput />
        <VehiclePickupTimeInput />
        <Button className="h-full">{t("Search")}</Button>
      </div>
      <div className="flex gap-4">
        {/* <FilterInput label={t("Driver aged 30-65?")} variant="box" /> */}
      </div>
    </div>
  );
};
