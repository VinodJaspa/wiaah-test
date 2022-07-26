import React from "react";
import { TimeCustomComponentProps, AspectRatio } from "ui";

export const ResturantReplacableTimeComponent: React.FC<
  TimeCustomComponentProps
> = ({ onClick, selected, time }) => {
  return (
    <div className="w-full">
      <AspectRatio ratio={1}>
        <div className="flex h-full justify-center items-center bg-gray-200 rounded">
          {time.hour}:{time.minutes}
        </div>
      </AspectRatio>
    </div>
  );
};
