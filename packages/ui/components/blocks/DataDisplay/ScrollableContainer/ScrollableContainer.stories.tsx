import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ScrollableContainer } from "ui";
import ChakraUiDecorator from "ui/SBDecorators/ChakraUiDecorator";
export default {
  title: "UI/blocks/Data Display/ScrollableContainer",
  component: ScrollableContainer,
  decorators: [ChakraUiDecorator],
} as ComponentMeta<typeof ScrollableContainer>;

const Template: ComponentStory<typeof ScrollableContainer> = (args) => (
  <ScrollableContainer {...args}>
    {[...Array(20)].map(() => (
      <div className="h-16 w-16 bg-slate-800"></div>
    ))}
  </ScrollableContainer>
);

export const Default = Template.bind({});
Default.args = {};

export const WithMaxInitialItems = Template.bind({});
WithMaxInitialItems.args = {
  maxInitialItems: 5,
};

// export const With = Template.bind({});
// Default.args = {};
