import { ServiceWorkingDays } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { DateDetails, mapArray } from "utils";
import { TimeClockDisplay } from "ui";

export interface SellerServiceWorkingHoursSection extends ServiceWorkingDays {}

export const SellerServiceWorkingHoursSection: React.FC<
  SellerServiceWorkingHoursSection
> = ({ workingDays }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col w-full gap-8">
      <p className="font-bold text-3xl">{t("Working Hours")}</p>
      <div className="flex gap-4 items-center">
        {mapArray(workingDays, (day, i) => {
          const today = i === 1 ? true : false;
          const fromDate = DateDetails(new Date(day.from));
          const toDate = DateDetails(new Date(day.to));
          const dayoff = i === 4;
          return (
            <div
              key={i}
              className="flex flex-col items-center w-full gap-[0.625rem]"
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
                  {day.weekDay}
                </p>
                <div className="text-primary flex items-center w-11">
                  <TimeClockDisplay
                    from={new Date(day.from)}
                    to={new Date(day.to)}
                    off={dayoff}
                  />
                </div>
                <div
                  className={`whitespace-nowrap text-center ${
                    dayoff ? "text-grayText" : "text-primary"
                  } font-semibold text-sm`}
                >
                  {dayoff
                    ? t("Day Off")
                    : `
                  ${fromDate?.hour}:${fromDate?.twoDigitMinute}-${toDate?.hour}:
                  ${toDate?.twoDigitMinute}
                  `}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
