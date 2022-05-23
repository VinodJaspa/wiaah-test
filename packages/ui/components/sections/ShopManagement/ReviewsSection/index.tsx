import React from "react";
import { useTranslation } from "react-i18next";
import { IoRemoveCircleSharp } from "react-icons/io5";
import { BuyerComment, Divider } from "ui";
import { products } from "../../../../placeholder";
import { randomNum } from "../../../helpers";
import { Rate } from "../../../partials";

export type ReviewData = {
  username: string;
  utcDate: string;
  rating: number;
  review: string;
  productId: string;
};

export interface ReviewsSectionProps {}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({}) => {
  const { t } = useTranslation();
  const totalReviewsScore = reviews.reduce((accum, current) => {
    return (accum += current.rating);
  }, 0);
  const average = ((reviews.length * 5) / totalReviewsScore).toFixed(1);
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-1 w-full">
        <p className="text-xl ">{t("reviews", "Reviews")}</p>
        <Divider className="border-primary" />
      </div>
      <div className="shadow flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <span className="text-gray-500">
            {t("average_item_review", "Average item review")} {average}{" "}
            {t("out_of", "out of")} 5 {t("stars", "stars")}
          </span>
          <Rate rating={parseInt(average)} />({reviews.length})
        </div>
        <span className="text-gray-500">
          {t("showing", "Showing")} {reviews.length}-{reviews.length}{" "}
          {t("of", "of")} {reviews.length}
        </span>
        <div className="flex flex-col gap-4">
          {reviews.map((review, i) => {
            const p = products.find((p) => p.id === review.productId);
            return (
              <BuyerComment
                key={i}
                comment={review.review}
                date={new Date(review.utcDate)}
                name={review.username}
                rating={review.rating}
                product={{
                  name: p?.name || "",
                  description: "description",
                  thumbnailUrl: p?.imgUrl || "/shop.jpeg",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const reviews: ReviewData[] = [...Array(15)].map((_, i) => ({
  productId: `${i}`,
  rating: randomNum(5),
  review: "good product",
  username: "wiaah  user",
  utcDate: new Date(Date.now()).toUTCString(),
}));
