import { storybookDataInputBlocksTitle } from "utils";
import { ComponentMeta } from "@storybook/react";
import { SearchInput } from "ui";

export default {
  title: storybookDataInputBlocksTitle + "SearchInput",
  component: SearchInput,
} as ComponentMeta<typeof SearchInput>;

export const Default = () => {
  return <SearchInput />;
};
