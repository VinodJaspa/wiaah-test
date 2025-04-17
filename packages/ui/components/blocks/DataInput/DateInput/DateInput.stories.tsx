import { DateInput } from "@UI";
import { storybookDataInputBlocksTitle } from "utils";
import { Meta } from "@storybook/react";
import React from "react";
import { DateRange } from "@UI/../types/src";

export default {
  title: "UI / blocks / Data Input /DateInput",
  component: DateInput,
} as Meta<typeof DateInput>;

export const Default = () => {
  const [date, setDate] = React.useState<string>("");
  return (
    <div className="flex flex-col gap-8">
      <DateInput onDaySelect={(date) => setDate(date)} />

      <span>date: {date}</span>
    </div>
  );
};

export const RangeVaraint = () => {
  const [date, setDate] = React.useState<DateRange>();
  return (
    <div className="flex flex-col gap-8">
      <DateInput range onRangeSelect={(range) => setDate(range)} />

      <span>
        date:{" "}
        {date ? (
          <div className="flex flex-col gap- 4">
            <p>from: {date.from}</p>
            <p>to: {date.to}</p>
          </div>
        ) : null}
      </span>
    </div>
  );
};
