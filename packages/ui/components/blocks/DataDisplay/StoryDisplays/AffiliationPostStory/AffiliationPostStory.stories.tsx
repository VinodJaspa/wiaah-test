import { storybookStoriesTitle, AffiliationPostStory } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / blocks / stories /AffiliationPostStory",
  component: AffiliationPostStory,
} as Meta<typeof AffiliationPostStory>;

export const Default = () => <AffiliationPostStory postId="12" />;
