import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Absolute } from "../";
export default {
  title: "UI/partials/Absolute",
  component: Absolute,
} as ComponentMeta<typeof Absolute>;

const Template: ComponentStory<typeof Absolute> = (args) => (
  <Absolute {...args}>
    <div className="h-8 w-8 bg-blue-400"></div>
  </Absolute>
);

export const Default = Template.bind({});
Default.args = {};
Default.decorators = [
  (Story, { args }) => (
    <section className="flex h-screen w-full items-center justify-center bg-gray-200">
      <div className="relative h-full w-full">
        <Story args={args} />
      </div>
    </section>
  ),
];
export const verticallyCentered = Template.bind({});
verticallyCentered.args = {
  verticalCenter: true,
};
verticallyCentered.decorators = [
  (Story, { args }) => (
    <section className="flex h-screen w-full items-center justify-center bg-gray-200">
      <div className="relative h-full w-full">
        <Story args={args} />
      </div>
    </section>
  ),
];

export const HorizontallyCentered = Template.bind({});
HorizontallyCentered.args = {
  horizontalCenter: true,
};
HorizontallyCentered.decorators = [
  (Story, { args }) => (
    <section className="flex h-screen w-full items-center justify-center bg-gray-200">
      <div className="relative h-full w-full">
        <Story args={args} />
      </div>
    </section>
  ),
];

export const ExplictPosition = Template.bind({});
ExplictPosition.args = {
  position: {
    top: {
      value: 15,
    },
    left: {
      value: 5,
    },
  },
};
ExplictPosition.decorators = [
  (Story, { args }) => (
    <section className="flex h-screen w-full items-center justify-center bg-gray-200">
      <div className="relative h-full w-full">
        <Story args={args} />
      </div>
    </section>
  ),
];
