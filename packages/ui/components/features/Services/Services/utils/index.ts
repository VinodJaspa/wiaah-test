import { DateType, WorkingDate, WorkingHoursRange } from "types";
import { WorkingSchedule } from "../types";
import { ServiceDayWorkingHours } from "@features/API/gql/generated";

function isServiceDayWorkingHours(value: any): value is ServiceDayWorkingHours {
  return (
    typeof value === "object" &&
    value !== null &&
    "periods" in value &&
    Array.isArray(value.periods) &&
    value.periods.every((period) => typeof period === "string")
  );
}

export function convertWorkingScheduleToWorkingHours(
  schedule: WorkingSchedule,
): WorkingDate[] {
  const weekdays = schedule.weekdays;
  const workingDates: WorkingDate[] = [];

  Object.entries(weekdays).forEach(([dayOrDate, value]) => {
    if (isServiceDayWorkingHours(value)) {
      const workingHoursRanges: WorkingHoursRange[] = [];

      value.periods.forEach((period) => {
        const [startTimeStr, endTimeStr] = period.split("-");

        if (startTimeStr && endTimeStr) {
          const startTime = startTimeStr.trim();
          const endTime = endTimeStr.trim();

          if (startTime && endTime) {
            workingHoursRanges.push({
              from: startTime,
              to: endTime,
            });
          } else {
            console.log("Invalid Time Range:", startTime, endTime);
          }
        }
      });

      workingDates.push({
        date: dayOrDate as DateType,
        workingHoursRanges,
      });
    }
  });

  return workingDates;
}
