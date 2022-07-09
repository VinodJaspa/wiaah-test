import React from "react";
import { useTranslation } from "react-i18next";
import { useGetServiceSearchFiltersQuery } from "../../../../Hooks";
import {
  FilterInput,
  Select,
  SelectDropdown,
  SelectOption,
  SpinnerFallback,
  SearchFilter,
} from "ui";

export interface ServiceSidebarFilterProps {}

export const ServiceSearchFilter: React.FC<ServiceSidebarFilterProps> =
  ({}) => {
    const { t } = useTranslation();
    const {
      data: filters,
      isLoading,
      isError,
    } = useGetServiceSearchFiltersQuery();
    return (
      <div className="flex flex-col w-full shadow pt-4 py-2 px-1">
        <p className="px-4">{t("Filter")}</p>
        <SpinnerFallback isLoading={isLoading} isError={isError}>
          {Array.isArray(filters) ? (
            <SearchFilter defaultOpen filters={filters} />
          ) : null}
        </SpinnerFallback>
      </div>
    );
  };
