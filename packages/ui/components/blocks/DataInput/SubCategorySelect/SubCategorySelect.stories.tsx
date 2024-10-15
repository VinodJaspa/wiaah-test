import { storybookDataInputBlocksTitle } from "utils";
import { ComponentMeta } from "@storybook/react";
import { SubCategorySelect } from "@UI";
import { categories } from "@UI/../placeholder";

export default {
  title: storybookDataInputBlocksTitle + "SubCategorySelect",
  component: SubCategorySelect,
} as ComponentMeta<typeof SubCategorySelect>;

export const Default = () => {
  return (
    <SubCategorySelect
      categories={categories}
      onCateSelection={(v) => {
        console.log(v);
      }}
    ></SubCategorySelect>
  );
};
