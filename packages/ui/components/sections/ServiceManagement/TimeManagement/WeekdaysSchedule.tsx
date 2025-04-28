import React from "react";
import { useTranslation } from "react-i18next";
import { WeekdaysOpenTimeInput } from "@UI";
import { ServiceDayWorkingHours, WeekdaysWorkingHours } from "@features/API";
// Placeholder data for ServiceDayWorkingHours
const placeholderServiceDayWorkingHours: ServiceDayWorkingHours = {
  __typename: "ServiceServiceDayWorkingHours",
  periods: ["09:00-12:00", "13:00-17:00"],
};

// Placeholder data for WeekdaysWorkingHours
const placeholderWeekdaysWorkingHours: WeekdaysWorkingHours = {
  __typename: "WeekdaysWorkingHours",
  mo: placeholderServiceDayWorkingHours,
  tu: placeholderServiceDayWorkingHours,
  we: placeholderServiceDayWorkingHours,
  th: placeholderServiceDayWorkingHours,
  fr: placeholderServiceDayWorkingHours,
  sa: placeholderServiceDayWorkingHours,
  su: placeholderServiceDayWorkingHours,
};
export const WeekdaysSchedule: React.FC = () => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  return (
    <div className="w-full">
      <p className="text-lg font-semibold text-primary-500 px-4 py-2 bg-primary-50">
        {t(
          "configure_your_time",
          "Configure your week settings here, must move the sliders and add/remove breaktimes to set up working hours.",
        )}
      </p>
      <WeekdaysOpenTimeInput
        onChange={(data) => {
          console.log("time change", data);
        }}
        value={placeholderWeekdaysWorkingHours}
      />
    </div>
  );
};
