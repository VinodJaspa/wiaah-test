import { BlocklistSection, storybookSectionsTitle } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / sections / BlockListSection",
  component: BlocklistSection,
} as Meta<typeof BlocklistSection>;

export const Default = () => <BlocklistSection />;
