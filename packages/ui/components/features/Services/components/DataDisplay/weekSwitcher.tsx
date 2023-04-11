import { HStack } from "@partials";
import React from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

export const WeekSwitcher: React.FC<{
  date?: Date;
  onPrev: () => any;
  onNext: () => any;
}> = ({ date, onNext, onPrev }) => {
  return (
    <HStack className="">
      <BiChevronLeft
        onClick={() => onPrev && onPrev()}
        className="text-2xl text-primary"
      />
      <p className="text-lg font-bold">
        {new Date(date || new Date()).toLocaleDateString("en-us", {
          day: "numeric",
          month: "short",
        })}
        -
        {new Date(
          new Date(date || new Date()).setDate(
            new Date(date || new Date()).getDate() + 6
          )
        ).toLocaleDateString("en-us", {
          day: "numeric",
          month: "short",
        })}
      </p>
      <BiChevronRight
        onClick={() => onNext && onNext()}
        className="text-2xl text-primary"
      />
    </HStack>
  );
};
