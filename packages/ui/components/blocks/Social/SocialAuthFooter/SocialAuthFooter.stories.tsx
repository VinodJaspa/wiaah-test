import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SocialAuthFooter } from "ui";
import ChakraUiDecorator from "ui/SBDecorators/ChakraUiDecorator";
export default {
  title: "UI/blocks/Social/SocialAuthFooter",
  component: SocialAuthFooter,
  decorators: [ChakraUiDecorator],
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
