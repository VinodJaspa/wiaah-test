import React from "react";
import {
  ProductDetailsTable,
  useEditProductData,
  AddNewProductSection,
} from "@UI";

export interface ProductManagementSectionProps {}

export const ProductManagementSection: React.FC<
  ProductManagementSectionProps
> = () => {
  const { product } = useEditProductData();

  return typeof product === "undefined" ? (
    <ProductDetailsTable />
  ) : (
    <AddNewProductSection />
  );
};
