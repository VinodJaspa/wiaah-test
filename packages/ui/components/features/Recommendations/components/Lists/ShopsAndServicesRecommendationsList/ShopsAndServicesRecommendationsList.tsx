import { usePagination } from "hooks";
import React from "react";
import { useRouting } from "routing";
import {
  useGetRecommendedShopsQuery,
  useSearchFilters,
  SpinnerFallback,
  HotelSearchCard,
  ResturantRecommendedCard,
  PractitionerSearchResultsCard,
  VehicleSearchCard,
  PaginationWrapper,
  BeautyCenterRecommendedSearchCard,
  RecommendedShopCard,
} from "ui";

export interface ShopsAndServicesRecommendationsList {}

export const ShopsAndServicesRecommendationsList: React.FC<
  ShopsAndServicesRecommendationsList
> = () => {
  const { visit } = useRouting();
  const { page, take } = usePagination(24);
  const { filters } = useSearchFilters();
  const {
    data: res,
    isLoading,
    isError,
  } = useGetRecommendedShopsQuery({ page, take }, filters);

  return (
    <PaginationWrapper>
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {res
            ? res.data.map((data, i) => {
                return (
                  <RecommendedShopCard
                    key={`${data.id}-${i}`}
                    onShopClick={() => {
                      visit((routes) =>
                        routes.visitRecommendedServiceOrShop(data)
                      );
                    }}
                    imgUrl={data.thumbnail}
                    name={data.name}
                    id={data.id}
                    type={data.type}
                    label={data.label}
                  />
                );
              })
            : null}
        </div>
      </SpinnerFallback>
    </PaginationWrapper>
  );
};
