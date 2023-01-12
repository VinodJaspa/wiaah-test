import { ResturantMetaDataType } from "api";
import { usePagination } from "hooks";
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
  DisplayFoundServices,
  usePaginationControls,
  Restaurant,
} from "@UI";

export const ResturantSearchList: React.FC<{
  restaurants: Restaurant[];
}> = ({ restaurants }) => {
  const { filters, getLocationFilterQuery } = useSearchFilters();
  const { controls, pagination } = usePaginationControls();

  return (
    <div className="flex flex-col gap-4 w-full">
      <ServicesSearchGrid
        component={ResturantRecommendedCard}
        data={restaurants}
        handlePassData={(data) => ({
          ...data,
        })}
      />
    </div>
  );
};

export const ResturantHorizontalList: React.FC = () => {
  const { filters, getLocationFilterQuery } = useSearchFilters();
  const { page, take } = usePagination();
  const { resturants } = useResturantsDataState();

  const { setResturants } = useSetResturantsDataState();
  const {
    data: res,
    isLoading,
    isError,
  } = useGetResturantsQuery({ page, take }, filters, {
    onSuccess: (res) => setResturants(res.data),
  });

  return (
    <div className="flex gap-4 w-full">
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        {res
          ? res.data.map((restaurant, i) => (
              <ResturantRecommendedCard minimal {...restaurant} key={i} />
            ))
          : null}
      </SpinnerFallback>
      <Pagination maxPages={3} />
    </div>
  );
};
