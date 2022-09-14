import { BrandSelectInput } from "./BrandSelectInput";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookSearchInputsTitle } from "utils";

export default {
  title: storybookSearchInputsTitle + "BrandSelectInput",
  component: BrandSelectInput,
} as ComponentMeta<typeof BrandSelectInput>;

const template: ComponentStory<typeof BrandSelectInput> = (args) => (
  <BrandSelectInput {...args} />
);

export const Default = template.bind({});
Default.args = {
  options: ["Nike"],
};
