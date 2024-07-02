import { useResponsive } from "hooks";
import React from "react";
import {
  HealthCenterCard,
  HealthCenterDoctor,
  HealthCenter,
  convertWorkingScheduleToWorkingHours,
} from "@UI";

export const HealthCenterServiceSearchResultsList: React.FC<{
  doctors: (HealthCenterDoctor & { healthCenter: HealthCenter })[];
}> = ({ doctors }) => {
  const { isTablet } = useResponsive();

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        {Array.isArray(doctors)
          ? doctors.map((s) => (
            <HealthCenterCard
              vertical={isTablet}
              centerData={s}
              workingDates={convertWorkingScheduleToWorkingHours(
                s.healthCenter.workingHours
              )}
            />
          ))
          : null}
      </div>
    </div>
  );
};
