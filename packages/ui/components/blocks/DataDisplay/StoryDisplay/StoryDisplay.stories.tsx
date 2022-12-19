import React from "react";
import { UserProfileDisplay, storybookStoriesTitle } from "@UI";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: storybookStoriesTitle + "StoryDisplay",
  component: UserProfileDisplay,
} as ComponentMeta<typeof UserProfileDisplay>;

const Templete: ComponentStory<typeof UserProfileDisplay> = (args) => (
  <div className="w-32">
    <UserProfileDisplay {...args} />
  </div>
);

export const unSeen = Templete.bind({});
unSeen.args = {
  storyUserData: {
    name: "Olivia",
    userPhotoSrc: "/shop.jpeg",
  },
  seen: false,
};

export const seen = Templete.bind({});
seen.args = {
  storyUserData: {
    name: "Olivia",
    userPhotoSrc: "/shop.jpeg",
  },
  seen: true,
};
