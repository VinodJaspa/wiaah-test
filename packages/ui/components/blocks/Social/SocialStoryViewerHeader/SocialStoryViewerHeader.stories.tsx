import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { SocialStoryViewerHeader } from "@UI";
import { PostCardPlaceHolder } from "../../../../placeholder";
import { Box } from "@chakra-ui/react";
export default {
  title: "UI/blocks/Social/SocialStoryViewerHeader",
  component: SocialStoryViewerHeader,
} as Meta<typeof SocialStoryViewerHeader>;

const Template: StoryFn<typeof SocialStoryViewerHeader> = (args) => (
  <Box w="20rem">
    <SocialStoryViewerHeader {...args} />
  </Box>
);

export const Default = {
  render: Template,

  args: {
    user: PostCardPlaceHolder.profileInfo,
    createdAt: new Date(Date.UTC(2022, 3, 2)).toISOString(),
    views: 223,
  },
};

export const WithNewStory = {
  render: Template,

  args: {
    user: PostCardPlaceHolder.profileInfo,
    createdAt: new Date(Date.UTC(2022, 3, 2)).toISOString(),
    views: 223,
    newStory: true,
  },
};

export const WithHighViews = {
  render: Template,

  args: {
    user: PostCardPlaceHolder.profileInfo,
    createdAt: new Date(Date.UTC(2022, 3, 2)).toISOString(),
    views: 22300,
    newStory: true,
  },
};
