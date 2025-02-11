import React from "react";
import { useTranslation } from "react-i18next";
import {
  AspectRatio,
  HeartIcon,
  PriceDisplay,
  VerifiedIcon,
  UnDiscountedPriceDisplay,
  Avatar,
  Rate,
} from "@UI";
import { mapArray } from "utils";

export interface ProductSearchCardProps {
  sellerInfo: {
    name: string;
    thumbnail: string;
    profession: string;
    verified: boolean;
  };
  productInfo: {
    title: string;
    price: number;
    discount: number;
    rating: number;
    reviewsCount: number;
    cashback: number;
    thumbnail: string;
    colors: string[];
  };
}

export const ProductSearchCard: React.FC<ProductSearchCardProps> = ({
  productInfo,
  sellerInfo,
}) => {
  const { cashback, discount, rating, reviewsCount, title, colors, thumbnail } =
    productInfo;

  const { t } = useTranslation();
  return (
    <div className="flex flex-col w-full">
      <AspectRatio ratio={1}>
        <div className="w-full h-full rounded-xl overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={thumbnail}
            alt={title}
          />
          <div className="px-4 text-primary bg-white rounded-lg absolute top-3 left-4 py-2 flex gap-1 text-xs font-bold">
            <PriceDisplay price={cashback} />
            <p>{t("Cashback")}</p>
          </div>
          <div
            style={{ backdropFilter: "blur(5px)" }}
            className="absolute top-3 right-4 w-7 h-7 bg-white flex justify-center items-center bg-opacity-10"
          >
            <HeartIcon className="text-white fill-white text-sm" />
          </div>
          <div
            style={{ backdropFilter: "blur(5px)" }}
            className="absolute rounded-b-2xl text-white flex px-4 items-center justify-between bottom-0 left-0 h-[18%] z-10 w-full bg-black bg-opacity-10"
          >
            <div className="flex gap-2 items-center">
              <Avatar
                src={sellerInfo.thumbnail}
                className={
                  "-translate-y-1/4 rounded-full border-2 border-white"
                }
              />
              <div className="flex items-center gap-1">
                <p className="font-bold text-xs">{sellerInfo.name}</p>
                {sellerInfo.verified ? (
                  <VerifiedIcon className="text-[0.563rem]" />
                ) : null}
              </div>
            </div>

            <div className="flex items-center gap-1">
              <PriceDisplay
                className="text-sm font-extrabold"
                price={productInfo.price}
              />
              <UnDiscountedPriceDisplay
                className="text-xs font-normal"
                amount={productInfo.price}
                discount={productInfo.discount}
              />
            </div>
          </div>
        </div>
      </AspectRatio>
      <div className="py-3 bg-white flex flex-col gap-2">
        <div className="flex gap-1 justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-black font-bold">{title}</p>
            <div className="flex gap-1 items-center">
              <Rate rating={rating} />
              <p className="text-[0.5rem] text-lightBlack font-semibold">{`(${reviewsCount} ${t(
                "Reviews",
              )})`}</p>
            </div>
          </div>
          <p className="font-semibold text-xs px-5 py-[0.625rem] h-fit w-fit bg-primary-50 rounded-full">
            {discount}% {t("off")}
          </p>
        </div>
        <div className="flex gap-[0.875rem] flex-wrap">
          {mapArray(colors, (color, i) => (
            <div
              key={i}
              style={{
                backgroundColor: color,
                borderWidth: color === "#fff" ? 1 : 0,
              }}
              className="h-4 w-4 border-black rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
