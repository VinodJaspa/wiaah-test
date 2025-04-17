import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { PostHead } from "@UI";
import { PostCardPlaceHolder } from "../../../../placeholder";
export default {
  title: "UI/blocks/Social/PostHead",
  component: PostHead,
} as Meta<typeof PostHead>;

export const Default = {
  args: {
    creatorName: PostCardPlaceHolder.profileInfo.name,
    createdAt: PostCardPlaceHolder.postInfo.createdAt,
    creatorPhoto: PostCardPlaceHolder.profileInfo.thumbnail,
  },
};

export const newStory = {
  args: {
    newStory: true,
    creatorName: PostCardPlaceHolder.profileInfo.name,
    createdAt: PostCardPlaceHolder.postInfo.createdAt,
    creatorPhoto: PostCardPlaceHolder.profileInfo.thumbnail,
  },
};
