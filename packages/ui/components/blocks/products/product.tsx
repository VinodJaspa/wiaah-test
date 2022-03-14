import React, { useState, useEffect } from "react";
import { colorShades } from "../../helpers/colorShades";
import Link from "next/link";
import {
  AiFillStar,
  AiOutlineStar,
  AiFillHeart,
  AiOutlineHeart,
} from "react-icons/ai";
import { Rate } from "antd";
import { t } from "i18next";
interface ProductProps {
  name?: string;
  price?: number;
  oldPrice?: number;
  imgUrl?: string;
  rating?: number;
  cashback?: number;
  off?: number;
  saved?: boolean;
  url?: string;
}

export const Product: React.FC<ProductProps> = ({
  name = "",
  price = 0,
  oldPrice = 0,
  imgUrl,
  rating = 0,
  cashback = "",
  off = "",
  saved = false,
  url = "/products/product-url-here",
}) => {
  return (
    <>
      <Link href={url}>
        <div className="relative block max-w-xs cursor-pointer overflow-hidden rounded-lg border-2 border-cyan-400/30">
          <div className="relative block">
            <div className="aspect-[custum-aspect] overflow-hidden">
              <img src={imgUrl} alt="shop_img" className="w-full object-fill" />
            </div>

            {off ? (
              <div className="product-off absolute top-1 left-1 rounded-full bg-red-400 p-1 text-xs text-white">
                {cashback}% {t("Cashback", "Cashback")}
              </div>
            ) : (
              ""
            )}
            {cashback ? (
              <div className="product-cashback absolute bottom-1 right-1 rounded-full bg-red-400 p-1 text-xs text-white">
                {off}% {t("OFF", "OFF")}
              </div>
            ) : (
              ""
            )}
            {saved ? (
              <AiFillHeart className="absolute top-1 right-1 text-2xl text-red-400" />
            ) : (
              <AiOutlineHeart className="absolute top-1 right-1 text-2xl text-gray-400" />
            )}
          </div>
          <div className="text-slate-700">
            <div className="product-name ml-2 mt-2 font-bold">{name}</div>
            <div className="ml-2 mt-2 font-bold">
              <span className="product-price">${price}</span>
              {!oldPrice ? (
                ""
              ) : (
                <span className="product-old-price ml-1 text-xs text-slate-400 line-through">
                  ${oldPrice}
                </span>
              )}
            </div>
            <Rate
              disabled
              allowHalf
              value={rating}
              className="my-2 ml-2 text-sm text-orange-500"
            />
          </div>
        </div>
      </Link>
    </>
  );
};
Product.defaultProps = {
  name: "",
  price: 0,
  oldPrice: 0,
  saved: false,
  imgUrl: "/no-image.png",
  off: 0,
  cashback: 0,
  rating: 0,
};
