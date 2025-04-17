import {
  storybookBlocksTitle,
  LocalizationSearchItem,
  LocalizationsPH,
} from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / blocks / LocalizationSearchItem",
  component: LocalizationSearchItem,
} as Meta<typeof LocalizationSearchItem>;

export const UserSearch = () => (
  <LocalizationSearchItem location={LocalizationsPH[0]} />
);
