import { Meta } from "@storybook/react";
import { SavedPostsSection } from "./SavedPostsSection";
import { storybookSectionsTitle } from "utils";

export default {
  title: "UI / sections / SavedPostsSection",
  component: SavedPostsSection,
} as Meta<typeof SavedPostsSection>;

export const Default = () => <SavedPostsSection />;
