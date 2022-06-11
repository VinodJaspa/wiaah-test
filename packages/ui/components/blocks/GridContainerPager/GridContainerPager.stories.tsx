import { GridContainerPager } from "ui";
import { ComponentMeta } from "@storybook/react";
import { storybookBlocksTitle } from "utils";

export default {
  title: storybookBlocksTitle + "GridContainerPager",
  component: GridContainerPager,
} as ComponentMeta<typeof GridContainerPager>;

export const Default = () => {
  return (
    <GridContainerPager componentsLimit={5}>
      {[...Array(20)].map((_, i) => (
        <div className="w-16 h-16 bg-slate-100">{i}</div>
      ))}
    </GridContainerPager>
  );
};

export const withoutPagination = () => {
  return (
    <GridContainerPager componentsLimit={5} showPagination={false}>
      {[...Array(20)].map((_, i) => (
        <div className="w-16 h-16 bg-slate-100">{i}</div>
      ))}
    </GridContainerPager>
  );
};
