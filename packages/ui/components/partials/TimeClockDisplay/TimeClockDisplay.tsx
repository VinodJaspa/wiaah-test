import React from "react";
import { DateDetails } from "utils";
import { AspectRatio } from "@UI";
export interface TimeClockDisplayProps {
  from: Date;
  to: Date;
  off?: boolean;
}

export const TimeClockDisplay: React.FC<TimeClockDisplayProps> = ({
  from: _from,
  to: _to,
  off = false,
}) => {
  const from = DateDetails(_from);
  const to = DateDetails(_to);
  if (!from || !to) return null;
  const circleDashArray = 12.6;
  const ringDashArray = 106.6;
  const dayMins = 60 * 12;

  const fromMins = parseInt(from.hour) * 60 + parseInt(from.minute);
  const toMins = parseInt(to.hour) * 60 + parseInt(to.minute);

  const diff = toMins - fromMins;

  const percentage = diff / dayMins;
  const fromHourInt = parseInt(from.hour);
  const toHourInt = parseInt(to.hour);
  const fromHour12Format = fromHourInt > 12 ? fromHourInt - 12 : fromHourInt;
  const toHour12Format = toHourInt > 12 ? toHourInt - 12 : toHourInt;

  const circleDashoffset = percentage * circleDashArray;
  const ringDashoffset = percentage * ringDashArray;

  const circlePercentage = fromHour12Format / 12;
  const circleDeg = circlePercentage * 360 - 90;

  const fromHourRotation = circlePercentage * 360;
  const toHourRotation = circlePercentage * 360 + percentage * 360;

  return (
    <AspectRatio ratio={1}>
      <div
        className={`${off ? "border-grayText" : "border-black"
          } relative border w-full h-full rounded-full`}
      >
        {[...Array(12)].map((_, i) => {
          const percentage = (i + 1) / 12;
          const rotation = percentage * 360;

          return (
            <div
              style={{
                rotate: `${rotation}deg`,
                translate: "-50%",
              }}
              className="absolute top-1/2 origin-top -translate-y-full left-1/2 z-10 h-[45%] w-[5%] flex items-start justify-start"
            >
              <span
                className={`${off ? "bg-grayText" : "bg-black"
                  } h-1/5 w-full rounded-full `}
              ></span>
            </div>
          );
        })}

        <div
          className={`absolute h-[10%] w-[10%] z-20 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${off ? "border-grayText bg-grayText" : "bg-primary border-black"
            }`}
        ></div>

        {off ? null : (
          <>
            <div
              style={{
                rotate: `${fromHourRotation}deg`,
                translate: "-50% -100%",
              }}
              className="absolute z-10 top-1/2 left-1/2 w-[5%] origin-bottom h-[80%] text-lg font-medium flex items-end justify-start"
            >
              <p className="h-1/4 rounded-full w-full bg-black"></p>
            </div>
            <div
              style={{
                rotate: `${toHourRotation}deg`,
                translate: "-50% -100%",
              }}
              className="absolute z-10 top-1/2 left-1/2 w-[5%] origin-bottom h-[80%] text-lg font-medium  flex items-end justify-start"
            >
              <p className="h-1/4 rounded-full w-full bg-black"></p>
            </div>

            <div
              style={{
                rotate: `${toHourRotation}deg`,
                translate: "-50% -100%",
              }}
              className="absolute top-1/2 left-1/2 py-2 origin-bottom h-[80%] font-medium flex items-start justify-end"
            >
              <svg
                style={{
                  rotate: `${toHourRotation + 80}deg`,
                  translate: "-115% -70%",
                }}
                className={"origin-center"}
                width={`${1 / 3}em`}
                height="1em"
                viewBox="0 0 4 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.82673 10.1905C3.95763 11.0694 2.73582 11.4257 2.37378 10.6142L0.155864 5.64283C0.0860244 5.48628 0.0708747 5.3108 0.112851 5.14461L1.04228 1.46478C1.24668 0.65553 2.41528 0.713744 2.53824 1.5393L3.82673 10.1905Z"
                  fill="currentColor"
                />
              </svg>
            </div>

            <div
              style={{
                rotate: `${fromHourRotation}deg`,
                translate: "-50% -100%",
              }}
              className="absolute top-1/2 left-1/2 origin-bottom h-[80%] font-medium flex justify-end"
            >
              <p
                className="h-fit text-[10px]"
                style={{
                  rotate: `-${fromHourRotation}deg`,
                  translate: "-50%",
                }}
              >
                {from.hour}
              </p>
            </div>
            <div
              style={{
                rotate: `${toHourRotation}deg`,
                translate: "-50% -100%",
              }}
              className="absolute top-1/2 left-1/2 origin-bottom h-[80%] font-medium  flex items-start justify-end"
            >
              <p
                className="-translate-x-full text-[10px] h-fit"
                style={{
                  rotate: `-${toHourRotation}deg`,
                  translate: "-25%",
                }}
              >
                {to.hour}
              </p>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
              <svg
                style={{
                  strokeDasharray: ringDashArray,
                  strokeDashoffset: ringDashArray - ringDashoffset,
                  rotate: `${circleDeg}deg`,
                }}
                className={"text-6xl"}
                width="1em"
                height="1em"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="18"
                  cy="18"
                  r="17"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
            </div>
            <svg
              style={{
                strokeDasharray: circleDashArray,
                strokeDashoffset: circleDashArray - circleDashoffset,
                rotate: `${circleDeg}deg`,
              }}
              width="100%"
              height="100%"
              viewBox="0 0 8 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="4"
                cy="4"
                r="2"
                stroke="currentColor"
                strokeWidth="4"
              />
            </svg>
          </>
        )}
      </div>
    </AspectRatio>
  );
};
