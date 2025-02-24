import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
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
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const workingSlots = splitDatesByDay(workingDates);
  const takenSlots = splitDatesByDay(takenDates);

  const maxSlideIndex = Math.floor((workingSlots.length - 1) / 4);
  const canGoLeft = currentSlideIndex > 0;
  const canGoRight = currentSlideIndex < maxSlideIndex;

  const goLeft = () => {
    setCurrentSlideIndex((prev) => Math.max(0, prev - 1));
  };

  const goRight = () => {
    setCurrentSlideIndex((prev) => Math.min(maxSlideIndex, prev + 1));
  };

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
    <div className="relative w-full overflow-hidden">
      <button
        onClick={goLeft}
        disabled={!canGoLeft}
        className="absolute -left-2 top-2 z-10 text-primary disabled:opacity-50"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={goRight}
        disabled={!canGoRight}
        className="absolute -right-2 top-2 z-10 text-primary disabled:opacity-50"
      >
        <ChevronRight />
      </button>
      <div
        className="flex transition-transform duration-300"
        style={{ transform: `translateX(-${currentSlideIndex * 100}%)` }}
      >
        {workingSlots.map((date, i) => {
          const dayTakenSlots = takenSlots.find(
            (t) => t.day.toDateString() === date.day.toDateString(),
          );

          return (
            <div key={i} className="w-1/4 flex-shrink-0 px-2">
              <WorkingDayColumn
                dates={date.dates.map((d) => ({
                  date: d,
                  available: !isTimeTaken(d, dayTakenSlots?.dates || []),
                }))}
                onClick={() => {}}
                dayDate={date.day}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
