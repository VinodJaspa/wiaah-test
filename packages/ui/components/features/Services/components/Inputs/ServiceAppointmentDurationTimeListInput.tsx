import {
  isDateInstance,
  isDateWithin,
  isSameMinute,
  mapArray,
} from "@UI/../utils/src";
import React from "react";

const getDividedDatesByMinInDateRange = (
  date1: Date,
  date2: Date,
  gap: number
): Date[] => {
  if (!isDateInstance(date1) || !isDateInstance(date2)) return [];

  let finished = false;
  let dates: Date[] = [date1];

  while (
    !finished &&
    dates[dates.length - 1] &&
    dates[dates.length - 1] < date2
  ) {
    const lastDate = dates[dates.length - 1];
    const newDate = new Date(
      lastDate.getFullYear(),
      lastDate.getMonth(),
      lastDate.getDate(),
      lastDate.getHours(),
      lastDate.getMinutes() + gap
    );

    if (newDate > date2) {
      finished = true;
    } else {
      dates = [...dates, newDate];
    }
  }

  return dates;
};

interface ServiceAppointmentDurationTimeListInputProps {
  durationInMin: number;
  allowedPeriods: [Date, Date][];
  value: Date[];
  onChange: (selected: Date[]) => any;
  baseDate: Date;
}

export const ServiceAppointmentDurationTimeListInput: React.FC<
  ServiceAppointmentDurationTimeListInputProps
> = ({ durationInMin, value = [], allowedPeriods, onChange, baseDate }) => {
  const base = isDateInstance(baseDate) ? new Date(baseDate) : new Date();
  const AllDates = getDividedDatesByMinInDateRange(
    new Date(base.getFullYear(), base.getMonth(), base.getDate(), 0, 0, 0, 0),
    new Date(
      base.getFullYear(),
      base.getMonth(),
      base.getDate() + 1,
      0,
      0,
      0,
      0
    ),
    durationInMin
  );

  React.useEffect(() => {
    const allDates = AllDates.filter((v) => {
      const isDisabled = !!allowedPeriods.some((e) => {
        if (!isDateInstance(e[0]) || !isDateInstance(e[1])) return;

        const first = !isDateWithin(v, e[0], e[1]);
        const second = !isDateWithin(
          new Date(new Date(v).setMinutes(v.getMinutes() + durationInMin)),
          e[0],
          e[1]
        );

        return first || second;
      });

      return !isDisabled;
    });

    onChange(allDates);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {mapArray(AllDates, (v, i) => {
        const selected = value.find((e) => isSameMinute(e, v));
        const isSelected = !!selected;
        const isDisabled = !!allowedPeriods.some((e) => {
          if (!isDateInstance(e[0]) || !isDateInstance(e[1])) return;

          const first = !isDateWithin(v, e[0], e[1]);
          const second = !isDateWithin(
            new Date(new Date(v).setMinutes(v.getMinutes() + durationInMin)),
            e[0],
            e[1]
          );

          return first || second;
        });

        return (
          <p
            onClick={() => {
              if (isDisabled) return;
              if (isSelected) {
                onChange(value.filter((e) => !isSameMinute(e, v)));
              } else {
                onChange([...value, v]);
              }
            }}
            className={`py-2 ${
              isSelected ? "bg-primary text-white " : "bg-white"
            } ${
              isDisabled
                ? "text-gray-400 line-through bg-gray-100 cursor-not-allowed"
                : "cursor-pointer"
            } rounded text-center select-none px-2`}
            key={i}
          >
            {v.toLocaleTimeString("en-us", {
              hour: "2-digit",
              hour12: true,
              minute: "2-digit",
            })}
          </p>
        );
      })}
    </div>
  );
};
