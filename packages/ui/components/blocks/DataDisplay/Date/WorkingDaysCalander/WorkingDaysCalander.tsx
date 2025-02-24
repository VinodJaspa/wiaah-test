import React from "react";
import { WorkingDayColumn } from "./WorkingDayColumn";

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
  const dates: Date[] = [];

  data.forEach((item) => {
    const baseDate = new Date(item.date);
    if (isNaN(baseDate.getTime())) return;

    item.workingHoursRanges.forEach((range) => {
      const fromDate = new Date(range.from);
      const toDate = new Date(range.to);
      if (!isNaN(fromDate.getTime())) dates.push(fromDate);
      if (!isNaN(toDate.getTime())) dates.push(toDate);
    });
  });

  dates.sort((a, b) => a.getTime() - b.getTime());

  const splitDays: SplitDay[] = [];
  let currentDay: Date | null = null;

  dates.forEach((date) => {
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);

    if (!currentDay || dayStart.getTime() !== currentDay.getTime()) {
      currentDay = dayStart;
      splitDays.push({
        day: new Date(dayStart),
        dates: [date],
      });
    } else {
      splitDays[splitDays.length - 1].dates.push(date);
    }
  });

  return splitDays;
}

export const WorkingDaysCalender: React.FC<WorkingDaysCalenderProps> = ({
  workingDates,
  takenDates,
}) => {
  const workingSlots = splitDatesByDay(workingDates);
  const takenSlots = splitDatesByDay(takenDates);

  const takenMap = new Map<string, boolean>();
  takenSlots.forEach((day) => {
    day.dates.forEach((date) => {
      const key = date.toISOString();
      takenMap.set(key, true);
    });
  });

  const isTimeTaken = (date: Date, takenDates: Date[]): boolean => {
    return takenDates.some((taken) => {
      const time = date.getTime();
      const takenStart = taken.getTime();
      const takenEnd = new Date(taken).setHours(23, 59, 59, 999);
      return time >= takenStart && time <= takenEnd;
    });
  };

  return (
    <div className="flex gap-4 px-2 w-full">
      {workingSlots.map((date, i) => {
        const dayTakenSlots = takenSlots.find(
          (t) => t.day.toDateString() === date.day.toDateString(),
        );

        return (
          <WorkingDayColumn
            dates={date.dates.map((d) => ({
              date: d,
              available: !isTimeTaken(d, dayTakenSlots?.dates || []),
            }))}
            onClick={() => {}}
            dayDate={date.day}
            key={i}
          />
        );
      })}
    </div>
  );
};
