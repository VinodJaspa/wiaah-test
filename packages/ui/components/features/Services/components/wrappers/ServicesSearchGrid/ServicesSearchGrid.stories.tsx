import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookOtherServicesDataDisplayTitle } from "utils";
import { ServicesSearchGrid } from "./ServicesSearchGrid";

export default {
  title: storybookOtherServicesDataDisplayTitle + "ServicesSearchGrid",
  component: ServicesSearchGrid,
} as ComponentMeta<typeof ServicesSearchGrid>;

const template: ComponentStory<typeof ServicesSearchGrid> = (args) => (
  <ServicesSearchGrid {...args} />
);

export const Default = template.bind({});
Default.args = {
  component: (props: any) => <div>{props.test}</div>,
  data: [...Array(16)].map((_, i) => ({ text: `text-${i}` })),
  handlePassData(data: any) {
    return { test: data.text };
  },
};
