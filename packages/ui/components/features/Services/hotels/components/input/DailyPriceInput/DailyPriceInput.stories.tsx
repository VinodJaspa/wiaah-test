import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { storybookHotelInputTitle } from "utils";
import { DailyPriceInput } from "./DailyPriceInput";

export default {
  title: storybookHotelInputTitle + "DailyPriceInput",
  component: DailyPriceInput,
} as ComponentMeta<typeof DailyPriceInput>;

const template: ComponentStory<typeof DailyPriceInput> = (args) => (
  <DailyPriceInput {...args} />
);

export const Default = template.bind({});
Default.args = {};

export const Controlled = () => {
  const [value, setValue] = React.useState<any>();

  return <DailyPriceInput value={value} onChange={(data) => setValue(data)} />;
};
