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
  products: Pick<
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
  >[];
  onDelete: (id: string) => any;
  filters: any;
  onFiltersChange: (filters: any) => any;
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
        <TableContainer>
          <Table ThProps={{ className: "whitespace-nowrap" }} className="w-fit">
            <THead>
              <Tr>
                <Th>{t("Image")}</Th>
                <Th>{t("Product")}</Th>
                <Th>{t("Price")}</Th>
                <Th>{t("Stock Status")}</Th>
                <Th>{t("Earnings")}</Th>
                <Th>{t("Sales")}</Th>
                <Th>{t("Total Ordered Items")}</Th>
                <Th>{t("Total Discounted Orders")}</Th>
                <Th>{t("Total Discounted Amount")}</Th>
                <Th>{t("Items Refunded")}</Th>
                <Th>{t("Refund Rate")}</Th>
                <Th>{t("Positive feedback received")}</Th>
                <Th>{t("Received Positive feedback rate")}</Th>
                <Th>{t("Negative feedback received")}</Th>
                <Th>{t("Received negative feedback rate")}</Th>
                <Th>{t("Status")}</Th>
                <Th>{t("Views")}</Th>
                <Th>{t("Action")}</Th>
              </Tr>
              <Tr>
                <Formik<typeof input> initialValues={{}} onSubmit={() => {}}>
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
                          <FormikInput name="earning" type="number" />
                        </Th>
                        <Th>
                          <FormikInput name="sales" type="number" />
                        </Th>
                        <Th>
                          <FormikInput name="totalOrdered" />
                        </Th>
                        <Th>
                          <FormikInput name="totalDiscounted" />
                        </Th>
                        <Th>
                          <FormikInput name="totalDiscountAmount" />
                        </Th>
                        <Th>
                          <FormikInput name="unitRefunded" />
                        </Th>
                        <Th>
                          <FormikInput name="refundRate" />
                        </Th>
                        <Th>
                          <FormikInput name="positiveFeedback" />
                        </Th>
                        <Th>
                          <FormikInput name="positiveFeedbackRate" />
                        </Th>
                        <Th>
                          <FormikInput name="negitiveFeedback" />
                        </Th>
                        <Th>
                          <FormikInput name="negitiveFeedbackRate" />
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
                  <Td align="center">{product.title}</Td>
                  <Td align="center">
                    <PriceDisplay price={product.price} />
                  </Td>
                  <Td align="center">{product.stock}</Td>
                  <Td align="center">
                    <PriceDisplay price={product.earnings} />
                  </Td>
                  <Td align="center">{product.sales}</Td>
                  <Td align="center">{product.totalOrdered}</Td>
                  <Td align="center">{product.totalDiscounted}</Td>
                  <Td align="center">{product.totalDiscountedAmount}</Td>
                  <Td align="center">{product.unitsRefunded}</Td>
                  <Td align="center">
                    %
                    {product.unitsRefunded / product.sales === Infinity
                      ? 0
                      : product.unitsRefunded / product.sales}
                  </Td>
                  <Td align="center">{product.positiveFeedback}</Td>
                  <Td align="center">
                    %
                    {product.positiveFeedback / product.reviews === Infinity
                      ? 0
                      : product.positiveFeedback / product.reviews}
                  </Td>
                  <Td align="center">{product.negitiveFeedback}</Td>
                  <Td align="center">
                    %
                    {product.negitiveFeedback / product.reviews === Infinity
                      ? 0
                      : product.negitiveFeedback / product.reviews}
                  </Td>
                  <Td align="center">{product.status}</Td>
                  <Td>165</Td>
                  <Td align="center">
                    <div className="flex items-center gap-2">
                      <EditIcon
                        onClick={() => EditProduct(product.id)}
                        className="text-xl cursor-pointer"
                      />
                      <TrashIcon
                        onClick={() => {
                          onDelete && onDelete(product.id);
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
