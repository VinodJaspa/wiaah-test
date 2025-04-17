import { storybookHeadersTitle } from "utils";
import { DiscoverHeader } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / Blocks / Headers /DiscoverHeader",
  component: DiscoverHeader,
} as Meta<typeof DiscoverHeader>;

export const Default = () => {
  return <DiscoverHeader />;
};
