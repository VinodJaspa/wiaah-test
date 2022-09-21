import React from "react";
import { useTranslation } from "react-i18next";
import { ReviewLevel, ReviewLevelData, Avatar, StarIcon } from "ui";
import { mapArray, setTestid } from "utils";

export interface ServiceDetailsReviewsSectionProps {
  overAllRating: number;
  ratingLevels: ReviewLevelData[];
  reviews: {
    name: string;
    date: string;
    content: string;
    thumbnail: string;
  }[];
}

export const ServiceDetailsReviewsSection: React.FC<
  ServiceDetailsReviewsSectionProps
> = ({ overAllRating, ratingLevels, reviews }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex items-center gap-2">
        <p className="text-xl font-bold text-title">{t("Reviews")}</p>
        <StarIcon className="text-primary fill-primary text-xl" />
        <p className="text-primary font-bold text-xl">
          {overAllRating.toFixed(1)}
        </p>
      </div>
      <div className="flex flex-col w-full gap-10">
        <div className="grid gap-y-3 gap-9 grid-cols-1 md:grid-cols-2">
          {mapArray(ratingLevels, (rate, i) => (
            <ReviewLevel {...setTestid("ReviewLevel")} {...rate} key={i} />
          ))}
        </div>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
          {mapArray(reviews, ({ content, date, name, thumbnail }, i) => (
            <div
              {...setTestid("ReviewComment")}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-4">
                <Avatar src={thumbnail} />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-bold text-title">{name}</p>
                  <p className="text-xs text-grayText font-medium">
                    {new Date(date).toLocaleDateString("en", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <p className="text-sm font-normal text-lightBlack">{content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
