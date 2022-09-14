import { NumberInput } from "./NumberInput";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookSearchInputsTitle } from "utils";
import React from "react";

export default {
  title: storybookSearchInputsTitle + "NumberInput",
  component: NumberInput,
} as ComponentMeta<typeof NumberInput>;

const template: ComponentStory<typeof NumberInput> = (args) => {
  const [state, setState] = React.useState<number>(0);
  return <NumberInput value={state} onChange={(v) => setState(v)} />;
};

export const Default = template.bind({});
Default.args = {};
