import React from "react";
import { useTranslation } from "react-i18next";
import {
  BuyerComment,
  Pagination,
  Rate,
  SectionHeader,
  usePaginationControls,
} from "@UI";
import { useGetMyReviewsQuery } from "@features/Products";

export type ReviewData = {
  username: string;
  utcDate: string;
  rating: number;
  review: string;
  productId: string;
};

export interface ReviewsSectionProps {}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({}) => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();

  const { controls, pagination, changeTotalItems } = usePaginationControls();
  const { data, isLoading, isError } = useGetMyReviewsQuery({
    pagination,
  });

  React.useEffect(() => {
    if (data?.sellerProductsRating) {
      if (controls.totalItems !== data.sellerProductsRating.reviews) {
        changeTotalItems(data.sellerProductsRating.reviews);
      }
    }
  }, [data]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <SectionHeader sectionTitle={t("Reviews")} />
      <div className="shadow flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <span className="text-gray-500">
            {t("Average item review")} {data?.sellerProductsRating.rating}{" "}
            {t("out of")} 5 {t("stars")}
          </span>
          <Rate rating={data?.sellerProductsRating.rating || 0} />(
          {data?.sellerProductsRating.reviews})
        </div>
        <span className="text-gray-500">
          {t("showing", "Showing")} {data?.reviews.length} {t("of", "of")}{" "}
          {data?.sellerProductsRating.reviews}
        </span>
        <div className="flex flex-col gap-4">
          {data?.reviews?.map((review, i) => {
            return (
              <BuyerComment
                key={i}
                comment={review.message}
                date={review.createdAt}
                name={review.reviewer.profile?.username || "User"}
                rating={review.rate}
                product={{
                  name: review.product.title || "",
                  description: review.product.description,
                  thumbnailUrl: review.product.thumbnail,
                }}
              />
            );
          })}
        </div>
        <Pagination></Pagination>
      </div>
    </div>
  );
};
