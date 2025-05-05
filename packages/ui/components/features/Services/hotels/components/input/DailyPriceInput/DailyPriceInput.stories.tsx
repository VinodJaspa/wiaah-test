import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { storybookHotelInputTitle } from "utils";
import { DailyPriceInput } from "./DailyPriceInput";

export default {
  title: "UI / Features /Hotel /Inputs /DailyPriceInput",
  component: DailyPriceInput,
} as Meta<typeof DailyPriceInput>;

export const Default = {
  args: {},
};

export const Controlled = () => {
  const [value, setValue] = React.useState<any>();

  return <DailyPriceInput value={value} onChange={(data) => setValue(data)} />;
};
