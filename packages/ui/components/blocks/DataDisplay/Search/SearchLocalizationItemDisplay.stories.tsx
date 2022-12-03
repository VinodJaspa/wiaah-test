import {
  storybookBlocksTitle,
  LocalizationSearchItem,
  LocalizationsPH,
} from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookBlocksTitle + "LocalizationSearchItem",
  component: LocalizationSearchItem,
} as ComponentMeta<typeof LocalizationSearchItem>;

export const UserSearch = () => (
  <LocalizationSearchItem location={LocalizationsPH[0]} />
);
