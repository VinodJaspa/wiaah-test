import React from "react";
import { useTranslation } from "react-i18next";
import { TimeClockDisplay } from "@UI";
import {
  ServiceDayWorkingHours,
  ServiceWeekdaysWorkingHours,
  ServiceWorkingSchedule,
  WeekdaysWorkingHours,
} from "@features/API";

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

export const SellerServiceWorkingHoursSection: React.FC<
  SellerServiceWorkingHoursSectionProps
> = ({ workingDays }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3 w-full">
      <p className="font-bold text-3xl">{t("Working Hours")}</p>
      <div className="flex gap-4 items-center w-fit">
        {Object.entries(workingDays).map(([dayKey, dayInfo]) => {
          const dayData = dayInfo as ServiceDayWorkingHours; // Narrow the type here
          const today = dayKey === "mo"; // Example logic for "Today"; adjust as needed
          const isDayOff = dayData.periods.length === 0;
          const fromDate = parseTimeToDate(dayData.periods[0]);
          const toDate = parseTimeToDate(dayData.periods[1]);

          return (
            <div
              key={dayKey}
              className="flex flex-col items-center w-full gap-[0.625rem]"
            >
              <p className="text-primary font-bold text-xs">
                {today ? t("Today") : ""}
              </p>
              <div
                className={`${today ? "border-2 border-primary rounded-xl" : ""
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
                  className={`whitespace-nowrap text-center ${isDayOff ? "text-grayText" : "text-primary"
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
