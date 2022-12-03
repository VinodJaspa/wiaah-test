import { storybookHeadersTitle } from "utils";
import { MinimalHeader } from "./index";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookHeadersTitle + "Minimal Header",
  component: MinimalHeader,
} as ComponentMeta<typeof MinimalHeader>;

export const Default = () => {
  return <MinimalHeader />;
};
