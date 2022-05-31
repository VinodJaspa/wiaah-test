import { DateInput } from "ui";
import { storybookDataInputBlocksTitle } from "utils";
import { ComponentMeta } from "@storybook/react";
import React from "react";

export default {
  title: storybookDataInputBlocksTitle + "DateInput",
  component: DateInput,
} as ComponentMeta<typeof DateInput>;

export const Default = () => {
  const [date, setDate] = React.useState<string>("");
  return (
    <div className="flex flex-col gap-8">
      <DateInput onDaySelect={(date) => setDate(date)} />

      <span>date: {date}</span>
    </div>
  );
};
