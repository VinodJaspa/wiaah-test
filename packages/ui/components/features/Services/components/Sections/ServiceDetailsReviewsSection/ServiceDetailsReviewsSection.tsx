import { Avatar, Divider, ReviewLevelData, Stack, StarIcon } from "@partials";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { mapArray, setTestid } from "utils";

export interface ServiceDetailsReviewsSectionProps {
  overAllRating: number;
  ratingLevels: ReviewLevelData[];
  reviews: {
    name: string;
    date: string;
    content: string;
    thumbnail: string;
    ratings: number;
    bookedService: {
      id: string;
      image: string;
      name: string;
    };
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
      <Stack col divider={<Divider variant="vert" />} className="w-full">
        {/* <div className="grid gap-y-3 gap-9 grid-cols-1 md:grid-cols-2">
          {mapArray(ratingLevels, (rate, i) => (
            <ReviewLevel {...setTestid("ReviewLevel")} {...rate} key={i} />
          ))}
        </div> */}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
          {mapArray(
            reviews,
            ({ content, date, name, thumbnail, ratings, bookedService }, i) => (
              <div
                {...setTestid("ReviewComment")}
                className="flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <Avatar
                    className="min-w-[2.125rem] border-primary"
                    src={thumbnail}
                  />
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium text-title">{name}</p>
                    <p className="text-xs text-grayText">
                      {new Date(date).toLocaleDateString("en", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => {
                    const fullStars = Math.floor(ratings);
                    const hasHalfStar =
                      ratings % 1 !== 0 && index === fullStars;

                    return (
                      <div key={index}>
                        {index < fullStars ? (
                          <BsStarFill size={16} />
                        ) : hasHalfStar ? (
                          <BsStarHalf size={16} />
                        ) : (
                          <BsStar size={16} />
                        )}
                      </div>
                    );
                  })}
                </div>
                <p className="text-[0.813rem] font-normal text-[#2D2D2D]">
                  {content}
                </p>
                <div className="flex flex-col gap-1 text-grayText">
                  <p>Booked service:</p>
                  <Link href="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg overflow-hidden">
                      <img
                        src={bookedService?.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="underline">
                      {bookedService?.name.substring(0, 20)}...
                    </p>
                  </Link>
                </div>
              </div>
            ),
          )}
        </div>
      </Stack>
    </div>
  );
};
