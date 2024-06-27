import React from "react";
import { useTranslation } from "react-i18next";
import {
  ImageSlider,
  AspectRatio,
  PriceConverter,
  PercentIcon,
  CommentIcon,
  PriceLevelDisplay,
  Button,
  ServicesRequestKeys,
} from "@UI";
import { BiStar } from "react-icons/bi";
import { useRouting } from "routing";

export interface ResturantRecommendedCardProps {
  price: number;
  thumbnail: string;
  title: string;
  rating: number;
  reviews: number;
  location: {
    city: string;
    country: string;
    address: string;
  };
  hashtags: string[];
  minimal?: boolean;
}

export const ResturantRecommendedCard: React.FC<
  ResturantRecommendedCardProps
> = (props) => {
  const isGoodDeal = true;

  const { visit } = useRouting();
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-2 w-full">
      <AspectRatio className="w-full group" ratio={3 / 4}>
        <ImageSlider images={[props.thumbnail]} />
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
              routes.visitService(props, ServicesRequestKeys.restaurant),
            )
          }
        >
          {t("Details")}
        </Button>
      </AspectRatio>
      <div className="flex flex-col gap-2 w-full">
        <p className="font-semibold uppercase">
          {props.location?.city}, {props.location?.country}
        </p>
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-2 text-lg text-gray-600">
            <p className="text-xl font-bold">{props.title}</p>
            <p>{props.location?.address}</p>
            <p>
              {t("Average price")}{" "}
              {PriceConverter({ amount: props.price, symbol: true })}
            </p>
            {/* <InfoText variant="fail">
              {discount.amount}% ${discount.rule}
            </InfoText> */}
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl flex gap-1 items-center font-bold">
              <BiStar /> {props.rating}
            </p>
            <div className="flex gap-1 items-center">
              <CommentIcon />
              <p>{props.reviews}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 sm:font-lg flex-wrap font-semibold">
          {Array.isArray(props.hashtags)
            ? props.hashtags.map((tag, i) => (
                <p key={i}>
                  {tag}
                  {i + 1 < props.hashtags.length ? "," : ""}
                </p>
              ))
            : null}
          {"-"}
          <PriceLevelDisplay amount={props.price} levels={[20, 40, 60]} />
        </div>
      </div>
    </div>
  );
};
