import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CalanderPage } from "../";

export default {
  title: "UI/blocks/CalanderPage",
  component: CalanderPage,
} as ComponentMeta<typeof CalanderPage>;

const Template: ComponentStory<typeof CalanderPage> = (args) => (
  <CalanderPage {...args} />
);

export const Default = Template.bind({});
Default.args = {
  date: Date.now(),
};
Default.decorators = [
  (Story, { args }) => {
    return (
      <section className="flex h-screen w-full items-center justify-center bg-white">
        <Story {...args} />
      </section>
    );
  },
];
