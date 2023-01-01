import { storybookSectionsTitle, CanceledOrdersSection } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "CanceledOrdersSection",
  component: CanceledOrdersSection,
} as ComponentMeta<typeof CanceledOrdersSection>;

export const Default = () => <CanceledOrdersSection />;
