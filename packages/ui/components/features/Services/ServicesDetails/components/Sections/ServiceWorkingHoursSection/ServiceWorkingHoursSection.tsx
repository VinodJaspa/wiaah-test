import {
  ServiceWeekdaysWorkingHours,
  ServiceWorkingSchedule,
} from "@features/API";
import { WorkingSchedule } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { usePublishRef } from "state";
import { ArrElement } from "types";

export interface ServiceWorkingHoursSectionProps {
  workingHours:
  | Pick<ServiceWorkingSchedule, "id" | "weekdays">
  | WorkingSchedule;
}

export const ServiceWorkingHoursSection: React.FC<
  ServiceWorkingHoursSectionProps
> = ({ workingHours }) => {
const { t } = useTranslation();

  // Parse working hours from "HH:mm-HH:mm" format
  const parsePeriod = (period: string) => {
    const [fromTime, toTime] = period.split("-");

    const [fromHours, fromMinutes] = fromTime.split(":").map(Number);
    const [toHours, toMinutes] = toTime.split(":").map(Number);

    const from = new Date();
    from.setHours(fromHours, fromMinutes, 0, 0);

    const to = new Date();
    to.setHours(toHours, toMinutes, 0, 0);

    return { from, to };
  };

  // Convert weekdays object into an array of working days
  const workingDays = Object.entries(workingHours.weekdays).map(
    ([key, value]) => {
      if (
        value &&
        typeof value === "object" &&
        "periods" in value &&
        Array.isArray(value.periods)
      ) {
        const periods = value.periods.map(parsePeriod);

        // Combine all periods into a single range string
        return {
          weekday: key,
          periods,
        };
      }

      return { weekday: key, periods: [] };
    },
  );

  const checkIsWorkingDay = React.useCallback(
    (day: ArrElement<typeof workingDays>) => day.periods.length > 0,
    [],
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
            className="flex justify-between w-full rounded border-t-[1px] border-x-[1px] px-2"
          >
            <p className="font-bold">{t(day.weekday)}</p>
            <p className="whitespace-nowrap">
              {checkIsWorkingDay(day)
                ? day.periods
                  .map(
                    ({ from, to }) =>
                      `${from.getHours()}:${from
                        .getMinutes()
                        .toString()
                        .padStart(2, "0")} - ${to.getHours()}:${to
                          .getMinutes()
                          .toString()
                          .padStart(2, "0")}`,
                  )
                  .join(", ")
                : t("closed")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
