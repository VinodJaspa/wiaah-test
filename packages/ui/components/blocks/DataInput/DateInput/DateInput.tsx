import React from "react";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { DateRange, HtmlDivProps } from "types";
import { getTimeInAmPm, PassPropsToFnOrElem } from "utils";

export interface DateMonth {
  name: string;
  firstDayName: string;
  year: number;
  number: number;
  lastMonthDaysNum: number;
  daysNum: number;
}

interface FormatedDays {
  dayNum: number;
  currentMonth: boolean;
  date: string;
}

interface DateSources {
  year: number;
  month: number;
}

function getPrevMonth({ month, year }: DateSources): DateSources {
  let Year = year;
  let Month = month;
  if (month <= 0) {
    Month = 11;
    Year -= 1;
  } else {
    Month -= 1;
  }

  return {
    month: Month,
    year: Year,
  };
}
function getNextMonth({ month, year }: DateSources): DateSources {
  let Year = year;
  let Month = month;
  if (month >= 11) {
    Month = 0;
    Year += 1;
  } else {
    Month += 1;
  }
  return {
    month: Month,
    year: Year,
  };
}
function daysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}
type WeekDays = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";

const weekDays: WeekDays[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getMonthData = (dateTimeStamp: Date): DateMonth => {
  const yearNum: number = parseInt(
    new Date(dateTimeStamp).toLocaleDateString("en", {
      year: "numeric",
    })
  );
  const monthNum: number = parseInt(
    new Date(dateTimeStamp).toLocaleDateString("en", {
      month: "numeric",
    })
  );

  const firstDay: string = new Date(yearNum, monthNum - 1).toLocaleDateString(
    "en",
    {
      weekday: "short",
    }
  );

  const lastMonthDays: number = daysInMonth(yearNum, monthNum - 1);

  const month: DateMonth = {
    name: new Date(dateTimeStamp).toLocaleDateString("en", {
      month: "long",
    }),
    daysNum: daysInMonth(yearNum, monthNum),
    year: yearNum,
    number: monthNum - 1,
    firstDayName: firstDay ? firstDay : "Sun",
    lastMonthDaysNum: lastMonthDays,
  };
  return month;
};

export interface DateDayComponentProps {
  dayNum: number;
  active: boolean;
  currentMonth: boolean;
}

const DefaultDaycomponent: React.FC<DateDayComponentProps> = ({
  dayNum,
  currentMonth,
  active,
}) => {
  return (
    <span
      className={`${
        currentMonth ? "cursor-pointer" : "cursor-not-allowed text-gray-400"
      } ${
        active ? "bg-primary text-white" : ""
      } h-8 w-8 flex items-center justify-center`}
    >
      {dayNum}
    </span>
  );
};

export interface DateInputProps extends HtmlDivProps {
  onDaySelect?: (UTCDateString: string) => any;
  range?: boolean;
  onRangeSelect?: (range: DateRange) => any;
  dayComponent?: React.ReactNode;
}
export const DateInput: React.FC<DateInputProps> = ({
  onDaySelect,
  range,
  onRangeSelect,
  className,
  dayComponent = DefaultDaycomponent,
  ...rest
}) => {
  const [activeDates, setActiveDates] = React.useState<string[]>([]);
  const [DividedWeeks, setDividedWeeks] = React.useState<FormatedDays[][]>([]);
  const [month, setMonth] = React.useState<DateMonth>(
    getMonthData(new Date(Date.now()))
  );

  const [allDays, setAllDays] = React.useState<FormatedDays[]>(getDays());
  React.useEffect(() => {
    getDividedWeeks();
  }, [allDays]);

  React.useEffect(() => {
    setAllDays(getDays());
  }, [month]);

  React.useEffect(() => {
    if (activeDates) {
      if (range) {
        if (activeDates.length < 2) return;
        onRangeSelect &&
          onRangeSelect({
            from: new Date(activeDates[0]).toUTCString(),
            to: new Date(activeDates[1]).toUTCString(),
          });
      } else {
        onDaySelect && onDaySelect(new Date(activeDates[0]).toUTCString());
      }
    }
  }, [activeDates]);

  function getDays(): FormatedDays[] {
    const firstDayOffset = weekDays.findIndex(
      (day) => day === month.firstDayName
    );
    const lastMonthDays: FormatedDays[] = [...Array(firstDayOffset)]
      .map((_, i) => ({
        date: new Date(
          month.year,
          month.number - 1,
          month.lastMonthDaysNum - i
        ).toISOString(),
        currentMonth: false,
        dayNum: month.lastMonthDaysNum - i,
      }))
      .reverse();

    const currentMonthDays: FormatedDays[] = [...Array(month.daysNum)].map(
      (_, i) => ({
        date: new Date(month.year, month.number, i + 1).toISOString(),
        currentMonth: true,
        dayNum: i + 1,
      })
    );

    const LastAndCurrentDays: FormatedDays[] = [
      ...lastMonthDays,
      ...currentMonthDays,
    ];
    const NextMonthDaysNum: number =
      weekDays.length - (LastAndCurrentDays.length % weekDays.length);

    const nextMonthDays: FormatedDays[] = [...Array(NextMonthDaysNum)].map(
      (_, i) => ({
        date: new Date(month.year, month.number, i).toISOString(),
        currentMonth: false,
        dayNum: i + 1,
      })
    );

    const allDays = [...lastMonthDays, ...currentMonthDays, ...nextMonthDays];
    return allDays;
  }

  const getDividedWeeks: () => void = React.useCallback(() => {
    let array: FormatedDays[][] = [];
    let currentPhase = 0;
    while (currentPhase * 7 < allDays.length) {
      const sliced = [
        ...allDays.slice(currentPhase * 7, (currentPhase + 1) * 7),
      ];
      array.push(sliced);
      currentPhase++;
    }
    setDividedWeeks(array);
  }, [allDays]);

  function handleNextMonth() {
    setMonth((currentMonth) => {
      const { month, year } = getNextMonth({
        month: currentMonth.number,
        year: currentMonth.year,
      });
      const m = getMonthData(new Date(year, month));
      return m;
    });
  }

  function handlePrevMonth() {
    setMonth((currentMonth) => {
      const { month, year } = getPrevMonth({
        month: currentMonth.number,
        year: currentMonth.year,
      });
      const Month = getMonthData(new Date(year, month));
      return Month;
    });
  }

  return (
    <section {...rest} className={`${className || ""} h-fit w-fit bg-white`}>
      {/* calander */}
      <div className="flex items-center justify-between px-1">
        <div onClick={handlePrevMonth} className="cursor-pointer text-3xl">
          <MdArrowLeft />
        </div>

        <div className="flex gap-2 font-bold">
          {/* month and year */}
          <span>{month.name}</span>
          <span>{month.year}</span>
        </div>

        <div onClick={handleNextMonth} className="cursor-pointer text-3xl">
          <MdArrowRight />
        </div>
      </div>

      <div>
        {/* calander grid */}
        <table className="w-full">
          {/* <thead> */}
          <thead>
            <tr className="flex items-center justify-between">
              {weekDays.map((day, weekIndex) => (
                <th
                  key={weekIndex}
                  className="flex w-full items-center justify-center"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="">
            {DividedWeeks.map((week, weekIndex) => (
              <tr
                key={weekIndex}
                className="flex items-center justify-between w-full"
              >
                {week.map(({ currentMonth, dayNum, date }, dayIndex) => (
                  <td
                    className="w-full"
                    key={dayIndex}
                    onClick={() => {
                      if (!currentMonth) return;
                      setActiveDates((state) => {
                        if (range) {
                          if (state.length >= 2) return state;
                          return [...state, date];
                        } else {
                          return [date];
                        }
                      });
                    }}
                  >
                    {PassPropsToFnOrElem(dayComponent, {
                      dayNum,
                      currentMonth,
                      active: activeDates.includes(date) && currentMonth,
                    })}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
