import React from "react";
import { FormatedWorkingDaysType, WorkingDate } from "types";
import { WorkingDayColumn } from "./WorkingDayColumn";
import { Slider, ArrowLeftIcon, ArrowRightIcon } from "ui";

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
    <Slider
      rightArrowComponent={ArrowRightIcon}
      leftArrowComponent={ArrowLeftIcon}
      itemsCount={5}
      gap={8}
      containerProps={{ style: { overflow: "visible" } }}
      childsWrapperProps={{
        className: "max-h-48 overflow-y-scroll thinScroll",
      }}
      arrowLeftProps={{
        className: "top-[1rem] text-4xl -translate-x-[100%] text-primary",
      }}
      arrowRightProps={{
        className: "top-[1rem] text-4xl translate-x-[calc(70%)] text-primary",
      }}
    >
      {Array.isArray(formatedWorkingDays)
        ? formatedWorkingDays.map((day, i) => (
            <WorkingDayColumn
              hoursLimit={formatedWorkingDays.length}
              key={i}
              {...day}
            />
          ))
        : null}
    </Slider>
  );
};
