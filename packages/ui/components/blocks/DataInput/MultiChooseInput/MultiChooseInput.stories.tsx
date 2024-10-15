import { MultiChooseInput } from "./MultiChooseInput";
import { storybookDataInputBlocksTitle } from "utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

export default {
  title: storybookDataInputBlocksTitle + "MultiChooseInput",
  component: MultiChooseInput,
} as ComponentMeta<typeof MultiChooseInput>;

const template: ComponentStory<typeof MultiChooseInput> = (args) => {
  const [selected, setSelected] = React.useState<string[]>([]);
  return (
    <MultiChooseInput
      suggestions={["tes", "test"]}
      onChange={(data) => setSelected(data)}
    />
  );
};

export const Default = template.bind({});
Default.args = {};
