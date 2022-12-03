import React from "react";
import { useTranslation } from "react-i18next";
import { useGetServiceSearchFiltersQuery } from "ui";
import { SpinnerFallback, SearchFilter, SearchFilterProps } from "ui";
import { SERVICESTYPE_INDEXKEY, ServicesRequestKeys } from "ui";

export interface ServiceSidebarFilterProps {
  onChange: Pick<
    SearchFilterProps,
    "onRangeChange" | "onOptionSelect" | "onOptionsSelect"
  >;
}

export const ServiceSearchFilter: React.FC<ServiceSidebarFilterProps> = ({
  children,
  onChange,
}) => {
  const { t } = useTranslation();
  const {
    data: filters,
    isLoading,
    isError,
  } = useGetServiceSearchFiltersQuery({
    [SERVICESTYPE_INDEXKEY]: ServicesRequestKeys.hotels,
  });
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
