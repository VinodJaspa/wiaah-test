import { t } from "i18next";
import React from "react";

export interface useDateProps {
  from: Date;
  to: Date;
}

export interface SinceReturn {
  value: number;
  timeUnit: string;
  timeUnitNarrow: string;
}

export interface useDateReturnType {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  getSince: () => SinceReturn;
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

  const years = days / 365;
  const months = days / 30;
  const weeks = days / 7;

  function getSince(): SinceReturn {
    if (seconds < 0)
      return {
        timeUnit: t("seconds", "seconds"),
        timeUnitNarrow: "s",
        value: 0,
      };
    if (days > 365) {
      return {
        timeUnit: t("years", "years"),
        timeUnitNarrow: "y",
        value: Math.floor(years),
      };
    } else if (days > 30) {
      return {
        timeUnit: t("months", "months"),
        timeUnitNarrow: "mo",
        value: Math.floor(months),
      };
    } else if (days > 7) {
      return {
        timeUnit: t("weeks", "weeks"),
        timeUnitNarrow: "w",
        value: Math.floor(weeks),
      };
    } else if (days > 1) {
      return {
        timeUnit: t("days", "days"),
        timeUnitNarrow: "d",
        value: Math.floor(days),
      };
    } else if (hours > 1) {
      return {
        timeUnit: t("hours", "hours"),
        timeUnitNarrow: "h",
        value: Math.floor(hours),
      };
    } else if (minutes > 1) {
      return {
        timeUnit: t("minutes", "minutes"),
        timeUnitNarrow: "m",
        value: Math.floor(minutes),
      };
    } else {
      return {
        timeUnit: t("seconds", "seconds"),
        timeUnitNarrow: "s",
        value: Math.floor(seconds),
      };
    }
  }

  return {
    days,
    hours,
    minutes,
    seconds,
    getSince,
  };
};
