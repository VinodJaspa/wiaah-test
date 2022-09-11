import { ComponentMeta, ComponentStory } from "@storybook/react";
import { PhoneNumberInput, PhoneNumberValue } from "./PhoneNumberInput";
import { storybookBlocksInputTitle } from "utils";
import React from "react";

export default {
  title: storybookBlocksInputTitle + "PhoneNumberInput",
  component: PhoneNumberInput,
} as ComponentMeta<typeof PhoneNumberInput>;

const template: ComponentStory<typeof PhoneNumberInput> = (args) => {
  const [value, setValue] = React.useState<PhoneNumberValue>();
  return <PhoneNumberInput onChange={(e) => setValue(e)} value={value} />;
};

export const Default = template.bind({});
Default.args = {};
