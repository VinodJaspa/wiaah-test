import React from "react";
import { DateDayComponentProps, AspectRatio } from "@UI";

export interface ResturantFindTableFilterDateDayComponentProps
  extends DateDayComponentProps {}

export const ResturantFindTableFilterDateDayComponent: React.FC<
  ResturantFindTableFilterDateDayComponentProps
> = ({ dayNum, active, currentMonth }) => {
  return (
    <AspectRatio ratio={1}>
      <span
        className={`${
          currentMonth ? "cursor-pointer" : "cursor-not-allowed text-gray-400"
        } ${
          active ? "bg-primary text-white" : "text-black bg-gray-200"
        } h-full w-full rounded-lg flex justify-center items-center `}
      >
        {dayNum}
      </span>
    </AspectRatio>
  );
};
