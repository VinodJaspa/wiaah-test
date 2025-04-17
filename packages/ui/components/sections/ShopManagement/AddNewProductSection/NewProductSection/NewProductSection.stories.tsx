import { storybookSectionsTitle, AddNewProductSection } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / sections / AddNewProductSection",
  component: AddNewProductSection,
} as Meta<typeof AddNewProductSection>;

export const Default = () => <AddNewProductSection />;
