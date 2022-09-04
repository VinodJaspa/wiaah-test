import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ServiceExtrasInputList } from "./ServiceExtrasInputList";
import { storybookOtherServicesInputTitle } from "utils";
import React from "react";

export default {
  title: storybookOtherServicesInputTitle + "ServiceExtrasInputList",
  component: ServiceExtrasInputList,
} as ComponentMeta<typeof ServiceExtrasInputList>;

const template: ComponentStory<typeof ServiceExtrasInputList> = (args) => {
  const [state, setState] = React.useState<any[]>([]);

  return (
    <ServiceExtrasInputList
      {...args}
      value={state}
      onChange={(e) => setState(e)}
    />
  );
};

export const Default = template.bind({});
Default.args = {};
