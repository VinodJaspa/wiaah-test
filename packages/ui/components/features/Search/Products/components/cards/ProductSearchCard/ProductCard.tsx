"use client";
import { useState } from "react";
import { FaRegHeart, FaHeart, FaStar } from "react-icons/fa";
import { ProductSearchCardProps } from "./ProductSearchCard";
import ImageTopbadge from "@UI/components/shadcn-components/components/imageTopbadge";


export default function ProductCard({ productInfo }: ProductSearchCardProps) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="w-auto flex-shrink-0">
      {/* Image + Cashback + Wishlist */}
      <div className="relative">
        <img
          src={productInfo.thumbnail}
          alt={productInfo.title}
          className="w-full h-56 object-cover rounded-md"
        />

        {productInfo.cashback && (
            <ImageTopbadge text={`${productInfo.cashback}% Cashback`} />
         
      
        )}

        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-2 right-2 text-lg"
        >
          {liked ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="text-gray-600" />
          )}
        </button>
      </div>

      {/* Info */}
      <div className="mt-2 text-sm">
        <p className="font-medium line-clamp-2">{productInfo.title}</p>

        {/* Price + Discount */}
        <div className="flex items-center space-x-2">
          <span className="line-through text-gray-400 text-xs">
            ${(productInfo.price / (1 - productInfo.discount / 100)).toFixed(0)}
          </span>
          <span className="text-black font-semibold">${productInfo.price}</span>
        </div>
        <span className="text-red-500 text-xs font-semibold">
          Save {productInfo.discount}%
        </span>

        {/* Rating */}
        <div className="flex items-center mt-1 text-xs text-gray-600">
          {Array.from({ length: 5 }, (_, i) => (
            <FaStar
              key={i}
              className={
                i < Math.round(productInfo.rating)
                  ? "text-blue-500"
                  : "text-gray-300"
              }
            />
          ))}
          <span className="ml-1">({productInfo.rating.toFixed(1)})</span>
        </div>
      </div>
    </div>
  );
}
