import { usePagination } from "hooks";
import React from "react";
import {
  BeautyCenterRecommendedSearchCard,
  ServicesSearchGrid,
  useGetRecommendedBeautyCentersQuery,
  SpinnerFallback,
  PaginationWrapper,
} from "ui";

export interface BeautyCenterSearchListProps {}

export const RecommendedBeautyCenterSearchList: React.FC<
  BeautyCenterSearchListProps
> = () => {
  const { page, take } = usePagination(24);
  const {
    data: res,
    isLoading,
    isError,
  } = useGetRecommendedBeautyCentersQuery({ page, take });
  return (
    <PaginationWrapper>
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
