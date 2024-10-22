import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Input } from "../";
export default {
  title: "UI/partials/Input",
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;
export const Default = Template.bind({});
Default.args = {};
Default.decorators = [
  (Story, { args }) => (
    <section className="flex h-screen w-full items-center justify-center bg-gray-200">
      <Story args={args}></Story>
    </section>
  ),
];
export const WithError = Template.bind({});
WithError.args = {
  message: {
    error: true,
    msg: "invalid input, try again",
  },
};
WithError.decorators = [
  (Story, { args }) => (
    <section className="flex h-screen w-full items-center justify-center bg-gray-200">
      <Story args={args}></Story>
    </section>
  ),
];
export const LongError = Template.bind({});
LongError.args = {
  explictWidth: {
    value: 20,
  },
  message: {
    error: true,
    msg: "invalid input, try again invalid input, try again invalid input, try again",
  },
};
LongError.decorators = [
  (Story, { args }) => (
    <section className="flex h-screen w-full items-center justify-center bg-gray-200">
      <Story args={args}></Story>
    </section>
  ),
];
export const WithSuccessMsg = Template.bind({});
WithSuccessMsg.args = {
  message: {
    error: false,
    msg: "successfully added voucher code",
  },
};
WithSuccessMsg.decorators = [
  (Story, { args }) => (
    <section className="flex h-screen w-full items-center justify-center bg-gray-200">
      <Story args={args}></Story>
    </section>
  ),
];
