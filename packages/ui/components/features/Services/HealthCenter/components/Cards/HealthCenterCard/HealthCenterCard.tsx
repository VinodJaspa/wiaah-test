import { HealthCenterPractitioner } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { WorkingDate } from "types";
import {
  Button,
  AspectRatioImage,
  WorkingDaysCalender,
  ServicesRequestKeys,
  HealthCenterDoctor,
  HealthCenter,
} from "@UI";
import { setTestid } from "utils";
import { addDays, format } from "date-fns";

export const convertWorkingDates = (
  workingDates: WorkingDate[],
): ConvertedWorkingDate[] => {
  return workingDates.map(({ date, workingHoursRanges }) => ({
    date: String(date),
    workingHoursRanges: workingHoursRanges.map(({ from, to }) => ({
      from: String(from),
      to: String(to),
    })),
  }));
};

export interface HealthCenterCardProps {
  centerData: HealthCenterDoctor & { healthCenter: HealthCenter };
  workingDates: WorkingDate[];
  vertical?: boolean;
}

interface ConvertedWorkingDate {
  date: string;
  workingHoursRanges: {
    from: string;
    to: string;
  }[];
}
type CalendarDay = {
  day: string;
  date: string; // "15 Sep"
  times: string[];
  rawDate: Date;
};
export const HealthCenterCard: React.FC<HealthCenterCardProps> = ({
  centerData,
  workingDates,
  vertical = false,
}) => {
  const { visit } = useRouting();
  const { t } = useTranslation();

  const dayMap: Record<string, number> = {
    su: 0,
    mo: 1,
    tu: 2,
    we: 3,
    th: 4,
    fr: 5,
    sa: 6,
  };



  function getNextDateForDay(dayCode: string): Date {
    const today = new Date();
    const todayDay = today.getDay();
    const targetDay = dayMap[dayCode.toLowerCase()];
    if (targetDay === undefined) return today;

    let diff = targetDay - todayDay;
    if (diff < 0) diff += 7;
    return addDays(today, diff);
  }
console.log(workingDates,"workingDates");

  function transformWorkingDates(workingDates: WorkingDate[]): CalendarDay[] {
    const today = new Date();
    return workingDates
      .map((d) => {
        const code = String(d.date);
        const nextDate = getNextDateForDay(code);

        // Filter out past times for today
        let times = d.workingHoursRanges.map((range) => `${range.from} - ${range.to}`);
        if (
          nextDate.toDateString() === today.toDateString()
        ) {
          const now = today.getHours() * 60 + today.getMinutes();
          times = times.filter((t) => {
            const [from] = t.split(" - ");
            const [h, m] = from.split(":").map(Number);
            return h * 60 + m >= now;
          });
        }

        return {
          day: format(nextDate, "EEEE"),
          date: format(nextDate, "d MMM"),
          times,
          rawDate: nextDate,
        };
      })
      .filter((d) => d.times.length > 0); // remove empty days
  }

  const calendarDays = transformWorkingDates(workingDates);

  // Selected state
  const [selected, setSelected] = React.useState<{ day: string; time: string; date: Date } | null>(null);

  return (
    <div
      className={`flex ${vertical ? "flex-col" : "flex-row"} shadow rounded w-full p-2 gap-4`}
    >
      {/* Left Fixed Section */}
      <div className="flex flex-col justify-between gap-4 w-1/3 min-w-[220px]">
        <div className="flex gap-4">
          <div {...setTestid("ServicePresentation")} className="w-32">
            <img
              src={centerData.thumbnail}
              alt={centerData.name}
              className="w-40 object-contain transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div {...setTestid("ServiceInfo")} className="flex flex-col gap-4">
            <div className="flex flex-col font-bold text-sm gap-2">
              <p className="text-primary">{centerData.name}</p>
              <p>{centerData.speciality?.name}</p>
            </div>
            <div className="font-normal flex flex-col gap-1">
              <p>{centerData.healthCenter?.location.address}</p>
              <span className="flex gap-2">
                <p>
                  {centerData.healthCenter.location.postalCode}{" "}
                  {centerData.healthCenter.location.city}
                </p>
              </span>
            </div>
          </div>
        </div>
        <Button
          onClick={() =>
            visit((routes) =>
              selected &&
              routes.visitService(centerData, ServicesRequestKeys.healthCenter)
            )
          }
          className="w-fit ml-2 mt-2 bg-black"
          disabled={!selected} // Disabled until user selects a time
        >
          {t("Book now")}
        </Button>
      </div>

      {/* Right Scrollable Calendar */}
      <div className="flex-1 overflow-x-auto">
        <div className="flex gap-4 min-w-max">
          <BookingHealthCenterCalendar
            days={calendarDays}
            selected={selected}
            onSelect={(day, time, date) => setSelected({ day, time, date })}
          />
        </div>
      </div>
    </div>
  );
};

// Calendar component with highlighting
interface CalendarProps {
  days: CalendarDay[];
  selected?: { day: string; time: string; date: Date } | null;
  onSelect?: (day: string, time: string, date: Date) => void;
}

const BookingHealthCenterCalendar: React.FC<CalendarProps> = ({ days, onSelect, selected }) => {
  return (
    <div className="flex gap-6 w-full">
      {days.map((d, idx) => (
        <div key={idx} className="flex flex-col items-center gap-3 px-2">
          {/* Day Header */}
          <div className="flex flex-col items-center">
            <p className="font-bold text-sm">{d.day}</p>
            <p className="whitespace-nowrap text-gray-500 text-sm font-medium">
              {d.date}
            </p>
          </div>

          {/* Time Slots */}
          <div className="flex flex-col gap-2 w-full">
            {d.times.map((time, i) => {
              const isSelected = selected?.day === d.day && selected?.time === time;
              return (
                <button
                  key={i}
                  onClick={() => onSelect?.(d.day, time, d.rawDate)}
                  className={`font-semibold w-full px-3 py-1.5 text-sm rounded whitespace-nowrap ${
                    isSelected
                      ? "bg-black text-white"
                      : "bg-primary text-gray-800 hover:bg-green-600"
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};



