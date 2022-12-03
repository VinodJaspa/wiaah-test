import { CategoriesSelectInput } from "./CategoriesSelectInput";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookSearchInputsTitle } from "utils";

export default {
  title: storybookSearchInputsTitle + "CategoriesSelectInput",
  component: CategoriesSelectInput,
} as ComponentMeta<typeof CategoriesSelectInput>;

const template: ComponentStory<typeof CategoriesSelectInput> = (args) => (
  <CategoriesSelectInput {...args} />
);

export const Default = template.bind({});
Default.args = {
  categories: [...Array(15)].map((_, i) => `category-${i}`),
};
