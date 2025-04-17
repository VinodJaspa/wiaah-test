import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { ActionHeader, storybookDataDisplayBlocksTitle } from "@UI";
export default {
  title: "UI / blocks / Data Display /ActionHeader",
  component: ActionHeader,
} as Meta<typeof ActionHeader>;

export const Default = {
  args: {
    userName: "Wiaah",
    userThumbnail: "/wiaah_logo.png",
    actionTitle: "test video title for test purposes",
  },
};

export const WithLongTitle = {
  args: {
    userName: "Wiaah",
    userThumbnail: "/wiaah_logo.png",
    actionTitle:
      "test video title for test purposes test video title for test purposes test video title for test purposes test video title for test purposes test video title for test purposes ",
  },
};

export const WithHashTags = {
  args: {
    userName: "Wiaah",
    userThumbnail: "/wiaah_logo.png",
    actionTitle: "test video title for test purposes",
    actionHashtags: ["fun", "gaming", "development"],
  },
};
