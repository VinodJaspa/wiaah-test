import { ServiceWorkingDays } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { usePublishRef } from "state";
import { ArrElement } from "types";

export interface ServiceWorkingHoursSectionProps extends ServiceWorkingDays {}

export const ServiceWorkingHoursSection: React.FC<
  ServiceWorkingHoursSectionProps
> = ({ workingDays }) => {
  const { t } = useTranslation();
  const checkIsWorkingDay = React.useCallback(
    (day: ArrElement<typeof workingDays>) => {
      if (
        day.from.hour === 0 &&
        day.from.minutes === 0 &&
        day.to.hour === 0 &&
        day.to.minutes === 0
      )
        return false;
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
            <p className="font-bold">{t(day.weekDay)}</p>
            <p className="whitespace-nowrap">
              {checkIsWorkingDay(day)
                ? `${day.from.hour}H${day.from.minutes} - ${day.to.hour}H${day.to.minutes}`
                : t("closed")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
