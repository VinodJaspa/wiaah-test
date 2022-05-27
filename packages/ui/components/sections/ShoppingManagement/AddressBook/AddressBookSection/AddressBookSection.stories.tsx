import { storybookSectionsTitle, AddressBookSection } from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "AddressBookSection",
  component: AddressBookSection,
} as ComponentMeta<typeof AddressBookSection>;

export const Default = () => <AddressBookSection />;
