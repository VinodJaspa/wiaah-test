import { ComponentMeta, ComponentStory } from "@storybook/react";
import { BookDetailsSection } from "./BookDetails";
import { storybookSectionsTitle } from "utils";

export default {
  title: storybookSectionsTitle + "BookDetails",
  component: BookDetailsSection,
} as ComponentMeta<typeof BookDetailsSection>;

const template: ComponentStory<typeof BookDetailsSection> = (args) => (
  <BookDetailsSection {...args} />
);

export const Default = template.bind({});
Default.args = {
  bookId: "123",
};
