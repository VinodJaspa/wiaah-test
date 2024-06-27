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
import { PresentationType, ServicePresentationType } from "@features/API";

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
            showTotal: false,
            presentations: [{ src: " ", type: ServicePresentationType.Img }],
            cancelationPolicies: props.cancelationPolicies,
            title: "",
            brand: "",
            price: 4,
            id: "2",
            model: "",
            properties: {
              seats: 5,
              windows: 4,
              maxSpeedInKm: 120,
              lugaggeCapacity: 4,
              gpsAvailable: true,
              airCondition: true,
            },
          })}
        />
      </SpinnerFallback>
    </PaginationWrapper>
  );
};
