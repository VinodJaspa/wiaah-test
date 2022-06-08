import React from "react";
import { useTranslation } from "react-i18next";
import { IoConstructOutline } from "react-icons/io5";
import { SectionHeader, TimeSlider, HStack, Switch } from "ui";
import {
  hoursAday,
  TimeMappedType,
  weekDays,
  getClosest,
  mapTimeRange,
} from "utils";
import { Boundings, TimeData } from "../../../blocks";
import { TableContainer } from "../../../partials";

export interface TimeManagementSectionProps {}

export const TimeManagementSection: React.FC<TimeManagementSectionProps> =
  ({}) => {
    const { t } = useTranslation();
    return (
      <SectionWrapper>
        <SectionHeader
          sectionTitle={t("opening_time_management", "Open Time Management")}
        />
        <div>
          <p className="text-lg font-semibold text-primary-500 px-4 py-2 bg-primary-50">
            {t(
              "configure_your_time",
              "Configure your week settings here, must move the sliders and add/remove breaktimes to set up working hours."
            )}
          </p>
          {/* <div className="overflow-x-scroll"> */}
          <div className="w-full py-4 flex flex-col gap-4">
            <div className="flex gap-8 pl-20 items-center whitespace-nowrap">
              {hoursAday.map((hour, i) => (
                <span key={i}>{hour}</span>
              ))}
            </div>
            <div className="flex flex-col w-full gap-16 left-0 mt-20">
              {weekDays.map((day, i) => {
                const [show, setShow] = React.useState<boolean>(false);
                return (
                  <div className="flex items-center gap-8 w-full" key={i}>
                    <HStack className="">
                      <Switch
                        checked={show}
                        onChange={(checked) => setShow(checked)}
                      />
                      <p className="w-12">{day}</p>
                    </HStack>
                    {show && (
                      <TimeSliderController
                        openRanges={[
                          {
                            from: hoursAday[4],
                            to: hoursAday[12],
                          },
                          {
                            from: hoursAday[13],
                            to: hoursAday[18],
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
        {/* </div> */}
      </SectionWrapper>
    );
  };

interface TimeSliderControllerProps {
  timeRange: string[];
  onTimeChange: (timeRanges: string[][]) => any;
  openRanges: TimeData[];
}

export const TimeSliderController: React.FC<TimeSliderControllerProps> = ({
  timeRange = [],
  onTimeChange,
  openRanges,
}) => {
  const [ranges, setRanges] = React.useState<Boundings[]>([]);
  const [mappedTime, setMappedTime] = React.useState<TimeMappedType[]>([]);
  const [slidersCurrentBoundings, setSlidersCurrentBoundings] = React.useState<
    Boundings[]
  >([]);

  React.useEffect(() => {
    let boundings: Boundings[] = [];

    openRanges.map((range, i) => {
      const fromRangeIdx = timeRange.findIndex((time) => time === range.from);
      const toRangeIdx = timeRange.findIndex((time) => time === range.to);

      boundings.push({
        from: mappedTime[fromRangeIdx],
        to: mappedTime[toRangeIdx],
      });
    });
    setRanges(boundings);
  }, [openRanges, mappedTime]);

  const rangesLength = timeRange.length / ranges.length;
  React.useEffect(() => {
    mapTimeRange(timeRange, undefined, (res) => setMappedTime(res));
  }, [timeRange]);
  return (
    <div className="w-full relative">
      {ranges.map((range, i) => {
        const initialFrom = range?.from?.pos;
        const initialTo = range?.to?.pos;
        const boundingsFrom = slidersCurrentBoundings[i - 1]
          ? slidersCurrentBoundings[i - 1].to
          : mappedTime[i * rangesLength];
        const boundingsTo = slidersCurrentBoundings[i + 1]
          ? slidersCurrentBoundings[i + 1].from
          : mappedTime[(i + 1) * rangesLength - 1];

        console.log("bounding", boundingsFrom, boundingsTo);

        return (
          <div
            key={i}
            className="absolute pointer-events-none top-0 left-0 w-full -translate-y-1/2"
          >
            <TimeSlider
              onTimeChange={(Time) => {
                const fromRangeIdx = timeRange.findIndex(
                  (time) => time === Time.from
                );
                const toRangeIdx = timeRange.findIndex(
                  (time) => time === Time.to
                );
                setSlidersCurrentBoundings((state) => {
                  const _state = state;
                  _state[i] = {
                    from: mappedTime[fromRangeIdx],
                    to: mappedTime[toRangeIdx],
                  };
                  console.log("test", _state);
                  return _state;
                });
              }}
              timeRange={timeRange}
              initialPos={{
                from: initialFrom,
                to: initialTo,
              }}
              boundings={{
                from: boundingsFrom,
                to: boundingsTo,
              }}
              onSplit={(range) => {}}
            />
          </div>
        );
      })}
    </div>
  );
};

export const SectionWrapper: React.FC = (props) => {
  return <div {...props} className="flex flex-col gap-8" />;
};
