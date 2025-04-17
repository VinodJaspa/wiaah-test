import { Meta, StoryFn } from "@storybook/react";
import { ServiceExtrasInputList } from "./ServiceExtrasInputList";
import { storybookOtherServicesInputTitle } from "utils";
import React from "react";

export default {
  title: "UI / Features /Services /Inputs /ServiceExtrasInputList",
  component: ServiceExtrasInputList,
} as Meta<typeof ServiceExtrasInputList>;

const template: StoryFn<typeof ServiceExtrasInputList> = (args) => {
  const [state, setState] = React.useState<any[]>([]);

  return (
    <ServiceExtrasInputList
      {...args}
      value={state}
      onChange={(e) => setState(e)}
    />
  );
};

export const Default = {
  render: template,
  args: {},
};
