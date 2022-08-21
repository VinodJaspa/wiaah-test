import React from "react";
import { useTranslation } from "react-i18next";
import {
  SectionHeader,
  HStack,
  Switch,
  SectionWrapper,
  TimeSliderController,
} from "ui";
import { hoursAday, weekDays } from "utils";

export const WeekdaysSchedule = () => {
  const { t } = useTranslation();
  const [activeBorders, setActiveBorders] = React.useState<number[]>([]);
  return (
    <div className="w-full">
      <p className="text-lg font-semibold text-primary-500 px-4 py-2 bg-primary-50">
        {t(
          "configure_your_time",
          "Configure your week settings here, must move the sliders and add/remove breaktimes to set up working hours."
        )}
      </p>
      <div className="overflow-x-scroll thinScroll w-full">
        <div
          style={{ width: `${hoursAday.length * 7}rem` }}
          className="relative py-4 flex flex-col "
        >
          <div className="flex items-center border-b-[1px] border-gray-500 py-4 whitespace-nowrap">
            {/* <>
              <span
                style={{
                  left: `${0 * (100 / hoursAday.length)}%`,
                }}
                className="border-r-[1px] top-0 border-gray-500 absolute h-full"
              ></span>
              <span className="relative w-24 text-center"></span>
            </> */}
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
                  className="flex items-center gap-8 w-full border-b-[1px] border-gray-500 py-8 px-2"
                  key={i}
                >
                  <HStack className="">
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
                        console.log("same", same);
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
