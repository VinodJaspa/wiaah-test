import { DateType, WorkingDate, WorkingHoursRange } from "types";
import { WorkingSchedule } from "../types";
import { ServiceDayWorkingHours } from "@features/API/gql/generated";

function isServiceDayWorkingHours(value: any): value is ServiceDayWorkingHours {
  return typeof value === "object" && value !== null && "periods" in value;
}
export function convertWorkingScheduleToWorkingHours(
  schedule: WorkingSchedule,
): WorkingDate[] {
  const weekdays = schedule.weekdays;
  const workingDates: WorkingDate[] = [];

  // Iterate over weekdays
  Object.entries(weekdays).forEach(([key, value]) => {
    // Check if value is ServiceDayWorkingHours using type guard
    if (isServiceDayWorkingHours(value)) {
      // value has the 'periods' property, safe to access value.periods
      const workingHoursRanges: WorkingHoursRange[] = [];

      value.periods.forEach((period) => {
        // Parse period and create WorkingHoursRange object
        const [startTimeStr, endTimeStr] = period.split("-");
        if (startTimeStr && endTimeStr) {
          const startTime: string = new Date(startTimeStr.trim()).toString();
          const endTime: string = new Date(endTimeStr.trim()).toString();

          workingHoursRanges.push({ from: startTime, to: endTime });
        }
      });

      // Push to workingDates array
      workingDates.push({
        date: key as DateType, // Assuming key is the date or day abbreviation
        workingHoursRanges: workingHoursRanges,
      });
    }
  });

  return workingDates;
}
