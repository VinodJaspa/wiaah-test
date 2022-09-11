import { ComponentMeta, ComponentStory } from "@storybook/react";
import { newsfeedPosts } from "ui";
import { storybookListWrappersTitle } from "utils";
import { PostCardsListWrapper } from "./index";

export default {
  title: storybookListWrappersTitle + "PostCardListWrapper",
  component: PostCardsListWrapper,
} as ComponentMeta<typeof PostCardsListWrapper>;

export const Default = () => (
  <PostCardsListWrapper
    posts={[...Array(9)].reduce((acc) => {
      return [...acc, ...newsfeedPosts.slice(0, 8)];
    }, [])}
  />
);
