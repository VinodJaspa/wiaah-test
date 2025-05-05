import { storybookDataInputBlocksTitle } from "utils";
import { Meta } from "@storybook/react";
import { SubCategorySelect } from "@UI";
import { categories } from "@UI/../placeholder";

export default {
  title: "UI / blocks / Data Input /SubCategorySelect",
  component: SubCategorySelect,
} as Meta<typeof SubCategorySelect>;

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
