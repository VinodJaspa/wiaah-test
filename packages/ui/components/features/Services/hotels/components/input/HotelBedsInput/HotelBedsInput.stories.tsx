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
  console.log("should update", value);

  return (
    <>
      <p>{JSON.stringify(value)}</p>
      <HotelBedsInput
        onChange={(data) => {
          console.log(
            "did change",
            data,
            value,
            JSON.stringify(value) === JSON.stringify(data)
          );
          setValue(data);
        }}
        value={[...value]}
      />
    </>
  );
};

export const Default = template.bind({});
Default.args = {};
