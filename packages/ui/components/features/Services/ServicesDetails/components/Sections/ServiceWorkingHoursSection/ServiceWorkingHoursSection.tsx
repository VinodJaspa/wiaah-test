import { WorkingSchedule } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { usePublishRef } from "state";
import { ArrElement } from "types";

export interface ServiceWorkingHoursSectionProps {
  workingHours: WorkingSchedule;
}

export const ServiceWorkingHoursSection: React.FC<
  ServiceWorkingHoursSectionProps
> = ({ workingHours }) => {
  const { t } = useTranslation();
  const workingDays = Object.entries(workingHours.weekdays).map(
    ([key, value], i) => ({
      weekday: key,
      from:
        typeof value === "object" && value !== null
          ? new Date(value.periods[0])
          : null,
      to:
        typeof value === "object" && value !== null
          ? new Date(value.periods[1])
          : null,
    })
  );

  const checkIsWorkingDay = React.useCallback(
    (day: ArrElement<typeof workingDays>) => {
      if (!day.from || !day.to) return false;
      return true;
    },
    []
  );

  const workingHoursRef = usePublishRef((keys) => keys.workingHours);
  return (
    <div className="w-full">
      <p className="text-lg font-bold" ref={workingHoursRef ?? undefined}>
        {t("Working hours")}
      </p>
      <div className="flex flex-col">
        {workingDays.map((day, i) => (
          <div
            key={i}
            className={`flex justify-between w-full rounded border-t-[1px] border-x-[1px] py-2`}
          >
            <p className="font-bold">{t(day.weekday)}</p>
            <p className="whitespace-nowrap">
              {checkIsWorkingDay(day)
                ? `${day.from?.getHours()}H${day.from?.getMinutes()} - ${day.to?.getHours()}H${day.to?.getMinutes()}`
                : t("closed")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
