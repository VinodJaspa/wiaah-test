import React from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

export interface BuyerCommentProps {
  name?: string;
  date?: string;
  rating?: number;
  comment?: string;
}

export const BuyerComment: React.FC<BuyerCommentProps> = ({
  name,
  date,
  rating = 0,
  comment,
}) => {
  return (
    <>
      <div>
        <span className="mr-4 font-bold">{name}</span>
        <span className="text-gray-500">{date}</span>
      </div>
      <div className="mt-3">
        {rating <= 5 && rating >= 0 ? (
          <div className="product-rating flex items-center text-xl">
            {[...Array(rating)].map((_, i: number) => (
              <AiFillStar className="inline text-orange-500" key={i} />
            ))}
            {[...Array(5 - rating)].map((_, i: number) => (
              <AiOutlineStar className="inline text-orange-500" key={i} />
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="mt-3">{comment}</div>
      <div className="mt-3 h-px bg-gray-200"></div>
    </>
  );
};
