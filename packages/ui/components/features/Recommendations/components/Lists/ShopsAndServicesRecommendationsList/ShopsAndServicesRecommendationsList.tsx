import { usePagination } from "hooks";
import React from "react";
import { useRouting } from "routing";
import {
  SpinnerFallback,
  PaginationWrapper,
  RecommendedShopCard,
  useGetFilteredShopsQuery,
} from "@UI";

export interface ShopsAndServicesRecommendationsList {}

export const ShopsAndServicesRecommendationsList: React.FC<
  ShopsAndServicesRecommendationsList
> = () => {
  const { visit } = useRouting();
  const { page, take } = usePagination(24);
  const {
    data: res,
    isLoading,
    isError,
  } = useGetFilteredShopsQuery({ pagination: { page, take } });

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
                    imgUrl={data.banner}
                    name={data.name}
                    id={data.id}
                    type={data.storeType}
                    label={data.name}
                  />
                );
              })
            : null}
        </div>
      </SpinnerFallback>
    </PaginationWrapper>
  );
};
