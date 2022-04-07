import React from "react";

export interface useDateProps {
  from: Date;
  to: Date;
}

export interface useDateReturnType {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const useDateDiff = ({ from, to }: useDateProps): useDateReturnType => {
  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

  const start = new Date(from).getTime();
  const end = new Date(to).getTime();

  const distance = end - start;

  const days = Math.floor(distance / day);
  const hours = Math.floor((distance % day) / hour);
  const minutes = Math.floor((distance % hour) / minute);
  const seconds = Math.floor((distance % minute) / second);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};
