import React from "react";
import { Rate } from "@UI";

export interface BuyerCommentProps {
  name: string;
  date: Date;
  rating: number;
  comment: string;
  product?: any;
}

export const BuyerComment: React.FC<BuyerCommentProps> = ({
  name,
  date,
  rating = 0,
  comment,
  product,
}) => {
  return (
    <div className="w-full flex flex-col gap-2 bg-white py-2">
      {/* Reviewer info */}
      <div className="flex items-center gap-3">
        <img
          src={product.thumbnailUrl || "https://via.placeholder.com/40"}
          alt={name}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="font-medium text-sm text-gray-900">{name}</span>
          <span className="text-xs text-gray-500">
            {new Date(date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
            })}{" "}
            ago
          </span>
        </div>
      </div>

      {/* Rating */}
      <Rate allowHalf outOf={5} rating={rating} className="mt-1" />

      {/* Comment */}
      <p className="text-sm text-gray-700 leading-snug">{comment}</p>
    </div>
  );
};
