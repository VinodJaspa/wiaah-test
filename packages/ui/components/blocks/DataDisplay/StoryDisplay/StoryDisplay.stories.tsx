import React from "react";
import { UserProfileDisplay, storybookStoriesTitle } from "@UI";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "UI / blocks / stories /StoryDisplay",
  component: UserProfileDisplay,
} as Meta<typeof UserProfileDisplay>;

const Templete: StoryFn<typeof UserProfileDisplay> = (args) => (
  <div className="w-32">
    <UserProfileDisplay {...args} />
  </div>
);

export const unSeen = {
  render: Templete,

  args: {
    storyUserData: {
      name: "Olivia",
      userPhotoSrc: "/shop.jpeg",
    },
    seen: false,
  },
};

export const seen = {
  render: Templete,

  args: {
    storyUserData: {
      name: "Olivia",
      userPhotoSrc: "/shop.jpeg",
    },
    seen: true,
  },
};
