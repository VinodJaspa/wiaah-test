import React, { useState } from "react";
import {
  ProductDetailsTable,
  useEditProductData,
  AddNewProductSection,
  useDeleteMyProductMutation,
  useGetMyProducts,
  Pagination,
  usePaginationControls,
} from "@UI";
import { useForm } from "utils";

export interface ProductManagementSectionProps {}

export const ProductManagementSection: React.FC<
  ProductManagementSectionProps
> = () => {
  const { product } = useEditProductData();

  const { mutate: deleteProd } = useDeleteMyProductMutation();

  const { controls, pagination } = usePaginationControls();

  const { form, setValue } = useForm<Parameters<typeof useGetMyProducts>[0]>(
    {
      pagination,
    },
    { pagination },
  );
  const { data } = useGetMyProducts(form);

  return typeof product === "undefined" ? (
    <>
      <ProductDetailsTable
        filters={(v: any) => setValue(v)}
        products={data || []}
        onDelete={(id) => deleteProd(id)}
      />
      <Pagination controls={controls} />
    </>
  ) : (
    <AddNewProductSection />
  );
};
