import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SpinnerFallback,
  SearchFilter,
  SearchFilterProps,
  Divider,
 
} from "@UI";
import { ServiceType ,} from "../../../features/API";
import { useGetServiceSearchFiltersQuery} from "@UI/src"
import { getServiceSearchFiltersFetcher, SearchFilterType } from "api";
export interface ServiceSidebarFilterProps {
  onChange: Pick<
    SearchFilterProps,
    "onRangeChange" | "onOptionSelect" | "onOptionsSelect"
  >;
  serviceType: ServiceType;
}
console.log(useGetServiceSearchFiltersQuery,"useGetServiceSearchFiltersQuery");


export const ServiceSearchFilter: React.FC<ServiceSidebarFilterProps> = ({
  onChange,
  serviceType,
}) => {
const { t } = useTranslation();
  // const {
  //   data: filters,
  //   isLoading,
  //   isError,
  // } = useGetServiceSearchFiltersQuery(serviceType);
console.log(serviceType ,"serviceType");
const [filters, setFilters] = useState<SearchFilterType[]>([]);

useEffect(() => {
  const fetchedFilters = getServiceSearchFiltersFetcher(serviceType);
  // If your fetcher is async, you can await it or use .then
  if (fetchedFilters instanceof Promise) {
    fetchedFilters.then(setFilters);
  } else {
    setFilters(fetchedFilters);
  }
}, [serviceType]);

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
    <div className="flex flex-col w-full  pt-4 py-2 px-1">
      <p className="px-4 font-semibold ">{t("Filter")}</p>
      <Divider/>
      {/* <SpinnerFallback isLoading={isLoading} isError={isError}> */}
        {Array.isArray(filters) ? (
          <SearchFilter {...onChange} defaultOpen collapse filters={filters} />
        ) : null}
      {/* </SpinnerFallback> */}
    </div>
  );
};
