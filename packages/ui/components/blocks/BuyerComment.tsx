import React from "react";
import { Rate } from "antd";
import { ProductCardProps } from "./ProductCard";
import { Divider, Spacer } from "../partials";
export interface BuyerCommentProps {
  name: string;
  date: string;
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
    <div className="w-full bg-white">
      <div>
        <span className="mr-4 font-bold">{name}</span>
        <span className="text-gray-500">{date}</span>
      </div>
      <div className="">
        <Rate disabled allowHalf value={rating} className="" />
      </div>
      <Spacer spaceInRem={0.5} />
      <div className="">{comment}</div>
      {product && (
        <>
          <Spacer />
          <div className="flex gap-4">
            <img
              className="h-16 w-28 object-cover"
              src={product.thumbnailUrl}
              alt={product.description}
            />
            <div className="flex flex-col gap-2">
              <span>{product.name}</span>
              <span>{product.description}</span>
            </div>
          </div>
        </>
      )}
      <Spacer />
      <Divider />
    </div>
  );
};
