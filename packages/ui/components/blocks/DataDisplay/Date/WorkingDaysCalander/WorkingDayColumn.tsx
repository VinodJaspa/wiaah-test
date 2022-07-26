import React from "react";
import { useTranslation } from "react-i18next";
import { FormatedWorkingDaysType } from "types";

export interface WorkingDayColumnProps extends FormatedWorkingDaysType {
  hoursLimit: number;
}

export const WorkingDayColumn: React.FC<WorkingDayColumnProps> = ({
  dayNum,
  monthName,
  times,
  weekday,
  hoursLimit,
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center w-full flex-col">
        <p className="font-bold">{t(weekday)}</p>
        <p className="whitespace-nowrap">
          {dayNum} {t(monthName)}
        </p>
      </div>
      <div className="flex flex-col gap-2 w-full">
        {[...Array(hoursLimit)].map((_, i) => {
          const time = times[i];
          return (
            <React.Fragment key={i}>
              <div
                className={`${
                  time ? "bg-primary-100" : ""
                } w-full h-8 flex justify-center items-center rounded font-bold`}
              >
                {time ? (
                  <>
                    {new Date(time.from).getHours()}:
                    {new Date(time.from).getMinutes()}
                  </>
                ) : (
                  "--"
                )}
              </div>
              <div
                className={`${
                  time ? "bg-primary-100" : ""
                } w-full h-8 flex justify-center items-center rounded font-bold`}
              >
                {time ? (
                  <>
                    {new Date(time.to).getHours()}:
                    {new Date(time.to).getMinutes()}
                  </>
                ) : (
                  "--"
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
