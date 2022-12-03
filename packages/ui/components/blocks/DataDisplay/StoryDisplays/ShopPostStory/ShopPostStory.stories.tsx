import { storybookStoriesTitle, ShopPostStory } from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookStoriesTitle + "ShopPostStory",
  component: ShopPostStory,
} as ComponentMeta<typeof ShopPostStory>;

export const Default = () => <ShopPostStory postId="12" />;
