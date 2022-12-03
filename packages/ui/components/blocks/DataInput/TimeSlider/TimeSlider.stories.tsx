import { mapTimeRange, storybookDataInputBlocksTitle } from "utils";
import { ComponentMeta } from "@storybook/react";
import { TimeSlider } from "ui";
import React from "react";
import { TimeData } from ".";
export default {
  title: storybookDataInputBlocksTitle + "TimeSlider",
  component: TimeSlider,
} as ComponentMeta<typeof TimeSlider>;

const times = [
  "8am",
  "9am",
  "10am",
  "11am",
  "12am",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
  "6pm",
  "7pm",
  "8pm",
];

export const Default = () => {
  const [range, setRange] = React.useState<TimeData>();
  const mappedTimes = mapTimeRange(times);
  return (
    <div className="flex flex-col gap-8 items-center w-full">
      <pre className="text-xl font-bold">{JSON.stringify(range)}</pre>
      <TimeSlider
        initialPos={{
          from: mappedTimes[4].pos,
          to: mappedTimes[7].pos,
        }}
        boundings={{
          from: mappedTimes[2],
          to: mappedTimes[8],
        }}
        timeRange={times}
        onTimeChange={(range) => setRange(range)}
      />
    </div>
  );
};
