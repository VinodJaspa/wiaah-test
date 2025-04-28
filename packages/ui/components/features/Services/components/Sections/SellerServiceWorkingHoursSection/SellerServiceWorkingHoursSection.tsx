import {
  ServiceDayWorkingHours,
  ServiceWeekdaysWorkingHours,
} from "@features/API";
import { TimeClockDisplay } from "@partials";
import React from "react";
import { useTranslation } from "react-i18next";

export interface SellerServiceWorkingHoursSectionProps {
  workingDays: ServiceWeekdaysWorkingHours;
}

const parseTimeToDate = (time: string) => {
  const [hour, minute] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hour, minute, 0, 0); // sets hour, minute, seconds, and milliseconds
  return date;
};

const days = {
  mo: "Monday",
  tu: "Tuesday",
  we: "Wednesday",
  th: "Thursday",
  fr: "Friday",
  sa: "Saturday",
  su: "Sunday",
};

const getTodayKey = () => {
  const dayIndex = new Date().getDay(); // 0 (Sunday) - 6 (Saturday)
  return ["su", "mo", "tu", "we", "th", "fr", "sa"][dayIndex];
};

export const SellerServiceWorkingHoursSection: React.FC<
  SellerServiceWorkingHoursSectionProps
> = ({ workingDays }) => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const todayKey = getTodayKey();

  return (
    <div className="flex flex-col gap-3 w-full">
      <p className="font-bold text-3xl">{t("Working Hours")}</p>
      <div className="flex gap-4 items-center w-full flex-wrap">
        {Object.entries(workingDays).map(([dayKey, dayInfo]) => {
          const dayData = dayInfo as ServiceDayWorkingHours; // Narrow the type here
          const today = dayKey === todayKey;
          const isDayOff = dayData.periods.length === 0;

          // Only parse dates if it's not a day off
          const fromDate = !isDayOff
            ? parseTimeToDate(dayData.periods[0])
            : null;
          const toDate = !isDayOff ? parseTimeToDate(dayData.periods[1]) : null;

          return (
            <div
              key={dayKey}
              className="flex flex-col items-center w-fit gap-[0.625rem]"
            >
              <p className="text-primary font-bold text-xs">
                {today ? t("Today") : ""}
              </p>
              <div
                className={`${
                  today ? "border-2 border-primary rounded-xl" : ""
                } pt-[0.625rem] pb-6 text-lg px-4 flex flex-col items-center gap-8`}
              >
                <p className="text-sm text-center text-lightBlack font-semibold">
                  {t(days[dayKey])}
                </p>
                <div className="text-primary flex items-center w-11">
                  <TimeClockDisplay
                    from={fromDate}
                    to={toDate}
                    off={isDayOff}
                  />
                </div>
                <div
                  className={`whitespace-nowrap text-center ${
                    isDayOff ? "text-grayText" : "text-primary"
                  } font-semibold text-sm`}
                >
                  {isDayOff
                    ? t("Day Off")
                    : `${fromDate?.getHours()}:${fromDate
                        ?.getMinutes()
                        .toString()
                        .padStart(2, "0")} - ${toDate?.getHours()}:${toDate
                        ?.getMinutes()
                        .toString()
                        .padStart(2, "0")}`}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
