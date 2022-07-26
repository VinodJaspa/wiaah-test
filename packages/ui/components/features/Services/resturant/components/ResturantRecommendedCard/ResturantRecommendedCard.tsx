import { ResturantMetaDataType } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  ImageSlider,
  AspectRatio,
  PriceConverter,
  PercentIcon,
  CommentIcon,
  InfoText,
  PriceLevelDisplay,
} from "ui";

export interface ResturantRecommendedCardProps extends ResturantMetaDataType {}

export const ResturantRecommendedCard: React.FC<
  ResturantRecommendedCardProps
> = ({
  thumbnails,
  averagePrice,
  isGoodDeal,
  name,
  rate,
  reviewsCount,
  location,
  discount,
  tags,
  id,
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-2 w-full">
      <AspectRatio className="w-full" ratio={1}>
        <ImageSlider images={thumbnails} />
        {isGoodDeal ? (
          <span className="px-2 flex gap-1 items-center bg-slate-200 absolute top-4 left-4">
            <PercentIcon />
            <span>{t("Great Deal")}</span>
          </span>
        ) : null}
      </AspectRatio>
      <div className="flex flex-col gap-2 w-full">
        <p className="font-semibold uppercase">{location?.country}</p>
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-2 text-lg text-gray-600">
            <p className="text-xl font-bold">{name}</p>
            <p>{location?.address}</p>
            <p>
              {t("Averate price")}{" "}
              {PriceConverter({ amount: averagePrice, symbol: true })}
            </p>
            <InfoText variant="danger">
              {discount.amount}% ${discount.rule}
            </InfoText>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl font-bold">{rate}</p>
            <div className="flex gap-1 items-center">
              <CommentIcon />
              <p>{reviewsCount}</p>
            </div>
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
  );
};
