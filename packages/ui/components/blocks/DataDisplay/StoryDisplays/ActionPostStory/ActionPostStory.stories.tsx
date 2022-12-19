import { storybookStoriesTitle, ActionPostStory } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookStoriesTitle + "ActionPostStory",
  component: ActionPostStory,
} as ComponentMeta<typeof ActionPostStory>;

export const Default = () => <ActionPostStory postId="12" />;
