import {
  AspectRatio,
  HeartIcon,
  PriceDisplay,
  UnDiscountedPriceDisplay,
  Rate,

} from "@UI";
import ImageTopbadge from "@UI/components/shadcn-components/components/imageTopbadge";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import { mapArray } from "utils";

export interface ProductCardProps {
  productInfo: {
    id: string;
    title: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    rating?: number;
    reviewsCount?: number;
    cashback?: number;
    thumbnail: string;
    colors?: string[];
    sizes?: string[];
  };
}

export const ProductSearchCard: React.FC<ProductCardProps> = ({ productInfo }) => {
  const {id, cashback, discount, rating, reviewsCount, title, colors, thumbnail, price, originalPrice, sizes } =
    productInfo;

  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-52">
      {/* Image with cashback + heart */}
      <AspectRatio ratio={3 / 4}>
      <Link href={`/shop/product/${encodeURIComponent(id)}`}>
        <div className="w-full h-full rounded-xl overflow-hidden relative">
          <img
            className="w-full h-full object-cover"
            src={thumbnail}
            alt={title}
          />

          {/* Cashback badge */}
          <ImageTopbadge text={`${cashback}% ${t("Cashback")}`} />

          {/* Heart icon */}
          <div
            className="absolute top-3 right-3 w-7 h-7 bg-white flex justify-center items-center rounded-full shadow"
          >
            <HeartIcon className="text-black text-sm" />
          </div>
        </div>
        </Link>
      </AspectRatio>
   

      {/* Content */}
      <div className="py-3 bg-white flex flex-col gap-2">
        {/* Title */}
        <p className="text-sm text-black font-bold">{title}</p>

        {/* Price + discount */}
        <div className="flex items-center gap-2 text-sm">
          <PriceDisplay className="font-bold" price={price} />
          <UnDiscountedPriceDisplay
            className="line-through text-gray-400 text-xs"
            amount={originalPrice}
            discount={discount}
          />
          <p className="text-red-500 font-semibold text-xs">
            Save {discount}%
          </p>
        </div>

        {/* Sizes */}
        <p className="text-xs text-gray-500">
          Sizes: {sizes.join(", ")}
        </p>

        {/* Colors */}
        <div className="flex gap-2">
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

        {/* Rating */}
        <p className="text-xs text-gray-500">
          <Rate rating={rating} /> {rating} ({reviewsCount} {t("reviews")})
        </p>
      </div>
    </div>
  );
};
