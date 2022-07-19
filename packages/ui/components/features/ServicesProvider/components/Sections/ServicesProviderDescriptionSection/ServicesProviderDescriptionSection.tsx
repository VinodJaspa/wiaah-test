import React from "react";
import { useTranslation } from "react-i18next";
import { useSearchFilters, useGetServicesProviderQuery } from "ui";

export interface ServicesProviderDescriptionSectionProps {}

export const ServicesProviderDescriptionSection: React.FC<
  ServicesProviderDescriptionSectionProps
> = () => {
  const { filters } = useSearchFilters();
  const {
    data: res,
    isError,
    isLoading,
  } = useGetServicesProviderQuery(filters);
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-8 py-8">
      <p className="text-xl md:text-3xl font-bold">{res?.data.name}</p>
      <p className="text-lg md:text-xl font-semibold">
        {res?.data.proprtyType}
      </p>
      <p className="md:text-lg">{res?.data.description}</p>
    </div>
  );
};
