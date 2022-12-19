import { storybookSectionsTitle, AddNewProductSection } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "AddNewProductSection",
  component: AddNewProductSection,
} as ComponentMeta<typeof AddNewProductSection>;

export const Default = () => <AddNewProductSection />;
