import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PaymentGateway } from "../";

export default {
  title: "UI/blocks/PaymentGateway",
  component: PaymentGateway,
} as ComponentMeta<typeof PaymentGateway>;

const Template: ComponentStory<typeof PaymentGateway> = (args) => (
  <PaymentGateway {...args} />
);

export const Default = Template.bind({});
Default.args = {};
Default.decorators = [
  (Story, { args }) => {
    return (
      <section className="flex h-screen w-full items-center justify-center bg-white">
        <Story {...args} />
      </section>
    );
  },
];
