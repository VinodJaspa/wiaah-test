import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SocialAuthFooter } from "@UI";
export default {
  title: "UI/blocks/Social/SocialAuthFooter",
  component: SocialAuthFooter,
} as ComponentMeta<typeof SocialAuthFooter>;

const Template: ComponentStory<typeof SocialAuthFooter> = (args) => (
  <SocialAuthFooter {...args} />
);

export const Default = Template.bind({});
Default.args = {};
Default.decorators = [
  (Story, { args }) => {
    return (
      <section className="flex min-h-screen w-full items-center justify-center bg-slate-200">
        <Story {...args} />
      </section>
    );
  },
];
