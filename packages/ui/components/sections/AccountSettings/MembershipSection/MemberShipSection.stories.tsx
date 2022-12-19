import { MembershipSection, storybookSectionsTitle } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "MembershipSection",
  component: MembershipSection,
} as ComponentMeta<typeof MembershipSection>;

export const Default = () => <MembershipSection />;
