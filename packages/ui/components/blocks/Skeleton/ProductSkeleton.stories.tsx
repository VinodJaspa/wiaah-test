import { Meta } from "@storybook/react";
import { ProductSkeleton } from "./ProductSkeleton";
import { storybookBlocksTitle } from "utils";

export default {
  title: "UI / blocks / ProductSkeleton",
  component: ProductSkeleton,
} as Meta<typeof ProductSkeleton>;

export const Default = () => (
  <div className="w-[50vw] h-[50vh]">
    <ProductSkeleton />;
  </div>
);
