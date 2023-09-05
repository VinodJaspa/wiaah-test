import { ComponentMeta } from "@storybook/react";
import { SavedPostsSection } from "./SavedPostsSection";
import { storybookSectionsTitle } from "utils";

export default {
  title: storybookSectionsTitle + "SavedPostsSection",
  component: SavedPostsSection,
} as ComponentMeta<typeof SavedPostsSection>;

// jest.mock("@UI", () => ({ ...jest.requireActual("@UI") }));

export const Default = () => <SavedPostsSection />;
