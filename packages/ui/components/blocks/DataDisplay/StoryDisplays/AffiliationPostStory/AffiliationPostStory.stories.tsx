import { storybookStoriesTitle, AffiliationPostStory } from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookStoriesTitle + "AffiliationPostStory",
  component: AffiliationPostStory,
} as ComponentMeta<typeof AffiliationPostStory>;

export const Default = () => <AffiliationPostStory postId="12" />;
