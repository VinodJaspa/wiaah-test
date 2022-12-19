import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ActionsDisplay } from "@UI";
import ChakraUiDecorator from "@UI/SBDecorators/ChakraUiDecorator";
export default {
  title: "UI/blocks/Data Display/ActionsDisplay",
  component: ActionsDisplay,
  decorators: [ChakraUiDecorator],
} as ComponentMeta<typeof ActionsDisplay>;

const Template: ComponentStory<typeof ActionsDisplay> = ({ h, ...args }) => (
  <div className="h-[30rem] w-[20rem]">
    <ActionsDisplay h={"24rem"} {...args}>
      {[...Array(10)].map((_, i) => (
        <div className="h-96  bg-green-400">test {i}</div>
      ))}
    </ActionsDisplay>
  </div>
);

export const Default = Template.bind({});
Default.args = {};
export const WithGap = Template.bind({});
WithGap.args = {
  gap: 16,
};
