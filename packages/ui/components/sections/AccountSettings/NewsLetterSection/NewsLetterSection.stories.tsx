import { storybookSectionsTitle, NewsLetterSection } from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "NewsLetterSection",
  component: NewsLetterSection,
} as ComponentMeta<typeof NewsLetterSection>;

export const Default = () => <NewsLetterSection />;
