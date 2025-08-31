import {
  AspectRatio,
  Avatar,
  HeartIcon,
  PriceDisplay,
  Rate,
  UnDiscountedPriceDisplay,
  VerifiedIcon,
} from "@UI";
import Link from "next/link";
import ImageTopbadge from "@UI/components/shadcn-components/components/imageTopbadge";
import React from "react";
import { useTranslation } from "react-i18next";
import { mapArray } from "utils";

export interface ProductSearchCardProps {
  sellerInfo: {
    name: string;
    thumbnail: string;
    profession: string;
    id?:string;
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
    <div className="flex flex-col w-full bg-white rounded-2xl shadow-sm hover:shadow-md transition">
      {/* Thumbnail */}
      <AspectRatio ratio={1} className="relative">
        {/* Cashback badge */}
        {cashback > 0 && (
          <ImageTopbadge text={t("$" + "" + `${cashback} Cashback`)} />

        )}
        <img
          className="w-full h-full object-cover"
          src={thumbnail}
          alt={title}
        />
        {/* Wishlist heart */}
        <div
          style={{ backdropFilter: "blur(5px)" }}
          className="absolute top-3 right-3 w-8 h-8 bg-white bg-opacity-20 rounded-full flex justify-center items-center shadow"
        >
          <HeartIcon className="text-white fill-white text-sm" />
        </div>
       {/* Seller & Price Bar */}
       <div
          style={{ backdropFilter: "blur(5px)" }}
          className="absolute bottom-0 left-0 w-full h-[22%] bg-black/40 flex items-center justify-between px-2 sm:px-3"
        >
          {/* Seller */}
          <Link
            href={`/profile/${sellerInfo.id}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 flex-shrink-0"
          >
            <Avatar
              src={sellerInfo.thumbnail}
              className="rounded-full border-2 border-white w-7 h-7 sm:w-8 sm:h-8"
            />
            <div className="flex items-center gap-1">
              <p className="font-bold text-[0.7rem] sm:text-xs truncate max-w-[90px] text-white">
                {sellerInfo.name}
              </p>
              {sellerInfo.verified && (
                <VerifiedIcon className="text-[0.55rem] sm:text-[0.6rem]" />
              )}
            </div>
          </Link>
</div>
      </AspectRatio>

      {/* Details Section */}
      <div className="p-4 flex flex-col gap-3">
        {/* Title + Rating + Discount */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <p className="text-sm sm:text-base text-black font-bold line-clamp-2">
              {title}
            </p>
            {/* <div className="flex gap-1 items-center">
              <Rate rating={rating} />
              <p className="text-[0.65rem] text-gray-600 font-medium">
                ({reviewsCount} {t("Reviews")})
              </p>
            </div> */}
          </div>

          {discount > 0 && (
            <p className="font-semibold text-xs sm:text-sm px-3 py-1 bg-primary-50 text-primary rounded-full whitespace-nowrap">
              {discount}% {t("off")}
            </p>
          )}
        </div>

        {/* Color Swatches */}
        {/* {colors?.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {mapArray(colors, (color, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: color,
                  borderWidth: color === "#fff" ? 1 : 0,
                }}
                className="h-5 w-5 border border-gray-400 rounded-full shadow-sm"
              />
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
};

