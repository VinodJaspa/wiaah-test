import { storybookHeadersTitle } from "utils";
import { DiscoverHeader } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookHeadersTitle + "DiscoverHeader",
  component: DiscoverHeader,
} as ComponentMeta<typeof DiscoverHeader>;

export const Default = () => {
  return <DiscoverHeader />;
};
