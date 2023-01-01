import {
  storybookBlocksTitle,
  LocalizationSearchItem,
  LocalizationsPH,
} from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookBlocksTitle + "LocalizationSearchItem",
  component: LocalizationSearchItem,
} as ComponentMeta<typeof LocalizationSearchItem>;

export const UserSearch = () => (
  <LocalizationSearchItem location={LocalizationsPH[0]} />
);
