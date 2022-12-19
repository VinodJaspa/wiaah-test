import React from "react";
import { Divider, Rate } from "@UI";
export interface BuyerCommentProps {
  name: string;
  date: Date;
  rating: number;
  comment: string;
  product?: {
    name: string;
    description: string;
    thumbnailUrl: string;
  };
}

export const BuyerComment: React.FC<BuyerCommentProps> = ({
  name,
  date,
  rating = 0,
  comment,
  product,
}) => {
  return (
    <div className="w-full flex flex-col gap-2 bg-white">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <span className="font-semibold">{name}</span>
          <span className="text-gray-500">
            {new Date(date).toLocaleDateString("en", {
              weekday: "long",
              month: "long",
              year: "numeric",
              day: "numeric",
            })}
          </span>
        </div>
        <Rate allowHalf outOf={5} rating={rating} />
      </div>
      <div className="">{comment}</div>
      {product && (
        <>
          <div className="flex flex-col gap-4">
            <img
              className="h-16 w-28 object-cover"
              src={product.thumbnailUrl}
              alt={product.description}
            />
          </div>
        </>
      )}
      <Divider />
    </div>
  );
};
