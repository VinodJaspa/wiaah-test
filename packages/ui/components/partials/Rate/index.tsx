import React from "react";
import { BsStarFill, BsStar, BsStarHalf } from "react-icons/bs";
import { HtmlDivProps } from "types";

export interface RateProps extends HtmlDivProps {
  rating: number;
  outOf?: number;
  allowHalf?: boolean;
}

export const Rate: React.FC<RateProps> = ({
  outOf = 5,
  rating,
  allowHalf,
  className,
  ...props
}) => {
  const reminder = rating % 1;
  const half: boolean = reminder >= 0.5;
  return (
    <div
      {...props}
      className={`${className || ""} flex text-primary items-center gap-2`}
    >
      {[...Array(outOf)].map((_, i) => (
        <React.Fragment key={i}>
          {i < Math.floor(rating) ? (
            <BsStarFill key={i} />
          ) : half && allowHalf && Math.floor(rating) === i ? (
            <BsStarHalf key={i} />
          ) : (
            <BsStar key={i} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
