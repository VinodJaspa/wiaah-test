import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { PaymentGateway } from "../";

export default {
  title: "UI/blocks/PaymentGateway",
  component: PaymentGateway,
} as Meta<typeof PaymentGateway>;

export const Default = {
  args: {},

  decorators: [
    (Story, { args }) => {
      return (
        <section className="flex h-screen w-full items-center justify-center bg-white">
          <Story {...args} />
        </section>
      );
    },
  ],
};
