import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Clickable } from "../";
export default {
  title: "UI/partials/Clickable",
  component: Clickable,
} as ComponentMeta<typeof Clickable>;

const Template: ComponentStory<typeof Clickable> = (args) => (
  <Clickable {...args}>
    <div className="h-8 w-8 bg-blue-400"></div>
  </Clickable>
);

export const Default = Template.bind({});
Default.args = {};
Default.decorators = [
  (Story, { args }) => (
    <section className="flex h-screen w-full items-center justify-center bg-gray-200">
      <Story args={args} />
    </section>
  ),
];
