import React from "react";
import { useTranslation } from "react-i18next";

export interface WorkingDayColumnProps {
  dayDate: Date;
  dates: {
    date: Date;
    available: boolean;
  }[];
  onClick: (date: Date) => void;
}

export const WorkingDayColumn: React.FC<WorkingDayColumnProps> = ({
  dates,
  dayDate,
  onClick,
}) => {
  const date = new Date(dayDate);
  
const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center w-full flex-col">
        <p className="font-bold  ">
          {date.toLocaleDateString("en-us", { weekday: "long" })}
        </p>
        <p className="whitespace-nowrap text-gray-500 font-medium ">
          {date.getDate()}
        </p>
      </div>
      <div className="flex flex-col gap-2 w-full">
        {dates.map((date, i) => {
          const formatter = new Intl.DateTimeFormat("en-us", {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <button
              onClick={date.available ? () => onClick(date.date) : undefined}
              key={i}
              className={`${
                date.available ? "bg-primary-100" : "bg-gray-100"
              } w-full p-[2px] px-2 h-8  flex justify-center items-center rounded font-bold whitespace-nowrap`}
            >
              {formatter.format(new Date(date.date)) ?? "--"}
            </button>
          );
        })}
      </div>
    </div>
  );
};
