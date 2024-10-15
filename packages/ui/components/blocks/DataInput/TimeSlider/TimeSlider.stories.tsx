import { mapTimeRange, storybookDataInputBlocksTitle } from "utils";
import { ComponentMeta } from "@storybook/react";
import { TimeSlider } from "@UI";
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
  const [range, setRange] = React.useState<[Date, Date]>([
    new Date(),
    new Date(Date.now() + 3600000),
  ]); // 1 hour range
  const mappedTimes = mapTimeRange(times);
  return (
    <div className="flex flex-col gap-8 items-center w-full">
      <pre className="text-xl font-bold">{JSON.stringify(range)}</pre>
      <TimeSlider
        value={range}
        onChange={(time) => setRange(time)}
        onRemove={() => console.log("Removed")}
        onSplit={(timeRange) => console.log("Split:", timeRange)}
        onActive={(borders) => console.log("Active:", borders)}
      />
    </div>
  );
};
