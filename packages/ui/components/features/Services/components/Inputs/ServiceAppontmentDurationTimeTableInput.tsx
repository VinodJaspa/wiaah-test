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
}> = ({ onChange, value, workingDates }) => {
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
        <WeekSwitcher onNext={() => {}} onPrev={() => {}} />
      </div>

      <HStack className="justify-between h-full overflow-y-scroll thinScroll">
        {mapArray(weekDays, (v) => (
          <ServiceAppointmentDurationTimeListInput
            onChange={() => {}}
            value={[]}
            allowedPeriods={workingDates}
            durationInMin={form.sessionDurationMin}
          />
        ))}
      </HStack>
    </div>
  );
};
