import { useDateDiff } from "ui/Hooks";
import React, { useEffect, useState } from "react";

export interface CountdownProps {
  days?: boolean;
  hours?: boolean;
  minutes?: boolean;
  seconds?: boolean;
  toDate: Date;
  fromDate?: Date;
}

export const Countdown: React.FC<CountdownProps> = ({
  days,
  hours,
  minutes,
  seconds,
  fromDate = new Date(Date.now()),
  toDate,
}) => {
  const {
    days: d,
    hours: h,
    minutes: m,
    seconds: s,
  } = useDateDiff({ from: fromDate, to: toDate });
  const [interval, setInterval] = useState(false);
  const All = !days && !hours && !minutes && !seconds;

  useEffect(() => {
    setTimeout(() => {
      setInterval((_) => !_);
    }, 1000);
  }, [interval]);

  return (
    <div className="grid grid-cols-2 gap-4 text-white w-full md:grid-cols-4">
      {(All || days) && (
        <div className="flex flex-col items-center text-[1.5rem]">
          <span className="font-bold text-5xl">{d}</span>
          <span className="font-semibold uppercase">days</span>
        </div>
      )}
      {(All || hours) && (
        <div className="flex flex-col items-center text-[1.5rem]">
          <span className="font-bold text-5xl">{h}</span>
          <span className="font-semibold uppercase">hours</span>
        </div>
      )}
      {(All || days) && (
        <div className="flex flex-col items-center text-[1.5rem]">
          <span className="font-bold text-5xl">{m}</span>
          <span className="font-semibold uppercase">minutes</span>
        </div>
      )}
      {(All || days) && (
        <div className="flex flex-col items-center text-[1.5rem]">
          <span className="font-bold text-5xl">{s}</span>
          <span className="font-semibold uppercase">seconds</span>
        </div>
      )}
    </div>
  );
};
