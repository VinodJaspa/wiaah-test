import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CookiesInfoBanner } from "../CookiesInfoBanner";
export default {
  title: "UI/blocks/CookiesInfoBanner",
  component: CookiesInfoBanner,
} as ComponentMeta<typeof CookiesInfoBanner>;

const Template: ComponentStory<typeof CookiesInfoBanner> = (args) => (
  <CookiesInfoBanner {...args} />
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
