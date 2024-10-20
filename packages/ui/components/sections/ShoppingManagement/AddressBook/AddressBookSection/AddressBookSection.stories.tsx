import { storybookSectionsTitle, AddressBookSection } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "AddressBookSection",
  component: AddressBookSection,
} as ComponentMeta<typeof AddressBookSection>;

export const Default = () => <AddressBookSection accountId="fake-1" />;
