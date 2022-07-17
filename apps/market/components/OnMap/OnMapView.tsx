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
      <span className="w-1/2">
        <SearchFilter filters={sortingFilters || []} />
      </span>
      <div className="w-screen h-[75vh] flex gap-4 justify-between">
        <div className="w-full">
          <ScrollingWrapper className="pr-4">
            <ServicesTypeSwitcher
              servicesList={ServicesViewsList}
              get={getServiceView.LIST}
              serviceType={serviceType}
            />
          </ScrollingWrapper>
        </div>
        <RenderMap />
      </div>
    </div>
  );
};
