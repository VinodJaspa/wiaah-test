import { HotelBedsInput } from "./HotelBedsInput";
import { storybookHotelInputTitle } from "utils";
import { Meta, StoryFn } from "@storybook/react";
import React from "react";

export default {
  title: "UI / Features /Hotel /Inputs /HotelBedsInput",
  component: HotelBedsInput,
} as Meta<typeof HotelBedsInput>;

const template: StoryFn<typeof HotelBedsInput> = (args) => {
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
            JSON.stringify(value) === JSON.stringify(data),
          );
          setValue(data);
        }}
        value={[...value]}
      />
    </>
  );
};

export const Default = {
  render: template,
  args: {},
};
