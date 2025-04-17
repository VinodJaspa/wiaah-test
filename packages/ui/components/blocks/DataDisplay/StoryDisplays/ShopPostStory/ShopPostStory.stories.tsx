import { storybookStoriesTitle, ShopPostStory } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / blocks / stories /ShopPostStory",
  component: ShopPostStory,
} as Meta<typeof ShopPostStory>;

export const Default = () => <ShopPostStory postId="12" />;
