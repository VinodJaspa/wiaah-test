import {
  AddNewProductSection,
  Pagination,
  ProductDetailsTable,
  useDeleteMyProductMutation,
  useEditProductData,
  useGetMyProducts,
  usePaginationControls,
} from "@UI";
import React from "react";
import { useForm } from "utils";

export const AccountProductManagement: React.FC<{
  accountId: string;
}> = () => {
  const { product } = useEditProductData();

  const { mutate: deleteProd } = useDeleteMyProductMutation();

  const { controls, pagination } = usePaginationControls();

  const { form, setValue } = useForm<Parameters<typeof useGetMyProducts>[0]>(
    {
      pagination,
    },
    { pagination }
  );
  const { data } = useGetMyProducts(form);

  return typeof product === "undefined" ? (
    <>
      <ProductDetailsTable
        filters={(v: any) => setValue(v)}
        onFiltersChange={() => {}}
        products={data || []}
        onDelete={(id) => deleteProd(id)}
      />
      <Pagination controls={controls} />
    </>
  ) : (
    <AddNewProductSection />
  );
};
