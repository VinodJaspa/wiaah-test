import { usePagination } from "hooks";
import React from "react";
import { useRouting } from "routing";
import {
  SpinnerFallback,
  PaginationWrapper,
  RecommendedShopCard,
  useGetFilteredShopsQuery,
  Shop,
} from "@UI";

export interface ShopsAndServicesRecommendationsList {
  shops: Shop[];
}

export const ShopsAndServicesRecommendationsList: React.FC<
  ShopsAndServicesRecommendationsList
> = ({ shops }) => {
  const { visit } = useRouting();

  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {shops
        ? shops.map((data, i) => {
            return (
              <RecommendedShopCard
                key={`${data.id}-${i}`}
                onShopClick={() => {
                  visit((routes) => routes.visitRecommendedServiceOrShop(data));
                }}
                imgUrl={data.banner}
                name={data.name}
                id={data.id}
                type={data.storeType[0]}
                label={data.name}
              />
            );
          })
        : null}
    </div>
  );
};
