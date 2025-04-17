import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { CookiesInfoBanner, storybookBlocksTitle } from "@UI";
export default {
  title: "UI / blocks / CookiesInfoBanner",
  component: CookiesInfoBanner,
} as Meta<typeof CookiesInfoBanner>;

export const Default = {
  args: {},

  decorators: [
    (Story, { args }) => (
      <section className="flex h-screen w-full flex-col items-center justify-center bg-slate-200">
        <Story args={args} />
      </section>
    ),
  ],
};
