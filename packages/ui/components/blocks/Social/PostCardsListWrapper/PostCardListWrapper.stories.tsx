import { Meta, StoryFn } from "@storybook/react";
import { newsfeedPosts } from "@UI";
import { storybookListWrappersTitle } from "utils";
import { PostCardsListWrapper } from "./index";

const meta: Meta<typeof PostCardsListWrapper> = {
  title: "UI / Blocks /ListWrappers /PostCardListWrapper",
  component: PostCardsListWrapper,
};

export default meta;

export const Default = () => (
  <PostCardsListWrapper
    posts={[...Array(9)].reduce((acc) => {
      return [...acc, ...newsfeedPosts.slice(0, 8)];
    }, [])}
  />
);
