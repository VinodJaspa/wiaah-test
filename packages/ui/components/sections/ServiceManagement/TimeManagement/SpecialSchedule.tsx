import { useYearController } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  getAllMonthsOfYear,
  getDividedWeeks,
  MonthDetails,
  weekDays,
} from "utils";
import {
  Table,
  TBody,
  THead,
  Tr,
  Th,
  Td,
  SpecialDaysOpenTimeModal,
  useSpecialDaysOpenTimeModal,
  Switch,
  Button,
} from "@UI";

export interface SpecialScheduleProps {}

export const SpecialSchedule: React.FC<SpecialScheduleProps> = ({}) => {
  const [selectedDates, setSelectedDates] = React.useState<Date[]>([]);
  const [multiSelect, setMultiSelect] = React.useState<boolean>(false);
  const { year, NextYear, PreviousYear } = useYearController();
  const { modifiDays } = useSpecialDaysOpenTimeModal();
  const months = getAllMonthsOfYear(year);
  const { t } = useTranslation();
  React.useEffect(() => {
    if (multiSelect) {
    } else {
      //   setSelectedDates([]);
    }
  }, [multiSelect]);
  return (
    <div className="flex relative flex-col gap-8 w-full">
      {multiSelect && (
        <Button
          className="fixed bottom-8 right-8"
          onClick={() => modifiDays(selectedDates)}
        >
          {t("done", "done")}
        </Button>
      )}
      <div className="flex items-center gap-2 justify-start">
        <Switch
          checked={multiSelect}
          onChange={(checked) => setMultiSelect(checked)}
        />
        <p className="text-lg font-semibold">
          {t("select_multiple_days", "Select Multiply Days")}
        </p>
      </div>
      <div className="flex gap-8 justify-around items-center w-full">
        <span
          onClick={() => PreviousYear()}
          className="cursor-pointer text-base sm:text-lg md:text-2xl font-semibold text-primary"
        >
          {t("previous_year", "Previous year")}
        </span>
        <span className="text-4xl font-bold">{year}</span>
        <span
          onClick={() => NextYear()}
          className="cursor-pointer text-base sm:text-lg md:text-2xl font-semibold text-primary"
        >
          {t("next_year", "Next year")}
        </span>
      </div>
      <div className="grid justify-center gap-8 grid-cols-[repeat(auto-fit,minmax(15rem,25rem))] ">
        <SpecialDaysOpenTimeModal
          onClearSpeicalDays={(dates) => {
            setSelectedDates((state) => {
              let _state = state;

              dates.map((date, i) => {
                _state = _state.filter((item) => item === date);
              });
              return _state;
            });
          }}
          onScheduleComplete={(dates) => {
            setSelectedDates((state) => [...state, ...dates.dates]);
          }}
        />
        {months.map((month, i) => (
          <Calender
            onDaySelect={(d) => {
              if (multiSelect) {
                setSelectedDates((state) => [...state, d]);
              } else {
                modifiDays([d]);
              }
            }}
            scheduledDays={selectedDates}
            key={i}
            monthDetails={month}
          />
        ))}
      </div>
    </div>
  );
};

interface CalenderProps {
  monthDetails: MonthDetails;
  mulitipleSelection?: boolean;
  onDaySelect: (day: Date) => any;
  scheduledDays: Date[];
}

type ScheduledDay = {
  month: number;
  day: number;
};

const Calender: React.FC<CalenderProps> = ({
  monthDetails,
  onDaySelect,
  mulitipleSelection,
  scheduledDays,
}) => {
  const [scheduled, setScheduled] = React.useState<ScheduledDay[]>([]);
  const weeks = getDividedWeeks(monthDetails.days);

  React.useEffect(() => {
    if (!Array.isArray(scheduledDays)) return;
    const days: ScheduledDay[] = [];
    scheduledDays.map((day) => {
      const date = new Date(day);
      days.push({
        day: date.getDate(),
        month: date.getMonth(),
      });
    });
    setScheduled(days);
  }, [scheduledDays]);

  return (
    <div className="flex text-white flex-col rounded-xl overflow-hidden items-center">
      <p className="bg-primary w-full py-4 text-xl text-center ">
        {monthDetails?.month?.name} {monthDetails?.year}
      </p>
      <Table
        className="bg-primary text-xs sm:text-base"
        TdProps={{ className: "", align: "center" }}
        ThProps={{ align: "center" }}
      >
        <THead>
          <Tr>
            {weekDays.map((day, i) => (
              <Th key={i}>{day}</Th>
            ))}
          </Tr>
        </THead>
        <TBody>
          {weeks.map((days, i) => (
            <Tr key={i}>
              {days.map((day, i) => {
                const scheduledIdx =
                  scheduled.findIndex((Sday) => {
                    return (
                      Sday.month === monthDetails.month.idx &&
                      Sday.day === day.dayNum
                    );
                  }) > -1;

                const isScheduled = scheduledIdx && day.currentMonth;

                return (
                  <Td
                    onClick={() => {
                      if (day.currentMonth) {
                        onDaySelect &&
                          onDaySelect(
                            new Date(
                              monthDetails.year,
                              monthDetails.month.idx,
                              day.dayNum
                            )
                          );
                      }
                    }}
                    key={i}
                    className={`${
                      day.currentMonth
                        ? " cursor-pointer"
                        : "text-gray-400 cursor-not-allowed"
                    } ${isScheduled ? "text-white" : "text-black bg-white"}`}
                  >
                    {day.dayNum}
                  </Td>
                );
              })}
            </Tr>
          ))}
        </TBody>
      </Table>
    </div>
  );
};
