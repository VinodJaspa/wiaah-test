import React from "react";
import { useTranslation } from "react-i18next";
import { SpinnerFallback, SearchFilter, SearchFilterProps } from "@UI";
import { useGetServiceCategoryBySlug } from "@UI";
import { SearchFilterType } from "api";

export interface ServiceSidebarFilterProps {
  onChange: Pick<
    SearchFilterProps,
    "onRangeChange" | "onOptionSelect" | "onOptionsSelect"
  >;
  serviceSlug: string;
}

export const ServiceSearchFilter: React.FC<ServiceSidebarFilterProps> = ({
  onChange,
  serviceSlug,
}) => {
  const { t } = useTranslation();
  const {
    data: category,
    isLoading,
    isError,
  } = useGetServiceCategoryBySlug(serviceSlug);

  const filters: SearchFilterType[] =
    category?.filters.map(
      ({ filteringKey, filterGroupName, filterValues, sortOrder }) => ({
        filterTitle: filterGroupName,
        filterOptions: filterValues.map(
          ({ filteringValue, name, sortOrder }) => ({
            optName: name,
            optSlug: filteringValue,
          })
        ),
        filterDisplay: "text",
        filterSlug: filteringKey,
        filterType: "select",
      })
    ) || [];
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
