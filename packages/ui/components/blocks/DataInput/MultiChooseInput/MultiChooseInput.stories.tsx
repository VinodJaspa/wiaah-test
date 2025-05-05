import { MultiChooseInput } from "./MultiChooseInput";
import { storybookDataInputBlocksTitle } from "utils";
import { Meta, StoryFn } from "@storybook/react";
import React from "react";

export default {
  title: "UI / blocks / Data Input /MultiChooseInput",
  component: MultiChooseInput,
} as Meta<typeof MultiChooseInput>;

const template: StoryFn<typeof MultiChooseInput> = (args) => {
  const [selected, setSelected] = React.useState<string[]>([]);
  return (
    <MultiChooseInput
      suggestions={["tes", "test"]}
      onChange={(data) => setSelected(data)}
    />
  );
};

export const Default = {
  render: template,
  args: {},
};
