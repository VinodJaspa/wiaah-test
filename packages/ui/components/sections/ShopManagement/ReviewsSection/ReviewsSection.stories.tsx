import { storybookSectionsTitle, ReviewsSection } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "ReviewsSection",
  component: ReviewsSection,
} as ComponentMeta<typeof ReviewsSection>;

export const Default = () => <ReviewsSection />;
