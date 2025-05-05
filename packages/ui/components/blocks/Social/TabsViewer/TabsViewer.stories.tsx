import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { TabsViewer } from "@UI";
export default {
  title: "UI/blocks/Social/TabsViewer",
  component: TabsViewer,
} as Meta<typeof TabsViewer>;

export const Default = {
  args: {
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
  },
};
