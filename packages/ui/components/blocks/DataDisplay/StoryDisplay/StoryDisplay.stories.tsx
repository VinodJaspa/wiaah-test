import React from "react";
import { StoryDisplay, storybookStoriesTitle } from "ui";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: storybookStoriesTitle + "StoryDisplay",
  component: StoryDisplay,
} as ComponentMeta<typeof StoryDisplay>;

const Templete: ComponentStory<typeof StoryDisplay> = (args) => (
  <div className="w-32">
    <StoryDisplay {...args} />
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
