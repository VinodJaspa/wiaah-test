import React from "react";
import { useRouting } from "routing";
import { RecommendedShopCard, RecommendedShopCardProps } from "@UI";

export interface ShopsAndServicesRecommendationsList {
  shops: RecommendedShopCardProps[];
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
                onShopClick={() => visit((r) => r.visitShop(data))}
                key={i}
                {...data}
              />
            );
          })
        : null}
    </div>
  );
};
