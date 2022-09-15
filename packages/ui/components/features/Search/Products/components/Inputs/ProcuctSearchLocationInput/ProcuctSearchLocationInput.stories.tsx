import { ProductSearchLocationInput } from "./ProductSearchLocationInput";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookSearchInputsTitle } from "utils";

export default {
  title: storybookSearchInputsTitle + "ProductSearchLocationInput",
  component: ProductSearchLocationInput,
} as ComponentMeta<typeof ProductSearchLocationInput>;

const template: ComponentStory<typeof ProductSearchLocationInput> = (args) => (
  <ProductSearchLocationInput {...args} />
);

export const Default = template.bind({});
Default.args = {};
