import { ComponentMeta } from "@storybook/react";
import { ProductSkeleton } from "./ProductSkeleton";
import { storybookBlocksTitle } from "utils";

export default {
  title: storybookBlocksTitle + "ProductSkeleton",
  component: ProductSkeleton,
} as ComponentMeta<typeof ProductSkeleton>;

export const Default = () => (
  <div className="w-[50vw] h-[50vh]">
    <ProductSkeleton />;
  </div>
);
