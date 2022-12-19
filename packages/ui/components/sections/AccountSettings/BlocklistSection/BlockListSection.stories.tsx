import { BlocklistSection, storybookSectionsTitle } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "BlockListSection",
  component: BlocklistSection,
} as ComponentMeta<typeof BlocklistSection>;

export const Default = () => <BlocklistSection />;
