import { VoucherInput } from "./index";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookDataInputBlocksTitle } from "utils";

export default {
  title: storybookDataInputBlocksTitle + "VoucherInput",
  component: VoucherInput,
} as ComponentMeta<typeof VoucherInput>;

const template: ComponentStory<typeof VoucherInput> = (args) => (
  <VoucherInput {...args} />
);

export const Default = template.bind({});
Default.args = {};
