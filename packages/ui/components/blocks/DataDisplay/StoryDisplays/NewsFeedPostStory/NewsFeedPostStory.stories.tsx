import { storybookStoriesTitle, NewsFeedPostStory } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookStoriesTitle + "NewsFeedPostStory",
  component: NewsFeedPostStory,
} as ComponentMeta<typeof NewsFeedPostStory>;

export const Default = () => <NewsFeedPostStory postId="12" storyId="33" />;
