import { WorkingDate } from "types";
import { WorkingSchedule } from "../types";

export function convertWorkingScheduleToWorkingHours(
  schedule: WorkingSchedule
): WorkingDate[] {
  return Object.entries(schedule.weekdays).map(([key, value], i) => ({
    date: new Date(value?.periods[0] || "").toString(),
    workingHoursRanges: [
      {
        from:
          typeof value === "object"
            ? new Date(value?.periods[0] || "").toString()
            : new Date().toString(),
        to:
          typeof value === "object"
            ? new Date(value?.periods[1] || "").toString()
            : new Date().toString(),
      },
    ],
  }));
}
