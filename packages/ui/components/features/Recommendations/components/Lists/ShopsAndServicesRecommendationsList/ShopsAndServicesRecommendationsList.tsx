import React from "react";
import { useRouting } from "routing";
import { RecommendedShopCard } from "@UI";
import { Shop, StoreType } from "@features/API";

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
                label={
                  data.storeType[0] === StoreType.Product ? "Store" : data.type
                }
                // label={data.name}
              />
            );
          })
        : null}
    </div>
  );
};
