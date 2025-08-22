import { useOutsideHover } from "@UI/../hooks";
import {
  getMonthCalenderDays,
  getNextNearestDate,
  isDate,
  isSameDay,
  mapArray,
} from "@UI/../utils/src";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  AspectRatio,
  HStack,
} from "@partials";
import React from "react";

type date = number | string | Date;

interface ServiceRangeBookingCalanderProps {
  date: date;
  single?: boolean;
  bookedDates: date[];
  value: [date?, date?];
  onChange: (v: [date?, date?], complete?: boolean) => any;
}

export const ServiceRangeBookingCalander: React.FC<
  ServiceRangeBookingCalanderProps
> = ({ date, ...rest }) => {
  const [currentDate, setCurrentDate] = React.useState<Date>(new Date(date));

  const { allDates, weekdays } = getMonthCalenderDays(new Date(currentDate));

  function nextMonth() {
    setCurrentDate(
      new Date(currentDate.setMonth(currentDate.getMonth() + 1)),
    );
  }

  function prevMonth() {
    setCurrentDate(
      new Date(currentDate.setMonth(currentDate.getMonth() - 1)),
    );
  }

  return (
    <div className="select-none w-full bg-white  p-2  border">
      {/* Calendar header */}
      <HStack className="text-3xl justify-between mb-4">
        <ArrowLeftIcon
          onClick={() => prevMonth()}
          className="cursor-pointer hover:text-gray-700"
        />
        <p className="font-semibold text-lg text-center flex items-center gap-2">
          <span>
            {currentDate.toLocaleDateString("en-us", { month: "long" })}
          </span>
          <span>
            {currentDate.toLocaleDateString("en-us", { year: "numeric" })}
          </span>
        </p>
        <ArrowRightIcon
          onClick={() => nextMonth()}
          className="cursor-pointer hover:text-gray-700"
        />
      </HStack>

      {/* Weekdays */}
      <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-500 mb-2">
        {mapArray(weekdays, (v, i) => (
          <div className="py-1" key={i}>
            {v}
          </div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 gap-1">
        {mapArray(allDates, (v, i) => (
          <DayComp
            key={i}
            currentMonth={v.currentMonth}
            currentDate={v.date}
            {...rest}
            date={date}
          />
        ))}
      </div>
    </div>
  );
};

const DayComp: React.FC<
  ServiceRangeBookingCalanderProps & {
    currentDate: Date;
    currentMonth: boolean;
  }
> = ({
  bookedDates,
  onChange: _onChange,
  value,
  currentMonth,
  currentDate,
  single,
}) => {
  const [hover, setHover] = React.useState(false);
  const ref = React.useRef<HTMLParagraphElement>(null);

  useOutsideHover(ref, () => setHover(false));

  const isBooked = !!bookedDates.find((e) => {
    if (!e) return false;
    const date = new Date(e);
    const baseDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    const targetDate = new Date(currentDate);
    return baseDate <= targetDate && endDate > targetDate;
  });

  const nextDate = value[0]
    ? getNextNearestDate(
        bookedDates.map((v) => new Date(v)),
        new Date(value[0]),
      )
    : null;

  const notAllowed = nextDate ? currentDate > nextDate : false;

  const isSelected = !!value.find((e) => {
    if (!e) return false;
    const date = new Date(e);
    const baseDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    const targetDate = new Date(currentDate);
    return baseDate <= targetDate && endDate > targetDate;
  });

  const onChange = (...props: Parameters<typeof _onChange>) => {
    _onChange(
      props[0],
      typeof props[1] === "boolean"
        ? props[1]
        : isDate(props[0][0]) && isDate(props[0][1])
          ? true
          : false,
    );
  };

  return (
    <AspectRatio ratio={1}>
      <p
        ref={ref}
        onMouseOver={() => setHover(true)}
        onClick={() => {
          if (!currentMonth || isBooked || notAllowed) return;
          const from = value[0];
          const to = value[1];

          if (single) return onChange([currentDate, undefined], true);

          if (hover) {
            if (from && isSameDay(new Date(from), new Date(currentDate))) {
              return onChange([undefined, to]);
            }
            if (to && isSameDay(new Date(to), new Date(currentDate))) {
              return onChange([from, undefined]);
            }
          }

          if (!from) {
            if (to && new Date(currentDate) > new Date(to)) {
              return onChange([to, currentDate]);
            }
            return onChange([currentDate, to]);
          }

          if (currentDate < from!) return onChange([currentDate, to]);

          onChange([from!, currentDate]);
        }}
        className={`w-full h-full flex justify-center items-center  font-medium text-sm transition-all
          ${
            isBooked || (notAllowed && currentMonth)
              ? "text-gray-400 cursor-not-allowed line-through"
              : isSelected
              ? "bg-primary text-white cursor-pointer shadow"
              : !currentMonth
              ? "cursor-not-allowed text-gray-300"
              : "text-gray-900 cursor-pointer hover:bg-gray-100"
          }
        `}
      >
        {currentMonth ? (
          isSelected && hover && !single ? (
            "×"
          ) : (
            new Date(currentDate).getDate()
          )
        ) : (
          ""
        )}
      </p>
    </AspectRatio>
  );
};
