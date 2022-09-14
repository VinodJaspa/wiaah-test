import { ProductColorSelectInput } from "./ProductColorSelectInput";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookSearchInputsTitle } from "utils";

export default {
  title: storybookSearchInputsTitle + "ProductColorSelectInput",
  component: ProductColorSelectInput,
} as ComponentMeta<typeof ProductColorSelectInput>;

const template: ComponentStory<typeof ProductColorSelectInput> = (args) => (
  <ProductColorSelectInput {...args} />
);

export const Default = template.bind({});
Default.args = {
  colors: [
    {
      label: "Red",
      value: "#f52e20",
    },
    {
      label: "Green",
      value: "#27e339",
    },
    {
      label: "Blue",
      value: "#2739e3",
    },
  ],
};
