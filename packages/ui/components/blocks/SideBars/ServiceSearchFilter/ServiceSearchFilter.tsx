import React from "react";
import { useTranslation } from "react-i18next";
import {
  SpinnerFallback,
  SearchFilter,
  SearchFilterProps,
  useGetServiceSearchFiltersQuery,
} from "ui";
import { ServiceType } from "../../../features/API";

export interface ServiceSidebarFilterProps {
  onChange: Pick<
    SearchFilterProps,
    "onRangeChange" | "onOptionSelect" | "onOptionsSelect"
  >;
  serviceType: ServiceType;
}

export const ServiceSearchFilter: React.FC<ServiceSidebarFilterProps> = ({
  onChange,
  serviceType,
}) => {
const { t } = useTranslation();
  const {
    data: filters,
    isLoading,
    isError,
  } = useGetServiceSearchFiltersQuery(serviceType);

  // const filters: SearchFilterType[] =
  //   category?.filters.map(
  //     ({ filteringKey, filterGroupName, filterValues }) => ({
  //       filterTitle: filterGroupName,
  //       filterOptions: filterValues.map(({ filteringValue, name }) => ({
  //         optName: name,
  //         optSlug: filteringValue,
  //       })),
  //       filterDisplay: "text",
  //       filterSlug: filteringKey,
  //       filterType: "select",
  //     })
  //   ) || [];
  return (
    <div className="flex flex-col w-full shadow pt-4 py-2 px-1">
      <p className="px-4">{t("Filter")}</p>
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        {Array.isArray(filters) ? (
          <SearchFilter {...onChange} defaultOpen collapse filters={filters} />
        ) : null}
      </SpinnerFallback>
    </div>
  );
};
