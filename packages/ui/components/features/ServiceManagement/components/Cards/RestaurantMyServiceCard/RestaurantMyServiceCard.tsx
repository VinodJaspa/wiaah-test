import { RestaurantMyServiceDataType } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { ResturantRecommendedCard, Badge, TrashIcon, EditIcon } from "ui";

export interface RestaurantMyServiceCardProps
  extends RestaurantMyServiceDataType {}

export const RestaurantMyServiceCard: React.FC<
  RestaurantMyServiceCardProps
> = () => {
  const { t } = useTranslation();
  return (
    <div className="flex border p-2 rounded border-gray-400 w-full justify-between">
      <div className="w-[13rem]">
        <ResturantRecommendedCard
          id="12"
          averagePrice={30}
          discount={{ amount: 15, rule: "" }}
          isGoodDeal={true}
          name={"restruent name"}
          rate={4}
          location={{
            address: "address",
            city: "city",
            cords: {
              lat: 15,
              lng: 16,
            },
            country: "country",
            countryCode: "CHF",
            postalCode: 1565,
            state: "state",
          }}
          reviewsCount={750}
          tags={["pizza", "pasta"]}
          thumbnails={["/shop-3.jpeg"]}
        />
      </div>
      <div className="flex flex-col items-end text-xl gap-6">
        <Badge>{t("Restaurant")}</Badge>
        <div className="flex gap-2 text-3xl">
          <EditIcon />
          <TrashIcon className="text-secondaryRed" />
        </div>
      </div>
    </div>
  );
};
