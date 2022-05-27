import { storybookStoriesTitle, ActionPostStory } from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookStoriesTitle + "ActionPostStory",
  component: ActionPostStory,
} as ComponentMeta<typeof ActionPostStory>;

export const Default = () => <ActionPostStory postId="12" />;
