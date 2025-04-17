import { storybookStoriesTitle, ActionPostStory } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / blocks / stories /ActionPostStory",
  component: ActionPostStory,
} as Meta<typeof ActionPostStory>;

export const Default = () => <ActionPostStory postId="12" />;
