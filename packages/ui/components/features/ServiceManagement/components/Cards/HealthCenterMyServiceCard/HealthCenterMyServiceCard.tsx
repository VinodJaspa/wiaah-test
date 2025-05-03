import { HealthCenterMyServiceDataType } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  ServicesRequestKeys,
  Badge,
  TrashIcon,
  EditIcon,
  WorkingDaysCalender,
  AspectRatioImage,
  Button,
} from "@UI";
import { randomNum, setTestid } from "utils";

export interface HealthCenterMyServiceCardProps
  extends HealthCenterMyServiceDataType {
  onEdit: (id: string) => any;
  onRemove: (id: string) => any;
}

export const HealthCenterMyServiceCard: React.FC<
  HealthCenterMyServiceCardProps
> = ({ onRemove, onEdit, ...props }) => {
const { t } = useTranslation();
  const { workingDates, ...centerData } = props;

  return (
    <div className="border border-gray-400 rounded p-2 flex flex-col sm:flex-row justify-between gap-8">
      <div
        className={`sm:flex-row flex-col flex gap-8 shadow justify-between rounded w-full `}
      >
        <div className="flex flex-col justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="min-w-[13rem]">
              <AspectRatioImage
                className="group"
                src={centerData.thumbnail}
                alt={centerData.title}
                ratio={6 / 5}
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col font-bold text-lg gap-2">
                <p className="">{centerData.title}</p>
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
        </div>
        <div className="flex max-w-md flex-col w-full gap-2 thinScroll py-4">
          <WorkingDaysCalender
            workingDates={[
              {
                date: workingDates[0].date.toString(),
                workingHoursRanges: [
                  {
                    from: workingDates[0].workingHoursRanges[0].from.toString(),
                    to: workingDates[0].workingHoursRanges[0].to.toString(),
                  },
                ],
              },
            ]}
            takenDates={[
              {
                date: workingDates[0].date.toString(),
                workingHoursRanges: [
                  {
                    from: workingDates[0].workingHoursRanges[0].from.toString(),
                    to: workingDates[0].workingHoursRanges[0].to.toString(),
                  },
                ],
              },
            ]}
          />
        </div>
      </div>

      <div className="flex flex-col items-end text-xl gap-6">
        <Badge className="whitespace-nowrap">{t("Health Center")}</Badge>
        <div className="flex gap-2 text-3xl">
          <EditIcon
            {...setTestid("EditServiceBtn")}
            className="cursor-pointer"
            onClick={() => onEdit && onEdit(centerData.id)}
          />
          <TrashIcon
            {...setTestid("RemoveServiceBtn")}
            onClick={() => onRemove && onRemove(centerData.id)}
            className="text-secondaryRed cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
