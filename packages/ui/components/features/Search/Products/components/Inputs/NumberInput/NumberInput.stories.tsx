import { NumberInput } from "./NumberInput";
import { Meta, StoryFn } from "@storybook/react";
import { storybookSearchInputsTitle } from "utils";
import React from "react";

export default {
  title: "UI / Features /Search /Inputs /NumberInput",
  component: NumberInput,
} as Meta<typeof NumberInput>;

const template: StoryFn<typeof NumberInput> = (args) => {
  const [state, setState] = React.useState<number>(0);
  return <NumberInput value={state} onChange={(v) => setState(v)} />;
};

export const Default = {
  render: template,
  args: {},
};
