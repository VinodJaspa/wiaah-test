import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Text } from "../";
export default {
  title: "UI/partials/Text",
  component: Text,
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => (
  <Text {...args}>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium nisi
    eum mollitia explicabo neque similique, quod repellendus facilis hic
    voluptatibus beatae recusandae saepe distinctio eveniet. Ea illo quis ut
    laboriosam alias incidunt, velit corporis sed rem nemo exercitationem fugiat
    error!
  </Text>
);

export const Default = Template.bind({});
Default.args = {};
Default.decorators = [
  (Story, { args }) => (
    <section className="flex h-screen w-full items-center justify-center bg-gray-200">
      <div className="w-1/2">
        <Story args={args} />
      </div>
    </section>
  ),
];
export const MaxLines = Template.bind({});
MaxLines.args = {
  maxLines: 3,
};
MaxLines.decorators = [
  (Story, { args }) => (
    <section className="flex h-screen w-full items-center justify-center bg-gray-200">
      <div className="w-1/2">
        <Story args={args} />
      </div>
    </section>
  ),
];
export const SmallTextSize = Template.bind({});
SmallTextSize.args = {
  size: "sm",
};
SmallTextSize.decorators = [
  (Story, { args }) => (
    <section className="flex h-screen w-full items-center justify-center bg-gray-200">
      <div className="w-1/2">
        <Story args={args} />
      </div>
    </section>
  ),
];
export const MediumTextSize = Template.bind({});
MediumTextSize.args = {
  size: "md",
};
MediumTextSize.decorators = [
  (Story, { args }) => (
    <section className="flex h-screen w-full items-center justify-center bg-gray-200">
      <div className="w-1/2">
        <Story args={args} />
      </div>
    </section>
  ),
];
export const LargeTextSize = Template.bind({});
LargeTextSize.args = {
  size: "lg",
};
LargeTextSize.decorators = [
  (Story, { args }) => (
    <section className="flex h-screen w-full items-center justify-center bg-gray-200">
      <div className="w-1/2">
        <Story args={args} />
      </div>
    </section>
  ),
];
export const ExtraLargeTextSize = Template.bind({});
ExtraLargeTextSize.args = {
  size: "xl",
};
ExtraLargeTextSize.decorators = [
  (Story, { args }) => (
    <section className="flex h-screen w-full items-center justify-center bg-gray-200">
      <div className="w-1/2">
        <Story args={args} />
      </div>
    </section>
  ),
];
export const CustomTextSize = Template.bind({});
CustomTextSize.args = {
  customSize: {
    value: 5,
  },
};
CustomTextSize.decorators = [
  (Story, { args }) => (
    <section className="flex h-screen w-full items-center justify-center bg-gray-200">
      <div className="w-1/2">
        <Story args={args} />
      </div>
    </section>
  ),
];
