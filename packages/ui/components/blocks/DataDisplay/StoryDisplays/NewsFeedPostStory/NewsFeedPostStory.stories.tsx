import { storybookStoriesTitle, NewsFeedPostStory } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / blocks / stories /NewsFeedPostStory",
  component: NewsFeedPostStory,
} as Meta<typeof NewsFeedPostStory>;

export const Default = () => <NewsFeedPostStory postId="12" storyId="33" />;
