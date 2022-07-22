import { ResturantMetaDataType } from "api";
import React from "react";
import {
  useGetResturantsQuery,
  SpinnerFallback,
  ResturantRecommendedCard,
  useSearchFilters,
  Pagination,
  useResturantsDataState,
  useSetResturantsDataState,
  ServicesSearchGrid,
} from "ui";

export const ResturantSearchList: React.FC = () => {
  const { filters } = useSearchFilters();
  const { resturants } = useResturantsDataState();
  const { setResturants } = useSetResturantsDataState();
  const { isLoading, isError } = useGetResturantsQuery(filters, 10, 0, {
    onSuccess: (data) => setResturants(data),
  });

  return (
    <div className="flex flex-col gap-4 w-full">
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        <ServicesSearchGrid
          component={ResturantRecommendedCard}
          data={resturants}
          handlePassData={(data) => ({
            ...data,
          })}
        />
      </SpinnerFallback>
      <Pagination maxPages={3} />
    </div>
  );
};
