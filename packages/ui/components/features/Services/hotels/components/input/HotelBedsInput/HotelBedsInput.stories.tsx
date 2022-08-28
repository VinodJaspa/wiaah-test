import { HotelBedsInput } from "./HotelBedsInput";
import { storybookHotelInputTitle } from "utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

export default {
  title: storybookHotelInputTitle + "HotelBedsInput",
  component: HotelBedsInput,
} as ComponentMeta<typeof HotelBedsInput>;

const template: ComponentStory<typeof HotelBedsInput> = (args) => {
  const [value, setValue] = React.useState([
    {
      amount: 1,
      name: "Double",
      required: true,
    },
    {
      amount: 0,
      name: "Queen",
      required: true,
    },
    {
      amount: 2,
      name: "Single",
      required: true,
    },
    {
      amount: 0,
      name: "Sofa bed",
      required: true,
    },
  ]);
  return (
    <HotelBedsInput
      onChange={(data) => {
        setValue(data);
      }}
      value={value}
    />
  );
};

export const Default = template.bind({});
Default.args = {};
