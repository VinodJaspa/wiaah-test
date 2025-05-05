import { HealthCenterPractitioner } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { WorkingDate } from "types";
import {
  Button,
  AspectRatioImage,
  WorkingDaysCalender,
  ServicesRequestKeys,
  HealthCenterDoctor,
  HealthCenter,
} from "@UI";
import { setTestid } from "utils";

export const convertWorkingDates = (
  workingDates: WorkingDate[],
): ConvertedWorkingDate[] => {
  return workingDates.map(({ date, workingHoursRanges }) => ({
    date: String(date),
    workingHoursRanges: workingHoursRanges.map(({ from, to }) => ({
      from: String(from),
      to: String(to),
    })),
  }));
};

export interface HealthCenterCardProps {
  centerData: HealthCenterDoctor & { healthCenter: HealthCenter };
  workingDates: WorkingDate[];
  vertical?: boolean;
}

interface ConvertedWorkingDate {
  date: string;
  workingHoursRanges: {
    from: string;
    to: string;
  }[];
}
export const HealthCenterCard: React.FC<HealthCenterCardProps> = ({
  centerData,
  workingDates,
  vertical = false,
}) => {
  const { visit } = useRouting();
  const [hoursLimit, setHoursLimit] = React.useState<number>(2);
const { t } = useTranslation();
  // this function converts the WrokingDate type to get passed to WorkingDaysCalender
  const convertedWrokingDates = convertWorkingDates(workingDates);

  return (
    <div
      className={`${vertical ? "flex-col" : "flex-row "
        } flex shadow justify-between rounded w-full p-2 `}
    >
      <div className="flex flex-col justify-between gap-4">
        <div className="flex gap-4">
          <div {...setTestid("ServicePresentation")} className="w-32">
            <AspectRatioImage
              className="group"
              src={centerData.thumbnail}
              alt={centerData.name}
              ratio={3 / 4}
            />
          </div>
          <div {...setTestid("ServiceInfo")} className="flex flex-col gap-4">
            <div className="flex flex-col font-bold text-lg gap-2">
              <p className="text-primary">{centerData.name}</p>
              <p className="">{centerData.speciality?.name}</p>
            </div>
            <div className="font-semibold flex flex-col gap-2">
              <p>{centerData.healthCenter?.location.address}</p>
              <span className="flex gap-2">
                <p>
                  {centerData.healthCenter.location.postalCode}{" "}
                  {centerData.healthCenter.location.city}
                </p>
              </span>
            </div>
          </div>
        </div>
        <Button
          onClick={() =>
            visit((routes) =>
              routes.visitService(centerData, ServicesRequestKeys.healthCenter),
            )
          }
          className="w-1/2"
        >
          {t("Book now")}
        </Button>
      </div>
      <div className="flex w-fit gap-4">
        <WorkingDaysCalender
          workingDates={convertedWrokingDates}
          takenDates={convertedWrokingDates}
        />
      </div>
    </div>
  );
};
