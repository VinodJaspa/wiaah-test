import { storybookSectionsTitle, AddressBookSection } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / sections / AddressBookSection",
  component: AddressBookSection,
} as Meta<typeof AddressBookSection>;

export const Default = () => <AddressBookSection accountId="fake-1" />;
