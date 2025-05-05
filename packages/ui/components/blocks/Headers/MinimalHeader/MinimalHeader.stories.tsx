import { storybookHeadersTitle } from "utils";
import { MinimalHeader } from "./index";
import { Meta } from "@storybook/react";

export default {
  title: "UI / Blocks / Headers /Minimal Header",
  component: MinimalHeader,
} as Meta<typeof MinimalHeader>;

export const Default = () => {
  return <MinimalHeader />;
};
