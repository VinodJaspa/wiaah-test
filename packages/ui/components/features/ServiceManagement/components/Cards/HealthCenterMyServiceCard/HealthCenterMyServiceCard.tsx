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
} from "ui";
import { randomNum } from "utils";

export interface HealthCenterMyServiceCardProps
  extends HealthCenterMyServiceDataType {
  onEdit: (serviceType: string, id: string) => any;
  onRemove: (serviceType: string, id: string) => any;
}

export const HealthCenterMyServiceCard: React.FC<
  HealthCenterMyServiceCardProps
> = ({ onRemove, onEdit }) => {
  const { t } = useTranslation();
  const { visit } = useRouting();
  const centerData = {
    location: {
      address: "Boulvard James-Fazy 4",
      city: "Geneve",
      cords: {
        lat: randomNum(100),
        lng: randomNum(100),
      },
      country: "france",
      countryCode: "CHF",
      state: "Geneve",
      postalCode: 1201,
    },
    id: `${1}`,
    rate: randomNum(15),
    name: "Wiaah medical center",
    photo:
      "https://www.guthrie.org/sites/default/files/2021-11/cortland-medical-center.jpg",
    specialty: "Dentist",
  };
  const workingDates = [
    {
      date: Date.now(),
      workingHoursRanges: [...Array(2)].map(() => ({
        from: Date.now(),
        to: Date.now(),
      })),
    },
    {
      date: Date.now(),
      workingHoursRanges: [...Array(1)].map(() => ({
        from: Date.now(),
        to: Date.now(),
      })),
    },
    {
      date: Date.now(),
      workingHoursRanges: [...Array(2)].map(() => ({
        from: Date.now(),
        to: Date.now(),
      })),
    },
    {
      date: Date.now(),
      workingHoursRanges: [...Array(1)].map(() => ({
        from: Date.now(),
        to: Date.now(),
      })),
    },
    {
      date: Date.now(),
      workingHoursRanges: [...Array(2)].map(() => ({
        from: Date.now(),
        to: Date.now(),
      })),
    },
  ];

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
                src={centerData.photo}
                alt={centerData.name}
                ratio={6 / 5}
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col font-bold text-lg gap-2">
                <p className="">{centerData.name}</p>
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
          <WorkingDaysCalender hoursLimit={1} workingDates={workingDates} />
        </div>
      </div>

      <div className="flex flex-col items-end text-xl gap-6">
        <Badge className="whitespace-nowrap">{t("Health Center")}</Badge>
        <div className="flex gap-2 text-3xl">
          <EditIcon
            className="cursor-pointer"
            onClick={() => onEdit && onEdit("hotel", centerData.id)}
          />
          <TrashIcon
            onClick={() => onRemove && onRemove("hotel", centerData.id)}
            className="text-secondaryRed cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
