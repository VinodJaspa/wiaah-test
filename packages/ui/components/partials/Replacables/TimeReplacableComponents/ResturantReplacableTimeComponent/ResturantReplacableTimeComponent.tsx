import React from "react";
import { TimeCustomComponentProps, AspectRatio } from "ui";
import { format2digitNumber } from "utils";

export const ResturantReplacableTimeComponent: React.FC<
  TimeCustomComponentProps
> = ({ onClick, selected, time }) => {
  return (
    <div
      onClick={() => onClick && time.id && onClick(time.id)}
      className="w-full"
    >
      <AspectRatio ratio={1}>
        <div className="flex h-full justify-center items-center bg-gray-200 rounded">
          {format2digitNumber(time.hour)}:{format2digitNumber(time.minutes)}
        </div>
      </AspectRatio>
    </div>
  );
};
