import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SocialFooter } from "ui";
import ChakraUiDecorator from "ui/SBDecorators/ChakraUiDecorator";
export default {
  title: "UI/blocks/Social/SocialFooter",
  component: SocialFooter,
  decorators: [ChakraUiDecorator],
} as ComponentMeta<typeof SocialFooter>;

const Template: ComponentStory<typeof SocialFooter> = (args) => (
  <SocialFooter {...args} />
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
