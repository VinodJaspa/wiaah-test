import React from "react";
import { useTranslation } from "react-i18next";
import {
  CalenderIcon,
  ClockIcon,
  DateInput,
  TimeInput,
  Menu,
  MenuButton,
  MenuList,
  TimeType,
} from "@UI";
import { DateDetails } from "utils";

export interface DateAndTimeInputProps {
  onDateChange: (date: Date) => any;
  dateLabel: string;
}

export const DateAndTimeInput: React.FC<DateAndTimeInputProps> = ({
  dateLabel,
  onDateChange,
}) => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const [dayDateUtc, setDayDateUtc] = React.useState<string>();
  const [time, setTime] = React.useState<TimeType>({ hour: 10, minutes: 0 });
  const dayDate = new Date(dayDateUtc || Date.now());
  const date = new Date(
    Date.UTC(
      dayDate.getFullYear(),
      dayDate.getMonth(),
      dayDate.getDate(),
      time ? time.hour : 0,
      time ? time.minutes : 0
    )
  );
  const dateDetails = DateDetails(date);
  React.useEffect(() => {
    if (onDateChange) {
      onDateChange(date);
    }
  }, [date]);
  return (
    <div className="flex gap-8 justify-between whitespace-nowrap">
      <Menu>
        <MenuButton>
          <div className="flex gap-2 items-center">
            <CalenderIcon className="text-[2em] text-primary" />
            <div className="flex flex-col">
              <p>{dateLabel}</p>
              <p className="font-bold">
                {dateDetails
                  ? `${dateDetails.month_2digit}.${dateDetails.day}.${dateDetails.year_num}`
                  : null}
              </p>
            </div>
          </div>
        </MenuButton>
        <MenuList>
          <DateInput
            onDaySelect={(date) => {
              const parsedDate = Date.parse(date);
              if (parsedDate) {
                setDayDateUtc(date);
              }
            }}
          />
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton>
          <div className="flex gap-2 items-center">
            <ClockIcon className="text-[2em] text-primary" />
            <div className="flex flex-col">
              <p>{t("Time")}</p>
              <p className="font-bold">
                {dateDetails ? `${dateDetails.am_pm_hour_minute}` : null}
              </p>
            </div>
          </div>
        </MenuButton>
        <MenuList>
          <TimeInput onTimeSelect={(time) => setTime(time)} />
        </MenuList>
      </Menu>
    </div>
  );
};
