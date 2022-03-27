import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BoxShadow } from "../";
export default {
  title: "UI/partials/BoxShadow",
  component: BoxShadow,
} as ComponentMeta<typeof BoxShadow>;

const Template: ComponentStory<typeof BoxShadow> = (args) => (
  <BoxShadow {...args}>
    <div className="h-48 w-48 "></div>
  </BoxShadow>
);

export const Default = Template.bind({});
Default.args = {};
Default.decorators = [
  (Story, { args }) => (
    <section className="flex h-screen w-full items-center justify-center bg-gray-200">
      <Story args={args}></Story>
    </section>
  ),
];
