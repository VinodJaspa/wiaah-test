import { BreadCrumb } from "../BreadCrumb";
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "UI/BLOCKS/BreadCrumb",
  component: BreadCrumb,
} as ComponentMeta<typeof BreadCrumb>;

const Template: ComponentStory<typeof BreadCrumb> = (args) => (
  <BreadCrumb {...args} />
);

export const Exemple = Template.bind({});

Exemple.args = {
  links: [
    {
      text: "Root",
      url: "root",
    },
    {
      text: "Sub Folder",
      url: "sub-folder",
    },
    {
      text: "Current Page",
      url: "current-page",
    },
  ],
};
