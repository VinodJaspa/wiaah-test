import React from "react";
import { useTranslation } from "react-i18next";
import {
  TimeIcon,
  TimeType,
  Menu,
  MenuList,
  TimeInput,
  MenuButton,
  ResturantReplacableTimeComponent,
} from "ui";

export interface VehiclePickupTimeInputProps {}

export const VehiclePickupTimeInput: React.FC<
  VehiclePickupTimeInputProps
> = ({}) => {
  const [time, setTime] = React.useState<TimeType>();
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded text-black p-2 flex gap-2 h-full items-center">
      <Menu>
        <MenuButton>
          <div className="flex gap-2 cursor-pointer items-center">
            <TimeIcon />

            <div>
              <p>{t("Time")}</p>
              <p className="font-bold">
                {time ? `${time.hour}:${time.minutes}` : null}
              </p>
            </div>
          </div>
        </MenuButton>
        <MenuList className="w-64">
          <TimeInput
            timeRange={{
              from: {
                hour: 6,
                minutes: 0,
              },
              to: {
                hour: 24,
                minutes: 0,
              },
            }}
            onTimeSelect={setTime}
          />
        </MenuList>
      </Menu>
    </div>
  );
};
