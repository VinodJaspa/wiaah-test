import React from "react";
import { FormatedWorkingDaysType, WorkingDate } from "types";
import { WorkingDayColumn } from "./WorkingDayColumn";

export interface WorkingDaysCalanderProps {
  workingDates: WorkingDate[];
  hoursLimit?: number;
}

export const WorkingDaysCalander: React.FC<WorkingDaysCalanderProps> = ({
  workingDates,
  hoursLimit = 5,
}) => {
  const [formatedWorkingDays, setFormatedWorkingDays] = React.useState<
    FormatedWorkingDaysType[]
  >([]);

  function FormatWorkingDates() {
    const dates: FormatedWorkingDaysType[] = workingDates.map((date, i) => {
      const { date: dayDate, workingHoursRanges } = date;

      const day = new Date(dayDate);

      const weekday = day.toLocaleDateString("en-us", {
        weekday: "long",
      });

      const monthName = day.toLocaleDateString("en-us", {
        month: "short",
      });
      const numiricDay = day.toLocaleDateString("en-us", {
        day: "numeric",
      });

      return {
        dayNum: parseInt(numiricDay),
        monthName: monthName,
        weekday,
        times: workingHoursRanges,
      };
    });

    setFormatedWorkingDays(dates);
  }

  React.useEffect(() => {
    if (Array.isArray(workingDates)) {
      FormatWorkingDates();
    }
  }, [workingDates]);

  return (
    <div className="grid grid-cols-5 gap-4 min-w-fit bg-white">
      {Array.isArray(formatedWorkingDays)
        ? formatedWorkingDays.map((day, i) => (
            <WorkingDayColumn hoursLimit={hoursLimit} key={i} {...day} />
          ))
        : null}
    </div>
  );
};
