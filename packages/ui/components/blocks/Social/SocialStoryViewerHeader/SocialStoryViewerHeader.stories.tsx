import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SocialStoryViewerHeader } from "@UI";
import { PostCardPlaceHolder } from "../../../../placeholder";
import { Box } from "@chakra-ui/react";
export default {
  title: "UI/blocks/Social/SocialStoryViewerHeader",
  component: SocialStoryViewerHeader,
} as ComponentMeta<typeof SocialStoryViewerHeader>;

const Template: ComponentStory<typeof SocialStoryViewerHeader> = (args) => (
  <Box w="20rem">
    <SocialStoryViewerHeader {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  user: PostCardPlaceHolder.profileInfo,
  createdAt: new Date(Date.UTC(2022, 3, 2)).toISOString(),
  views: 223,
};

export const WithNewStory = Template.bind({});
WithNewStory.args = {
  user: PostCardPlaceHolder.profileInfo,
  createdAt: new Date(Date.UTC(2022, 3, 2)).toISOString(),
  views: 223,
  newStory: true,
};

export const WithHighViews = Template.bind({});
WithHighViews.args = {
  user: PostCardPlaceHolder.profileInfo,
  createdAt: new Date(Date.UTC(2022, 3, 2)).toISOString(),
  views: 22300,
  newStory: true,
};
