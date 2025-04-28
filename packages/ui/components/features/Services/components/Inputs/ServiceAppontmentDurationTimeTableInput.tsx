import React from "react";
import { WeekSwitcher } from "../DataDisplay";
import { mapArray, useForm } from "@UI/../utils/src";
import { ServiceAppointmentDurationTimeListInput } from "./ServiceAppointmentDurationTimeListInput";
import { Badge, Button, ExclamationCircleIcon, HStack, Input } from "@partials";
import { useTranslation } from "react-i18next";
import { HtmlDivProps } from "@UI/../types/src";

type value = { sessionDuration?: number; selected: Date[] };

export const ServiceAppontmentDurationTimeTableInput: React.FC<{
  workingDates: [Date, Date][];
  value: value;
  onChange: (v: value) => any;
  onWeekChange: (v: Date) => any;
  week: Date;
  selectionContainerProps?: HtmlDivProps;
  input?: boolean;
}> = ({
  workingDates,
  onChange,
  value,
  onWeekChange,
  week,
  selectionContainerProps,
  input,
}) => {
  const [_value, setValue] = React.useState<Record<number, Date[]>>({});

  const { form, handleChange } = useForm<{
    sessionDurationMin: number;
  }>(
    { sessionDurationMin: value.sessionDuration || 30 }
    // value.sessionDuration
    //   ? { sessionDurationMin: value.sessionDuration }
    //   : undefined
  );
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();

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

  const handleValueChange = (idx: number, dates: Date[]) => {
    if (onChange) {
      const newObject = { ..._value };
      delete newObject[idx];
      onChange({
        selected: [
          ...Object.values(newObject).reduce(
            (acc, curr) => [...acc, ...curr],
            []
          ),
        ],
        sessionDuration: form.sessionDurationMin,
      });
    }
    setValue((v) => ({ ...v, [idx]: dates }));
  };

  return (
    <div className="flex flex-col h-full gap-4 select-none p-4 rounded-lg shadow">
      {input ? (
        <>
          <HStack>
            <ExclamationCircleIcon />
            <p className="font-bold">
              {t(
                "Select the duration of your service single session in minutes"
              )}
            </p>
          </HStack>
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
        </>
      ) : null}
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
      {input ? (
        <HStack>
          <ExclamationCircleIcon />
          <p className="font-bold">
            {t(
              "Select the sessions you would like to be available to book or unSelect sessions you would not."
            )}
          </p>
        </HStack>
      ) : null}

      <HStack className="justify-between">
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
              <div className="flex flex-col py-2 justify-center items-center gap-1">
                <p className="font-bold">
                  {_week.toLocaleDateString("en-us", { weekday: "long" })}
                </p>
                <p className="text-xs">
                  {_week.toLocaleDateString("en-us", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          );
        })}
      </HStack>

      <HStack
        {...selectionContainerProps}
        className={`${
          selectionContainerProps?.className || ""
        } flex justify-between h-full overflow-y-scroll thinScroll`}
      >
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
              <ServiceAppointmentDurationTimeListInput
                baseDate={_week}
                onChange={(e) => {
                  handleValueChange(i, e);
                }}
                value={value.selected}
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
