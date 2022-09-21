import React from "react";
import { hoursAday, weekDays } from "utils";
import {
  HStack,
  TimeSliderController,
  Switch,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "ui";

export type WeekDayInputData = {
  weekday: number;
  openRanges: [Date, Date][];
};

export interface WeekdaysOpenTimeInputProps {
  onChange: (data: WeekDayInputData[]) => any;
  value: WeekDayInputData[];
}

export const WeekdaysOpenTimeInput: React.FC<WeekdaysOpenTimeInputProps> = ({
  onChange,
  value,
}) => {
  const [activeBorders, setActiveBorders] = React.useState<number[]>([]);
  const scrollingPartRef = React.useRef<HTMLDivElement>(null);

  function handleScrollLeft() {
    if (scrollingPartRef.current) {
      scrollingPartRef.current.scrollTo({
        left:
          scrollingPartRef.current.scrollLeft -
          scrollingPartRef.current.clientWidth / 2,
      });
    }
  }

  function handleScrollRight() {
    if (scrollingPartRef.current) {
      scrollingPartRef.current.scrollTo({
        left:
          scrollingPartRef.current.scrollLeft +
          scrollingPartRef.current.clientWidth / 2,
      });
    }
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="w-full text-4xl text-primary flex justify-between gap-4">
        <ArrowLeftIcon className="cursor-pointer" onClick={handleScrollLeft} />
        <ArrowRightIcon
          className="cursor-pointer"
          onClick={handleScrollRight}
        />
      </div>
      <div
        ref={scrollingPartRef}
        className="overflow-x-scroll thinScroll w-full"
      >
        <div
          draggable={false}
          style={{ width: `${(hoursAday.length - 1) * 7}rem` }}
          className="relative py-4 flex flex-col"
        >
          <div className="flex items-center border-b-[1px] border-gray-500 py-4 whitespace-nowrap">
            {[""].concat(hoursAday).map((hour, i) => (
              <React.Fragment key={i}>
                <span
                  style={{
                    left: `${i * (100 / hoursAday.length)}%`,
                  }}
                  className={`border-r-[1px] top-0 ${
                    activeBorders?.includes(i - 1)
                      ? "border-primary"
                      : "border-gray-500"
                  } absolute h-full`}
                ></span>
                <span
                  style={{
                    left: `${i * (100 / hoursAday.length)}%`,
                  }}
                  className="absolute top-2 w-28 text-center"
                  key={i}
                >
                  {hour}
                </span>
              </React.Fragment>
            ))}
          </div>
          <div className="flex flex-col w-full gap-8 left-0 py-4">
            {weekDays.map((day, i) => {
              const [show, setShow] = React.useState<boolean>(false);
              return (
                <div
                  className="flex items-center w-full border-b border-gray-500 py-8"
                  key={i}
                >
                  <HStack className="w-28 px-2">
                    <Switch
                      checked={show}
                      onChange={(checked) => setShow(checked)}
                    />
                    <p className="w-12">{day}</p>
                  </HStack>
                  {show && (
                    <TimeSliderController
                      onActiveRange={(range) => {
                        const same = activeBorders.every((v, i) => {
                          return activeBorders[i] === range[i];
                        });
                        if (!same) {
                          setActiveBorders(range);
                        }
                      }}
                      openRanges={[
                        {
                          from: hoursAday[2],
                          to: hoursAday[6],
                        },
                        {
                          from: hoursAday[7],
                          to: hoursAday[10],
                        },
                      ]}
                      timeRange={hoursAday}
                      onTimeChange={() => {}}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
