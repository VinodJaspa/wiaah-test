import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Countdown, storybookBlocksTitle } from "@UI";
export default {
  title: storybookBlocksTitle + "Countdown",
  component: Countdown,
} as ComponentMeta<typeof Countdown>;

const Template: ComponentStory<typeof Countdown> = (args) => (
  <Countdown {...args} />
);

export const Default = Template.bind({});
Default.args = {};

Default.decorators = [
  (Story, { args }) => (
    <section className="flex h-screen w-full flex-col items-center justify-center bg-slate-200">
      <Story args={args} />
    </section>
  ),
];
