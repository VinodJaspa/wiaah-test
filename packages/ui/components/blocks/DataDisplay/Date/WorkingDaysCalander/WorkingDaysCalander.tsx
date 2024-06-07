import React from "react";
import { WorkingDayColumn } from "./WorkingDayColumn";
import { Slider, ArrowLeftIcon, ArrowRightIcon } from "@UI";
import { isSameMinute } from "utils";
import { ServiceDayWorkingHours } from "@features/API";

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

function splitDatesByDay(dates: Date[]): SplitDay[] {
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
        day: new Date(date),
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
  const dates = splitDatesByDay(workingDates.map((d) => new Date(d.date)));

  return (
    <Slider
      rightArrowComponent={ArrowRightIcon}
      leftArrowComponent={ArrowLeftIcon}
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
                available: !!takenDates.find((d) =>
                  isSameMinute(new Date(d.date), date)
                ),
              }))}
              onClick={() => {}}
              dayDate={date.day}
              key={i}
            />
          ))
        : null}
    </Slider>
  );
};
