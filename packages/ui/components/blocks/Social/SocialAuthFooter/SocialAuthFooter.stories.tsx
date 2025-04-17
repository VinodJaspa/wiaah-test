import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { SocialAuthFooter } from "@UI";
export default {
  title: "UI/blocks/Social/SocialAuthFooter",
  component: SocialAuthFooter,
} as Meta<typeof SocialAuthFooter>;

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
