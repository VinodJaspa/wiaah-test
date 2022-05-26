import { MembershipSection, storybookSectionsTitle } from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "MembershipSection",
  component: MembershipSection,
} as ComponentMeta<typeof MembershipSection>;

export const Default = () => <MembershipSection />;
