import { MembershipSection, storybookSectionsTitle } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / sections / MembershipSection",
  component: MembershipSection,
} as Meta<typeof MembershipSection>;

export const Default = () => <MembershipSection />;
