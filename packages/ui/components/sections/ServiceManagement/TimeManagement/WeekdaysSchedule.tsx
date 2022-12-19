import React from "react";
import { useTranslation } from "react-i18next";
import { WeekdaysOpenTimeInput } from "@UI";

export const WeekdaysSchedule: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full">
      <p className="text-lg font-semibold text-primary-500 px-4 py-2 bg-primary-50">
        {t(
          "configure_your_time",
          "Configure your week settings here, must move the sliders and add/remove breaktimes to set up working hours."
        )}
      </p>
      <WeekdaysOpenTimeInput onChange={() => {}} value={[]} />
    </div>
  );
};
