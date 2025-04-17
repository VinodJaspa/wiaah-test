import { BreadCrumb } from "../BreadCrumb";
import React from "react";
import { StoryFn, Meta } from "@storybook/react";

export default {
  title: "UI/BLOCKS/BreadCrumb",
  component: BreadCrumb,
} as Meta<typeof BreadCrumb>;

export const Exemple = {
  args: {
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
  },
};
