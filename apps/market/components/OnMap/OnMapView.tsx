import { ServicesViewsList } from "@data";
import { useRouter } from "next/router";
import React from "react";
import {
  RenderMap,
  ScrollingWrapper,
  SearchFilter,
  useGetServicesSortingFiltersQuery,
} from "ui";
import {
  ExtractServiceTypeFromQuery,
  getServiceView,
  ServicesTypeSwitcher,
} from "utils";

export const OnMapView: React.FC = () => {
  const router = useRouter();
  const serviceType = ExtractServiceTypeFromQuery(router.query);
  const {
    data: sortingFilters,
    isLoading: sortingFiltersLoading,
    isError: sortingFiltersError,
  } = useGetServicesSortingFiltersQuery();
  return (
    <div className="flex p-4 flex-col gap-2">
      <span className="w-full md:w-1/2">
        <SearchFilter filters={sortingFilters || []} />
      </span>
      <div className="w-full flex-col-reverse md:flex-row h-auto md:h-[75vh] flex gap-8 md:gap-4 justify-between">
        <div className="w-full h-[75vh] md:h-full">
          <ScrollingWrapper className="">
            <ServicesTypeSwitcher
              servicesList={ServicesViewsList}
              get={getServiceView.LIST}
              serviceType={serviceType}
            />
          </ScrollingWrapper>
        </div>
        <div className="h-[50vh] w-full md:h-auto">
          <RenderMap />
        </div>
      </div>
    </div>
  );
};
