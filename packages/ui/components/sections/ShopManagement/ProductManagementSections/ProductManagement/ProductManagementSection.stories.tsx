import { ProductManagementSection } from "../ProductManagement";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  title: "UI / sections / ProductManagementSection",
  component: ProductManagementSection,
} as Meta<typeof ProductManagementSection>;

export const Default = () => <ProductManagementSection />;
