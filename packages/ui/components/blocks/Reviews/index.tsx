import React from "react";
import { usePublishRef } from "state";
import { BuyerComment, BuyerCommentProps } from "../BuyerComment";
import { Spacer } from "../../partials/";

interface ReviewsProps {
  reviews: BuyerCommentProps[];
  id: string;
}

export const Reviews: React.FC<ReviewsProps> = ({ reviews, id }) => {
  const reviewsRef = usePublishRef("reviews");
  return (
    <div ref={reviewsRef} id={id} className="flex w-full flex-col py-4">
      <h1 className="w-full text-start text-md font-bold">Reviews</h1>
      <Spacer />
      <div className="flex flex-col gap-4">
        {reviews.map((review, i) => (
          <BuyerComment key={i} {...review} />
        ))}
      </div>
    </div>
  );
};
