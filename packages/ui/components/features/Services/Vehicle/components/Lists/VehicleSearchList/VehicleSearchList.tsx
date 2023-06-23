import { VehicleSearchData } from "api";
import { usePagination } from "hooks";
import React from "react";
import {
  ServicesSearchGrid,
  PaginationWrapper,
  useGetVehicleSearchDataQuery,
  useSearchFilters,
  SpinnerFallback,
  VehicleSearchCard,
  VehicleSearchCardProps,
} from "@UI";
import { PresentationType } from "@features/API";

export const VehicleSearchList: React.FC = () => {
  const { take, page } = usePagination(12);
  const { filters, getLocationFilterQuery } = useSearchFilters();
  const {
    data: res,
    isError,
    isLoading,
  } = useGetVehicleSearchDataQuery({ page, take }, filters);
  return (
    <PaginationWrapper>
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        <ServicesSearchGrid<VehicleSearchData, VehicleSearchCardProps>
          data={res?.data || []}
          component={VehicleSearchCard}
          handlePassData={(props) => ({
            ...props,
            showTotal: false,
            presentations: [
              { src: props.thumbnail, type: PresentationType.Image },
            ],
          })}
        />
      </SpinnerFallback>
    </PaginationWrapper>
  );
};
