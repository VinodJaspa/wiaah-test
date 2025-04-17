import { VoucherInput } from "./index";
import { Meta, StoryFn } from "@storybook/react";
import { storybookDataInputBlocksTitle } from "utils";

export default {
  title: "UI / blocks / Data Input /VoucherInput",
  component: VoucherInput,
} as Meta<typeof VoucherInput>;

export const Default = {
  args: {},
};
