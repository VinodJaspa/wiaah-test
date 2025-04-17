import { Meta, StoryFn } from "@storybook/react";
import { BookDetailsSection } from "./BookDetails";
import { storybookSectionsTitle } from "utils";

export default {
  title: "UI / sections / BookDetails",
  component: BookDetailsSection,
} as Meta<typeof BookDetailsSection>;

export const Default = {
  args: {
    bookId: "123",
  },
};
