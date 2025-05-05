import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { SocialFooter } from "@UI";
export default {
  title: "UI/blocks/Social/SocialFooter",
  component: SocialFooter,
} as Meta<typeof SocialFooter>;

export const Default = {
  args: {},

  decorators: [
    (Story, { args }) => {
      return (
        <section className="flex min-h-screen w-full items-center justify-center bg-slate-200">
          <Story {...args} />
        </section>
      );
    },
  ],
};
