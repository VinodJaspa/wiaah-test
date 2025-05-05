import { Meta, StoryFn } from "@storybook/react";
import { PhoneNumberInput, PhoneNumberValue } from "./PhoneNumberInput";
import { storybookBlocksInputTitle } from "utils";
import React from "react";

export default {
  title: "UI / blocks / Inputs /PhoneNumberInput",
  component: PhoneNumberInput,
} as Meta<typeof PhoneNumberInput>;

const template: StoryFn<typeof PhoneNumberInput> = (args) => {
  const [value, setValue] = React.useState<PhoneNumberValue>();
  return <PhoneNumberInput onChange={(e) => setValue(e)} value={value} />;
};

export const Default = {
  render: template,
  args: {},
};
