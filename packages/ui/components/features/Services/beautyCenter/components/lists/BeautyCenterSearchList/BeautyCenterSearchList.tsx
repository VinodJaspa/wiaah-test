import { RecommendedBeautyCenterDataType } from "api";
import { usePagination } from "hooks";
import React from "react";
import {
  BeautyCenterRecommendedSearchCard,
  ServicesSearchGrid,
  useGetRecommendedBeautyCentersQuery,
  SpinnerFallback,
  PaginationWrapper,
  DisplayFoundServices,
  useSearchFilters,
} from "ui";

export interface BeautyCenterSearchListProps {}

export const RecommendedBeautyCenterSearchList: React.FC<
  BeautyCenterSearchListProps
> = () => {
  const { page, take } = usePagination(24);
  const { getLocationFilterQuery } = useSearchFilters();
  const {
    data: res,
    isLoading,
    isError,
  } = useGetRecommendedBeautyCentersQuery({ page, take });
  return (
    <PaginationWrapper>
      <DisplayFoundServices
        location={getLocationFilterQuery || ""}
        servicesNum={res ? res.total : 0}
      />
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        <ServicesSearchGrid
          data={res ? res.data : []}
          component={BeautyCenterRecommendedSearchCard}
          handlePassData={(props) => props}
        />
      </SpinnerFallback>
    </PaginationWrapper>
  );
};
