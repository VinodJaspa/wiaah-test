import { storybookDataInputBlocksTitle } from "utils";
import { ComponentMeta } from "@storybook/react";
import { SubCategorySelect } from "ui";

export default {
  title: storybookDataInputBlocksTitle + "SubCategorySelect",
  component: SubCategorySelect,
} as ComponentMeta<typeof SubCategorySelect>;

export const Default = () => {
  return (
    <SubCategorySelect
      onCateSelection={(v) => {
        console.log(v);
      }}
    ></SubCategorySelect>
  );
};
