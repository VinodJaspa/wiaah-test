import { useResponsive } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Table,
  Th,
  TBody,
  Tr,
  Td,
  THead,
  TableContainer,
  TrashIcon,
  EditIcon,
  SquarePlusOutlineIcon,
  SelectOption,
  Select,
  Image,
  PriceDisplay,
  Input,
} from "@partials";
import { SectionHeader } from "@sections";
import { ItemsPagination, usePaginationControls } from "@blocks/Navigating";
import { useEditProductData } from "@src/Hooks";
import {
  useDeleteMyProductMutation,
  useGetMyProducts,
} from "@features/Products";
import { Product, QueryGetMyProductsArgs } from "@features/API";
import { Formik } from "formik";
import { FormikInput } from "@blocks/DataInput";
import { mapArray } from "@UI/../utils/src";

export interface ProductDetailsTableProps {
  products: {
    __typename?: "Products";
  } & Pick<
    Product,
    | "title"
    | "thumbnail"
    | "price"
    | "stock"
    | "earnings"
    | "sales"
    | "totalOrdered"
    | "totalDiscounted"
    | "totalDiscountedAmount"
    | "unitsRefunded"
    | "id"
    | "positiveFeedback"
    | "reviews"
    | "negitiveFeedback"
    | "status"
    | "external_clicks"
  >[];
  onDelete: (id: string) => any;
  filters: any;
}

export const ProductDetailsTable: React.FC<ProductDetailsTableProps> = ({
  products,
  onDelete,
}) => {
  const { AddNewProduct, EditProduct } = useEditProductData();
  const [input, setInput] = React.useState<
    Omit<QueryGetMyProductsArgs["filterInput"], "pagination">
  >({});

  const { isMobile } = useResponsive();

  const { t } = useTranslation();

  return (
    <div className="w-full flex flex-col gap-4">
      <SectionHeader sectionTitle={t("your_products", "Your Products")}>
        {isMobile ? (
          <SquarePlusOutlineIcon className="text-2xl" onClick={AddNewProduct} />
        ) : (
          <Button onClick={AddNewProduct}>{t("Add New Product")}</Button>
        )}
      </SectionHeader>
      <div className="flex flex-col gap-4 shadow p-4">
        <TableContainer className="w-full">
          <Table
            ThProps={{ className: "whitespace-nowrap" }}
            className="w-full"
          >
            <THead>
              <Tr>
                <Th>{t("Image")}</Th>
                <Th>{t("Product")}</Th>
                <Th>{t("Price")}</Th>
                <Th>{t("Stock Status")}</Th>
                <Th>{t("Status")}</Th>
                <Th>{t("Action")}</Th>
              </Tr>
              <Tr>
                <Formik<typeof input> initialValues={{}} onSubmit={() => { }}>
                  {({ values, setFieldValue }) => {
                    setInput(values);
                    return (
                      <>
                        <Th></Th>
                        <Th>
                          <FormikInput name="title" />
                        </Th>
                        <Th>
                          <FormikInput name="price" type="number" />
                        </Th>
                        <Th>
                          <Select
                            onOptionSelect={(e) => setFieldValue("stock", e)}
                          >
                            <SelectOption value={"inStock"}>
                              {t("InStock")}
                            </SelectOption>
                            <SelectOption value={"outStock"}>
                              {t("outStock")}
                            </SelectOption>
                          </Select>
                        </Th>
                        <Th>
                          <Select
                            onOptionSelect={(v) => setFieldValue("status", v)}
                          >
                            <SelectOption value={"active"}>
                              {t("Active")}
                            </SelectOption>
                            <SelectOption value={"inActive"}>
                              {t("InActive")}
                            </SelectOption>
                          </Select>
                        </Th>
                        <Th>
                          <FormikInput name="views" />
                        </Th>
                        <Th></Th>
                      </>
                    );
                  }}
                </Formik>
              </Tr>
            </THead>
            <TBody>
              {mapArray(products, (product, i) => (
                <Tr key={product.id + i}>
                  <Td align="center" className="w-24">
                    <Image
                      className="h-auto w-full"
                      src={product.thumbnail}
                      alt={product.title}
                    />
                  </Td>
                  <Td align="center">{product.title.value}</Td>
                  <Td align="center">
                    <PriceDisplay price={product.price} />
                  </Td>
                  <Td align="center">{product.stock}</Td>
                  <Td align="center">{product.status}</Td>
                  <Td align="center">
                    <div className="flex items-center gap-2">
                      <EditIcon
                        onClick={() => EditProduct(product.id)}
                        className="text-xl cursor-pointer"
                      />
                      <TrashIcon
                        onClick={() => {
                         onDelete(product.id);
                        }}
                        className="text-red-700 text-xl cursor-pointer"
                      />
                    </div>
                  </Td>
                </Tr>
              ))}
            </TBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
