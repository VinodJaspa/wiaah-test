import React from "react";
import { WeekSwitcher } from "../DataDisplay";
import { mapArray, useForm, weekDays } from "@UI/../utils/src";
import { ServiceAppointmentDurationTimeListInput } from "./ServiceAppointmentDurationTimeListInput";
import { Button, HStack, Input } from "@partials";
import { useTranslation } from "react-i18next";

export const ServiceAppontmentDurationTimeTableInput: React.FC<{
  workingDates: [Date, Date][];
  value: Date[];
  onChange: (v: Date[]) => any;
  onWeekChange: (v: Date) => any;
  week: Date;
}> = ({ workingDates, onChange, onWeekChange, week }) => {
  const [value, setValue] = React.useState<Date[]>([]);

  const { form, handleChange } = useForm<{
    sessionDurationMin: number;
  }>({ sessionDurationMin: 30 });
  const { t } = useTranslation();

  const defaultSessionDuration: {
    label: string;
    duration: number;
  }[] = [
    { duration: 15, label: "15 min" },
    { duration: 30, label: "30 min" },
    { duration: 45, label: "45 min" },
    { duration: 60, label: "1 hour" },
  ];

  React.useEffect(() => {
    if (!form.sessionDurationMin) handleChange("sessionDurationMin", 30);
  }, [form.sessionDurationMin]);

  return (
    <div className="flex flex-col h-full gap-4 p-4 rounded-lg shadow">
      <HStack className="flex-wrap">
        {mapArray(defaultSessionDuration, (v, i) => (
          <Button
            onClick={() => handleChange("sessionDurationMin", v.duration)}
            colorScheme={
              form.sessionDurationMin === v.duration ? "primary" : "white"
            }
            key={i}
          >
            {v.label}
          </Button>
        ))}
        <HStack>
          <p>{t("or")}</p>
          <Input
            type="number"
            value={
              defaultSessionDuration
                .map((v) => v.duration)
                .includes(form.sessionDurationMin)
                ? ""
                : form.sessionDurationMin
            }
            onChange={(v) =>
              handleChange("sessionDurationMin", parseInt(v.target.value))
            }
          />
        </HStack>
      </HStack>
      <div className="mx-auto">
        <WeekSwitcher
          date={week}
          onNext={() => {
            onWeekChange(new Date(new Date().setDate(week.getDate() + 6)));
          }}
          onPrev={() => {
            onWeekChange(new Date(new Date().setDate(week.getDate() - 6)));
          }}
        />
      </div>

      <HStack className="flex justify-between  thinScroll">
        {mapArray([...Array(7)], (_, i) => {
          const days = week.getDay();

          const targetDate = week.getDate() - days;
          const _week = new Date(
            week.getFullYear(),
            week.getMonth(),
            targetDate + i
          );

          return (
            <div className="flex flex-col gap-2">
              {_week.toDateString()}
              <ServiceAppointmentDurationTimeListInput
                baseDate={_week}
                onChange={(e) => {
                  setValue(e);
                }}
                value={value}
                allowedPeriods={workingDates}
                durationInMin={form.sessionDurationMin}
              />
            </div>
          );
        })}
      </HStack>
    </div>
  );
};
