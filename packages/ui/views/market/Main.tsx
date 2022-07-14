import { HealthCenterSearchResultsView } from "../../../../apps/market/components/ServiceSearch/HealthCenter/HealthCenterSearchResultsView";
import {
  NotFound,
  ServicesRequestKeys,
  HealthCenterServiceSearchResultsList,
  ScrollingWrapper,
  RenderMap,
  useGetServicesSortingFiltersQuery,
  SearchFilter,
} from "ui";
import { getServiceView, ServicesTypeSwitcher } from "utils";
import MasterLayout from "../../../../apps/market/components/MasterLayout";
import React from "react";
export const Main: React.FC = () => {
  const {
    data: sortingFilters,
    isLoading: sortingFiltersLoading,
    isError: sortingFiltersError,
  } = useGetServicesSortingFiltersQuery();
  return (
    <MasterLayout>
      <div className="w-screen h-[75vh] flex p-4 gap-4 justify-between">
        <div className="flex flex-col gap-4 w-full">
          <SearchFilter filters={sortingFilters || []} />
          <ScrollingWrapper>
            <HealthCenterServiceSearchResultsList />
          </ScrollingWrapper>
        </div>
        <RenderMap />
      </div>
    </MasterLayout>
  );
};
