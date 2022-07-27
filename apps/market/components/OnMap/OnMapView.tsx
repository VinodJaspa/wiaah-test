import { ServicesViewsList } from "@data";
import { useResponsive } from "hooks";
import { useRouter } from "next/router";
import React from "react";
import {
  RenderMap,
  ScrollingWrapper,
  SearchFilter,
  useGetServicesSortingFiltersQuery,
  LocationSearchInput,
} from "ui";
import {
  ExtractServiceTypeFromQuery,
  getServiceView,
  ServicesTypeSwitcher,
} from "utils";

export const OnMapView: React.FC = () => {
  const router = useRouter();
  const serviceType = ExtractServiceTypeFromQuery(router.query);
  const { isTablet } = useResponsive();
  const {
    data: sortingFilters,
    isLoading: sortingFiltersLoading,
    isError: sortingFiltersError,
  } = useGetServicesSortingFiltersQuery();
  return (
    <div className="flex p-4 flex-col gap-2">
      <span className="w-full md:w-1/2">
        <LocationSearchInput onLocationSelect={() => {}} />
      </span>
      <div className="w-full relative pb-40 flex-col-reverse md:flex-row h-auto md:h-[75vh] flex gap-8 md:gap-4 justify-between">
        <div className="w-full absolute bottom-0 left-0 z-50 md:static md:w-full md:h-full">
          <ScrollingWrapper horizonatal={isTablet}>
            <ServicesTypeSwitcher
              servicesList={ServicesViewsList}
              get={getServiceView.LIST}
              serviceType={serviceType}
              props={{ horizontal: isTablet }}
            />
          </ScrollingWrapper>
        </div>
        <div className="w-full h-[75vh] md:h-auto">
          <RenderMap />
        </div>
      </div>
    </div>
  );
};
