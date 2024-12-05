import { useResponsive } from "hooks";
import React from "react";
import {
  HealthCenterCard,
  HealthCenterDoctor,
  HealthCenter,
  convertWorkingScheduleToWorkingHours,
} from "@UI";

export interface HealthCenterServiceSearchResultsListProps {
  doctors: (HealthCenterDoctor & { healthCenter: HealthCenter })[];
}

export const HealthCenterServiceSearchResultsList: React.FC<
  HealthCenterServiceSearchResultsListProps
> = ({ doctors }) => {
  const { isTablet } = useResponsive();

  return (
    <div className="w-full flex flex-col justify-between">
      <div className="flex flex-col gap-4">
        {Array.isArray(doctors)
          ? doctors.map((s) => (
            <HealthCenterCard
              vertical={isTablet}
              centerData={s}
              workingDates={convertWorkingScheduleToWorkingHours(
                s.healthCenter.workingHours,
              )}
            />
          ))
          : null}
      </div>
    </div>
  );
};
