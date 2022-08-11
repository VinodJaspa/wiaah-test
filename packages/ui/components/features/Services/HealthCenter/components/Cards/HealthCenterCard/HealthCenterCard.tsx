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
} from "ui";
import { setTestid } from "utils";

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
  const { visit } = useRouting();
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
          <div {...setTestid("ServicePresentation")} className="w-32">
            <AspectRatioImage
              className="group"
              src={centerData.photo}
              alt={centerData.name}
              ratio={3 / 4}
            >
              <div
                className={
                  "bg-black bg-opacity-0 transition-all opacity-0 pointer-events-none group-hover:opacity-100 group-hover:bg-opacity-25 group-hover:pointer-events-auto top-0 left-0 w-full h-full absolute flex justify-center items-center"
                }
              >
                <Button
                  onClick={() =>
                    visit((routes) =>
                      routes.visitService(
                        centerData,
                        ServicesRequestKeys.healthCenter
                      )
                    )
                  }
                >
                  {t("Details")}
                </Button>
              </div>
            </AspectRatioImage>
          </div>
          <div {...setTestid("ServiceInfo")} className="flex flex-col gap-4">
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
        <WorkingDaysCalender
          hoursLimit={hoursLimit}
          workingDates={workingDates}
        />
      </div>
    </div>
  );
};
