import React from "react";
import { DateDayComponentProps } from "ui";

export interface ResturantFindTableFilterDateDayComponentProps
  extends DateDayComponentProps {}

export const ResturantFindTableFilterDateDayComponent: React.FC<
  ResturantFindTableFilterDateDayComponentProps
> = ({ dayNum, active, currentMonth }) => {
  return (
    <span
      className={`${
        currentMonth ? "cursor-pointer" : "cursor-not-allowed text-gray-400"
      } ${
        active ? "bg-primary text-white" : "text-black bg-gray-200"
      } h-12 w-12 rounded-lg flex justify-center items-center `}
    >
      {dayNum}
    </span>
  );
};
