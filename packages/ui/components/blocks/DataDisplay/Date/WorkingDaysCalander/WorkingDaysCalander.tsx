import React from "react";
import { WorkingDayColumn } from "./WorkingDayColumn";
import { Slider, ArrowLeftIcon, ArrowRightIcon } from "@UI";
import { isSameMinute } from "utils";
import { ServiceDayWorkingHours } from "@features/API";
import { string } from "yup";
import { WorkingDate } from "@UI/../types/src";

export interface WorkingDaysCalenderProps {
  workingDates: {
    date: string;
    workingHoursRanges: {
      from: string;
      to: string;
    }[];
  }[];
  takenDates: {
    date: string;
    workingHoursRanges: {
      from: string;
      to: string;
    }[];
  }[];
}

interface SplitDay {
  day: Date;
  dates: Date[];
}
type WorkingHourRange = { from: string; to: string };
type InputData = { date: string; workingHoursRanges: WorkingHourRange[] };

function splitDatesByDay(data: InputData[]): SplitDay[] {
  const daysMap: { [key: string]: number } = {
    mo: 1,
    tu: 2,
    we: 3,
    th: 4,
    fr: 5,
    sa: 6,
    su: 0,
  };

  const dates: Date[] = [];

  for (const item of data) {
    const weekday = daysMap[item.date.toLowerCase()]; // Map to day index
    if (weekday === undefined) continue; // Skip invalid days

    for (const range of item.workingHoursRanges) {
      // Parse time ranges into `Date` objects
      const today = new Date();
      const start = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        parseInt(range.from.split(":")[0]),
        parseInt(range.from.split(":")[1]),
      );

      // Adjust `start` date to align with the specified weekday
      start.setDate(start.getDate() - start.getDay() + weekday);

      dates.push(start);
    }
  }

  // Use the original function logic to split the processed dates
  dates.sort((a, b) => a.getTime() - b.getTime());

  const splitDays: SplitDay[] = [];
  let currentDay: Date | null = null;
  let currentDayIndex = -1;

  for (const date of dates) {
    const day = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    if (currentDay === null || day.getTime() !== currentDay.getTime()) {
      currentDay = day;
      currentDayIndex++;
      splitDays[currentDayIndex] = {
        day: new Date(day),
        dates: [],
      };
    }

    splitDays[currentDayIndex].dates.push(new Date(date));
  }

  return splitDays;
}

export const WorkingDaysCalender: React.FC<WorkingDaysCalenderProps> = ({
  workingDates,
  takenDates,
}) => {
  const dates = splitDatesByDay(workingDates);

  return (
    <Slider
      rightArrowComponent={<ArrowRightIcon className="text-black" />}
      leftArrowComponent={<ArrowLeftIcon className="text-black" />}
      itemsCount={5}
      gap={8}
      containerProps={{
        style: { overflow: "visible" },
      }}
      childsWrapperProps={{
        className: "max-h-64 overflow-y-scroll thinScroll",
      }}
      arrowLeftProps={{
        className: "top-[1rem] text-4xl -translate-x-[100%] text-primary",
      }}
      arrowRightProps={{
        className: "top-[1rem] text-4xl translate-x-[calc(70%)] text-primary",
      }}
    >
      {Array.isArray(dates)
        ? dates.map((date, i) => (
          <WorkingDayColumn
            dates={date.dates.map((date) => ({
              date,
              available: true,
            }))}
            onClick={() => { }}
            dayDate={date.day}
            key={i}
          />
        ))
        : null}
    </Slider>
  );
};
