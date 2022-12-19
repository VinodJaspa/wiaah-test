import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TabsViewer } from "@UI";
import ChakraUiDecorator from "@UI/SBDecorators/ChakraUiDecorator";
export default {
  title: "UI/blocks/Social/TabsViewer",
  component: TabsViewer,
  decorators: [ChakraUiDecorator],
} as ComponentMeta<typeof TabsViewer>;

const Template: ComponentStory<typeof TabsViewer> = (args) => (
  <TabsViewer {...args} />
);

export const Default = Template.bind({});
Default.args = {
  tabs: [
    {
      name: "tab one",
      component: <div className="bg-purple-600 p-8">Tab one!</div>,
    },
    {
      name: "tab two",
      component: <div className="bg-purple-600 p-8">Tab two!</div>,
    },
    {
      name: "tab three",
      component: <div className="bg-purple-600 p-8">Tab three!</div>,
    },
  ],
};
