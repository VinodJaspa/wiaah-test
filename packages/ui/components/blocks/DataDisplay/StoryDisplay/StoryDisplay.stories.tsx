import React from "react";
import { StoryDisplay } from ".";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import ChakraUiDecorator from "ui/SBDecorators/ChakraUiDecorator";

export default {
  title: "UI/blocks/Data Display/StoryDisplay",
  component: StoryDisplay,
  decorators: [ChakraUiDecorator],
} as ComponentMeta<typeof StoryDisplay>;

const Templete: ComponentStory<typeof StoryDisplay> = (args) => (
  <StoryDisplay {...args} />
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
