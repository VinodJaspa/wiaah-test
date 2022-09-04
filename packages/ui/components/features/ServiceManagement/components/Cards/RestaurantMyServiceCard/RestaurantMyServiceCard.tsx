import { RestaurantMyServiceDataType } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  Badge,
  TrashIcon,
  EditIcon,
  AspectRatio,
  ImageSlider,
  PercentIcon,
  Button,
  InfoText,
  CommentIcon,
  PriceLevelDisplay,
  ServicesRequestKeys,
  PriceConverter,
  LocationAddressDisplay,
} from "ui";

export interface RestaurantMyServiceCardProps
  extends RestaurantMyServiceDataType {}

export const RestaurantMyServiceCard: React.FC<
  RestaurantMyServiceCardProps
> = () => {
  const { t } = useTranslation();
  const { visit } = useRouting();

  const props = {
    id: "12",
    averagePrice: 30,
    discount: { amount: 15, rule: "on drinks" },
    isGoodDeal: true,
    name: "restruent name",
    rate: 4,
    location: {
      address: "street name",
      city: "Geneve",
      cords: {
        lat: 15,
        lng: 16,
      },
      country: "switzerland",
      countryCode: "CHF",
      postalCode: 1565,
      state: "state",
    },
    reviewsCount: 750,
    tags: ["pizza", "pasta"],
    thumbnails: ["/shop-3.jpeg"],
  };
  const {
    averagePrice,
    discount,
    id,
    isGoodDeal,
    location,
    name,
    rate,
    reviewsCount,
    tags,
    thumbnails,
  } = props;

  return (
    <div className="flex flex-col sm:flex-row border p-2 rounded border-gray-400 w-full gap-2 justify-between">
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="min-w-[13rem]">
          <AspectRatio className="w-full group" ratio={1}>
            <ImageSlider images={thumbnails} />
            {isGoodDeal ? (
              <span className="px-2 flex gap-1 items-center bg-slate-200 absolute top-4 left-4">
                <PercentIcon />
                <span>{t("Great Deal")}</span>
              </span>
            ) : null}
          </AspectRatio>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-semibold uppercase">{location?.country}</p>
          <div className="flex justify-between gap-4 w-full">
            <div className="flex flex-col gap-2 text-lg text-gray-600">
              <div className="flex gap-2 items-center">
                <p className="text-xl font-bold">{name}</p>
                <p className="text-3xl font-bold">{rate}</p>
              </div>
              <LocationAddressDisplay {...location} />

              <InfoText variant="fail">
                {discount.amount}% {discount.rule}
              </InfoText>
            </div>
          </div>
          <div className="flex gap-2 sm:font-lg flex-wrap font-semibold">
            {Array.isArray(tags)
              ? tags.map((tag, i) => (
                  <p key={i}>
                    {tag}
                    {i + 1 < tags.length ? "," : ""}
                  </p>
                ))
              : null}
            {"-"}
            <PriceLevelDisplay amount={averagePrice} levels={[20, 40, 60]} />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col items-end text-xl gap-6">
          <Badge>{t("Restaurant")}</Badge>
          <div className="flex gap-2 text-3xl">
            <EditIcon />
            <TrashIcon className="text-secondaryRed" />
          </div>
        </div>

        <p className="text-lg font-semibold whitespace-nowrap">
          {t("Average price")}{" "}
          {PriceConverter({ amount: averagePrice, symbol: true })}
        </p>
      </div>
    </div>
  );
};
