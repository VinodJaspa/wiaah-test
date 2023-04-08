import { useOutsideClick, useOutsideHover } from "@UI/../hooks";
import { mapArray } from "@UI/../utils/src";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@partials";
import React from "react";
import { useTranslation } from "react-i18next";

type date = number | string | Date;

interface ServiceRangeBookingCalanderProps {
  date: date;

  bookedDates: date[];
  value: [date?, date?];
  onChange: (v: [date, date?]) => any;
}

export const ServiceRangeBookingCalander: React.FC<
  ServiceRangeBookingCalanderProps
> = ({ date, ...rest }) => {
  const [currentDate, setCurrentDate] = React.useState<Date>(new Date(date));

  const { t } = useTranslation();

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
    <div className="select-none w-fit">
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

  return (
    <p
      onMouseOver={() => setHover(true)}
      ref={ref}
      onClick={() => {
        const from = value[0];
        const to = value[1];

        if (!from) return onChange([currentDate]);

        if (currentDate < from!) return onChange([currentDate, to]);

        onChange([from!, currentDate]);
      }}
      className={`${
        isBooked
          ? "text-gray-400 line-through"
          : isSelected
          ? "bg-black text-white cursor-pointer"
          : !currentMonth
          ? "cursor-not-allowed text-gray-400"
          : "text-black cursor-pointer"
      } w-[2.5em] h-[2.5em] flex justify-center items-center rounded-full font-bold text-center`}
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
  );
};
