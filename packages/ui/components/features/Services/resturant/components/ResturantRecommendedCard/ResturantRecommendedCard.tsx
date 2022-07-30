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
  Button,
  ServicesRequestKeys,
} from "ui";
import { useRouting } from "routing";

export interface ResturantRecommendedCardProps extends ResturantMetaDataType {
  minimal: boolean;
}

export const ResturantRecommendedCard: React.FC<
  ResturantRecommendedCardProps
> = (props) => {
  const {
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
    minimal,
  } = props;

  const { visit } = useRouting();
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-2 w-full">
      <AspectRatio className="w-full group" ratio={1}>
        <ImageSlider images={thumbnails} />
        {isGoodDeal ? (
          <span className="px-2 flex gap-1 items-center bg-slate-200 absolute top-4 left-4">
            <PercentIcon />
            <span>{t("Great Deal")}</span>
          </span>
        ) : null}

        <div className="absolute transition-all top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-25 pointer-events-none"></div>
        <Button
          className="absolute opacity-0 group-hover:opacity-100 transition-all top-1/2 left-1/2 -translate-x-1/2"
          onClick={() =>
            visit((routes) =>
              routes.visitService(props, ServicesRequestKeys.resturants)
            )
          }
        >
          {t("Details")}
        </Button>
      </AspectRatio>
      <div className="flex flex-col gap-2 w-full">
        <p className="font-semibold uppercase">{location?.country}</p>
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-2 text-lg text-gray-600">
            <p className="text-xl font-bold">{name}</p>
            <p>{location?.address}</p>
            <p>
              {t("Average price")}{" "}
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
