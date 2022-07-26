import React from "react";
import { FilterAndAddToArray, PassPropsToFnOrElem } from "utils";
import { AspectRatio } from "ui";

export interface TimeCustomComponentProps {
  onClick: (id: string) => any;
  selected: boolean;
  time: TimeType;
}

type TimeRange = {
  from: TimeType;
  to: TimeType;
};

export interface TimeInputProps {
  timeRange: TimeRange;
  timeComponent?: React.ReactNode;
  onTimeSelect?: (time: TimeType) => any;
}

export type TimeType = {
  hour: number;
  minutes: number;
  id?: string;
};

const DefaultTimeComponent: React.FC<TimeCustomComponentProps> = ({
  onClick,
  selected,
  time,
}) => {
  return (
    <AspectRatio onClick={() => onClick(time.id || "")} ratio={3 / 4}>
      <div
        className={`${
          selected ? "text-white bg-primary" : ""
        } w-full flex justify-center items-center h-full`}
      >
        <p>
          {`${time.hour}:${
            time.minutes < 10 ? `0${time.minutes}` : time.minutes
          }`}
        </p>
      </div>
    </AspectRatio>
  );
};

export const TimeInput: React.FC<TimeInputProps> = ({
  timeRange,
  timeComponent = DefaultTimeComponent,
  onTimeSelect,
}) => {
  const [times, setTimes] = React.useState<TimeType[]>([]);
  const [selectedTime, setSelectedTime] = React.useState<TimeType[]>([]);

  React.useEffect(() => {
    typeof onTimeSelect === "function" &&
      typeof selectedTime[0] === "object" &&
      onTimeSelect(selectedTime[0]);
  }, [selectedTime]);

  const initTimes = () => {
    const convertedFromToMinutes =
      timeRange.from.hour * 60 + timeRange.from.minutes;
    const convertedToToMinutes = timeRange.to.hour * 60 + timeRange.to.minutes;
    let currentTrackedTimeInMinutes = convertedFromToMinutes;
    const times: TimeType[] = [];

    while (currentTrackedTimeInMinutes <= convertedToToMinutes) {
      const hour = Math.floor(currentTrackedTimeInMinutes / 60);
      const minutes = currentTrackedTimeInMinutes % 60;
      times.push({ hour, minutes, id: `${hour}:${minutes}` });
      currentTrackedTimeInMinutes += 30;
    }
    setTimes(times);
  };

  React.useEffect(() => {
    initTimes();
  }, [timeRange]);

  return (
    <div className="grid grid-cols-5  gap-2 h-fit w-full">
      {Array.isArray(times)
        ? times.map((time, i) => {
            return PassPropsToFnOrElem<TimeCustomComponentProps>(
              timeComponent,
              {
                onClick: (id) => setSelectedTime((state) => [time]),
                selected: selectedTime.findIndex((t) => t.id === time.id) > -1,
                time,
              }
            );
          })
        : null}
    </div>
  );
};
