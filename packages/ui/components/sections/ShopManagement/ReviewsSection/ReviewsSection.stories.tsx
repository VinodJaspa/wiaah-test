import { storybookSectionsTitle, ReviewsSection } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / sections / ReviewsSection",
  component: ReviewsSection,
} as Meta<typeof ReviewsSection>;

export const Default = () => <ReviewsSection />;
