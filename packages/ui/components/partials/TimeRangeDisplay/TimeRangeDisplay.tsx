import React from "react";
import { SeperatedStringArray } from "utils";

export interface TimeRangeDispalyProps {
  rangeInMinutes: number[];
}

export const TimeRangeDisplay: React.FC<TimeRangeDispalyProps> = ({
  rangeInMinutes,
}) => {
  function formatMinutes(minutes: number): string {
    if (minutes > 59) {
      const hrs = Math.floor(minutes / 60);
      const reminingMins = minutes % 60;
      const reminingPercent = (reminingMins / 60) * 100;
      return `${hrs}${
        reminingMins > 0 ? `:${reminingMins}` : ""
        // reminingPercent > 10 ? `.${reminingPercent.toFixed()}` : ""
      } hrs`;
    }
    return `${minutes} mins`;
  }

  return (
    <p>
      {SeperatedStringArray(
        rangeInMinutes.map((dur, i) => formatMinutes(dur)),
        "-"
      )}
    </p>
  );
};
