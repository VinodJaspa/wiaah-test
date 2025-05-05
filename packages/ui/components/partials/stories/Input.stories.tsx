import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { Input } from "../";
export default {
  title: "UI/partials/Input2",
  component: Input,
} as Meta<typeof Input>;

export const Default = {
  args: {},

  decorators: [
    (Story, { args }) => (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <Story args={args}></Story>
      </section>
    ),
  ],
};

export const WithError = {
  args: {
    message: {
      error: true,
      msg: "invalid input, try again",
    },
  },

  decorators: [
    (Story, { args }) => (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <Story args={args}></Story>
      </section>
    ),
  ],
};

export const LongError = {
  args: {
    explictWidth: {
      value: 20,
    },
    message: {
      error: true,
      msg: "invalid input, try again invalid input, try again invalid input, try again",
    },
  },

  decorators: [
    (Story, { args }) => (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <Story args={args}></Story>
      </section>
    ),
  ],
};

export const WithSuccessMsg = {
  args: {
    message: {
      error: false,
      msg: "successfully added voucher code",
    },
  },

  decorators: [
    (Story, { args }) => (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <Story args={args}></Story>
      </section>
    ),
  ],
};
