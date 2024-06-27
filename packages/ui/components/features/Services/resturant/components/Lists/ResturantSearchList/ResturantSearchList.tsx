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
  usePaginationControls,
  Restaurant,
  ResturantRecommendedCardProps,
} from "@UI";

export const ResturantSearchList: React.FC<{
  restaurants: ResturantRecommendedCardProps[];
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
  } = useGetResturantsQuery({ pagination: { page: 2, take: 2 } });

  return (
    <div className="flex gap-4 w-full">
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        {res
          ? res.map((restaurant, i) => (
              <ResturantRecommendedCard
                price={restaurant.lowest_price}
                thumbnail={restaurant.presentations[0].src}
                title={restaurant.serviceMetaInfo.title}
                rating={restaurant.rating}
                location={{
                  country: restaurant.location.country,
                  city: restaurant.location.city,
                  address: restaurant.location.address,
                }}
                reviews={restaurant.reviews}
                hashtags={restaurant.serviceMetaInfo.hashtags}
                minimal
                key={i}
              />
            ))
          : null}
      </SpinnerFallback>
      <Pagination maxPages={3} />
    </div>
  );
};
