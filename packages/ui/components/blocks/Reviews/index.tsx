import React from "react";
import { usePublishRef } from "state";
import { Spacer } from "ui";
import { BuyerComment, BuyerCommentProps } from "../BuyerComment";

interface ReviewsProps {
  reviews: BuyerCommentProps[];
  id: string;
}

export const Reviews: React.FC<ReviewsProps> = ({ reviews, id }) => {
  const reviewsRef = usePublishRef("reviews");
  return (
    <div ref={reviewsRef} id={id} className="flex w-full flex-col">
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
