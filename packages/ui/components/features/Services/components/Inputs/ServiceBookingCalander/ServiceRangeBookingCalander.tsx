import { useOutsideHover } from "@UI/../hooks";
import { isDate, isSameDay, mapArray } from "@UI/../utils/src";
import { ArrowLeftIcon, ArrowRightIcon, AspectRatio, HStack } from "@partials";
import React from "react";

type date = number | string | Date;

interface ServiceRangeBookingCalanderProps {
  date: date;

  bookedDates: date[];
  value: [date?, date?];
  onChange: (v: [date?, date?]) => any;
}

export const ServiceRangeBookingCalander: React.FC<
  ServiceRangeBookingCalanderProps
> = ({ date, ...rest }) => {
  const [currentDate, setCurrentDate] = React.useState<Date>(new Date(date));

  const currentMonthLastDayDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const currentMonthFirstDayDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  const currentMonthDayNum = currentMonthLastDayDate.getDate();

  const currentMonthFirstDayPositionInWeek = currentMonthFirstDayDate.getDay();
  const currentMonthLastDayPositionInWeek = currentMonthLastDayDate.getDay();

  const lastMonthDates = [...Array(currentMonthFirstDayPositionInWeek)].map(
    (_, i) =>
      new Date(
        new Date(currentMonthFirstDayDate).setDate(
          currentMonthFirstDayDate.getDate() - (i + 1)
        )
      )
  );

  const nextMonthDates = [
    ...Array(Math.abs(currentMonthLastDayPositionInWeek - 6)),
  ].map(
    (_, i) =>
      new Date(
        new Date(currentMonthLastDayDate).setDate(
          currentMonthLastDayDate.getDate() + (i + 1)
        )
      )
  );

  const currentDates = [...Array(currentMonthDayNum)].map(
    (_, i) =>
      new Date(
        new Date(currentMonthFirstDayDate).setDate(
          currentMonthFirstDayDate.getDate() + i
        )
      )
  );

  function nextMonth() {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  }

  function prevMonth() {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  }

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const allDates: { currentMonth: boolean; date: Date }[] = [
    ...lastMonthDates.reverse().map((v) => ({ currentMonth: false, date: v })),
    ...currentDates.map((v) => ({ currentMonth: true, date: v })),
    ...nextMonthDates.map((v) => ({ currentMonth: false, date: v })),
  ];

  return (
    <div className="select-none w-full">
      <HStack className="text-3xl justify-between mx-[0.5em]">
        <ArrowLeftIcon onClick={() => prevMonth()} />
        <p className="font-bold text-lg text-center">
          {currentDate.toLocaleDateString("en-us", {
            month: "short",
          })}
        </p>
        <ArrowRightIcon onClick={() => nextMonth()} />
      </HStack>

      <div className="grid grid-cols-7">
        {mapArray(weekdays, (v, i) => (
          <div className="px-2 py-1 font-bold  text-center" key={i}>
            {v}
          </div>
        ))}
        {mapArray(allDates, (v, i) => (
          <DayComp
            currentMonth={v.currentMonth}
            currentDate={v.date}
            {...rest}
            date={date}
          ></DayComp>
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
> = ({ bookedDates, onChange, value, currentMonth, currentDate }) => {
  const [hover, setHover] = React.useState(false);
  const ref = React.useRef<HTMLParagraphElement>(null);

  useOutsideHover(ref, () => setHover(false));

  const isBooked = !!bookedDates.find((e) => {
    if (!e) return false;
    const date = new Date(e);
    const baseDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      0,
      0,
      0
    );

    const endDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1,
      0,
      0,
      0
    );

    const targetDate = new Date(currentDate);
    return baseDate <= targetDate && endDate > targetDate;
  });

  const isSelected = !!value.find((e) => {
    if (!e) return false;
    const date = new Date(e);
    const baseDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    const endDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );

    const targetDate = new Date(currentDate);

    return baseDate <= targetDate && endDate > targetDate;
  });

  return (
    <AspectRatio ratio={1}>
      <p
        onMouseOver={() => setHover(true)}
        ref={ref}
        onClick={() => {
          if (!currentMonth || isBooked) return;
          const from = value[0];
          const to = value[1];

          if (hover) {
            if (from && isSameDay(new Date(from), new Date(currentDate))) {
              return onChange([undefined, to]);
            }

            if (to && isSameDay(new Date(to), new Date(currentDate))) {
              return onChange([from, undefined]);
            }
          }

          if (!from) {
            if (
              !!to &&
              isDate(to) &&
              isDate(currentDate) &&
              new Date(currentDate) > new Date(to)
            ) {
              return onChange([to, currentDate]);
            }
            return onChange([currentDate, to]);
          }

          if (currentDate < from!) return onChange([currentDate, to]);

          onChange([from!, currentDate]);
        }}
        className={`${
          isBooked
            ? "text-gray-400 cursor-not-allowed line-through"
            : isSelected
            ? "bg-black text-white cursor-pointer"
            : !currentMonth
            ? "cursor-not-allowed text-gray-400"
            : "text-black cursor-pointer"
        } w-full h-full flex justify-center items-center rounded-full font-bold text-center`}
      >
        {currentMonth ? (
          isSelected && hover ? (
            "X"
          ) : (
            new Date(currentDate).getDate()
          )
        ) : (
          <span className="font-bold text-2xl leading-3">-</span>
        )}
      </p>
    </AspectRatio>
  );
};
