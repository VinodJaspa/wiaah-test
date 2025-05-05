import { storybookDataInputBlocksTitle } from "utils";
import { Meta } from "@storybook/react";
import { SearchInput } from "@UI";

export default {
  title: "UI / blocks / Data Input /SearchInput",
  component: SearchInput,
} as Meta<typeof SearchInput>;

export const Default = () => {
  return <SearchInput />;
};
