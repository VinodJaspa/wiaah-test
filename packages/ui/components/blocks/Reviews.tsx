import React from "react";
import { Spacer } from "../partials";
import { BuyerComment, BuyerCommentProps } from "./BuyerComment";

interface ReviewsProps {
  reviews: BuyerCommentProps[];
}

export const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  return (
    <div className="flex w-full flex-col">
      <h1 className="w-full text-center text-3xl font-bold">Reviews</h1>
      <Spacer />
      <div className="flex flex-col gap-4">
        {reviews.map((review, i) => (
          <BuyerComment key={i} {...review} />
        ))}
      </div>
    </div>
  );
};
