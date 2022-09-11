import React from "react";
import { DateDetails } from "utils";

export interface TimeClockDisplayProps {
  from: Date;
  to: Date;
}

export const TimeClockDisplay: React.FC<TimeClockDisplayProps> = ({
  from: _from,
  to: _to,
}) => {
  const from = DateDetails(_from);
  const to = DateDetails(_to);
  const circleDashArray = 12.6;
  if (!from || !to) return null;
  const dayMins = 60 * 12;

  const fromMins = parseInt(from.hour) * 60 + parseInt(from.minute);
  const toMins = parseInt(to.hour) * 60 + parseInt(to.minute);

  const diff = toMins - fromMins;

  const percentage = diff / dayMins;

  const circleDashoffset = percentage * circleDashArray;
  const circlePercentage = (parseInt(from.hour) - 1) / 12;
  const circleDeg = circlePercentage * 360;

  console.log({
    percentage,
    dayMins,
    fromMins,
    toMins,
    circleDashArray,
    circleDashoffset,
  });

  return (
    <div className="relative border-4 border-black rounded-full">
      {[...Array(12)].map((_, i) => {
        const percentage = (i + 1) / 12;
        const rotation = percentage * 360;

        return (
          <div
            style={{
              rotate: `${rotation}deg`,
            }}
            className="absolute top-1/2 origin-top -translate-y-full left-1/2 z-10 h-1/2 w-1 flex items-start py-2 justify-start"
          >
            <span className="h-3 w-full rounded-full bg-black"></span>
          </div>
        );
      })}
      <svg
        style={{
          strokeDasharray: circleDashArray,
          strokeDashoffset: circleDashArray - circleDashoffset,
          rotate: `-${circleDeg}deg`,
        }}
        className="text-9xl text-primary"
        width="1em"
        height="1em"
        viewBox="0 0 8 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="4" cy="4" r="2" stroke="currentColor" stroke-width="4" />
      </svg>
    </div>
  );
};
{
  /* <svg
  style={{
    strokeDasharray: 150,
    strokeDashoffset: 0,
  }}
  className="text-7xl"
  width="1em"
  height="1em"
  viewBox="0 0 36 36"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <circle cx="18" cy="18" r="17" stroke="black" stroke-width="2" />
</svg>; */
}
