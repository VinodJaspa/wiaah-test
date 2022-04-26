import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { RecentStories } from "ui";
import ChakraUiDecorator from "ui/SBDecorators/ChakraUiDecorator";
export default {
  title: "UI/blocks/Data Display/RecentStories",
  component: RecentStories,
  decorators: [ChakraUiDecorator],
} as ComponentMeta<typeof RecentStories>;

const Template: ComponentStory<typeof RecentStories> = (args) => (
  <RecentStories {...args} />
);

export const Default = Template.bind({});
Default.args = {
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
};
