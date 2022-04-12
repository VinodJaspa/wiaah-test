import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SocialProfile } from "./SocialProfile";

export default {
  title: "UI/blocks/Social/Profile",
  component: SocialProfile,
} as ComponentMeta<typeof SocialProfile>;

const Template: ComponentStory<typeof SocialProfile> = (args) => (
  <SocialProfile {...args} />
);

export const Default = Template.bind({});
Default.args = {};
Default.decorators = [
  (Story, { args }) => {
    return (
      <section className="flex h-screen w-full items-center justify-center bg-slate-200">
        <Story {...args} />
      </section>
    );
  },
];
