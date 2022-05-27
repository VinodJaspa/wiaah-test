import { storybookSectionsTitle, ReviewsSection } from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "ReviewsSection",
  component: ReviewsSection,
} as ComponentMeta<typeof ReviewsSection>;

export const Default = () => <ReviewsSection />;
