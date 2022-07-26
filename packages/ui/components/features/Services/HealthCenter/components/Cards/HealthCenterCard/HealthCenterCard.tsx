import { HealthCenterPractitioner } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { WorkingDate } from "types";
import { Button, AspectRatio, WorkingDaysCalander } from "ui";

export interface HealthCenterCardProps {
  centerData: HealthCenterPractitioner;
  workingDates: WorkingDate[];
  vertical?: boolean;
}

export const HealthCenterCard: React.FC<HealthCenterCardProps> = ({
  centerData,
  workingDates,
  vertical = false,
}) => {
  const [hoursLimit, setHoursLimit] = React.useState<number>(2);
  const { t } = useTranslation();
  return (
    <div
      className={`${
        vertical ? "flex-col" : "flex-row min-w-[50rem]"
      } flex gap-8 shadow justify-between rounded w-full `}
    >
      <div className="flex flex-col justify-between gap-4">
        <div className="flex gap-4">
          <div className="w-32">
            <AspectRatio ratio={3 / 4}>
              <img
                className="w-full h-full object-cover"
                src={centerData.photo}
                alt={centerData.name}
              />
            </AspectRatio>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col font-bold text-lg gap-2">
              <p className="text-primary">{centerData.name}</p>
              <p className="">{centerData.specialty}</p>
            </div>
            <div className="font-semibold flex flex-col gap-2">
              <p>{centerData.location.address}</p>
              <span className="flex gap-2">
                <p>
                  {centerData.location.postalCode} {centerData.location.city}
                </p>
              </span>
            </div>
          </div>
        </div>
        <Button className="w-1/2">{t("Book now")}</Button>
      </div>
      <div className="flex flex-col gap-2 thinScroll py-4">
        <WorkingDaysCalander
          hoursLimit={hoursLimit}
          workingDates={workingDates}
        />
        {/* <p className="font-bold text-lg uppercase w-full flex justify-center text-primary cursor-pointer">
          {t("see more hours")}
        </p> */}
      </div>
    </div>
  );
};
