import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { RecentStories, storybookDataDisplayBlocksTitle } from "@UI";
export default {
  title: "UI / blocks / Data Display /RecentStories",
  component: RecentStories,
} as Meta<typeof RecentStories>;

export const Default = {
  args: {
    stories: [
      {
        storyUserData: {
          name: "Wiaah",
          userPhotoSrc: "/shop-3.jpeg",
        },
        seen: true,
      },
      {
        storyUserData: {
          name: "Jack",
          userPhotoSrc: "/shop.jpeg",
        },
        seen: false,
      },
      {
        storyUserData: {
          name: "sam",
          userPhotoSrc: "/shop-2.jpeg",
        },
        seen: true,
      },
      {
        storyUserData: {
          name: "Wiaah",
          userPhotoSrc: "/shop-3.jpeg",
        },
        seen: true,
      },
      {
        storyUserData: {
          name: "Jack",
          userPhotoSrc: "/shop.jpeg",
        },
        seen: false,
      },
    ],
  },
};
