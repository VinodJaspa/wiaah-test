import { useResponsive } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { ProductManagementDetailsDataType } from "types";
import {
  useEditProductData,
  Button,
  Table,
  Th,
  TBody,
  Tr,
  Td,
  THead,
  TableContainer,
  SectionHeader,
  TrashIcon,
  EditIcon,
  SquarePlusOutlineIcon,
  usePaginationControls,
  ItemsPagination,
} from "ui";

export interface ProductDetailsTableProps {}

export const ProductDetailsTable: React.FC<ProductDetailsTableProps> = ({}) => {
  const { AddNewProduct } = useEditProductData();
  const {
    controls,
    changeTotalItems,
    pagination: { page, take },
  } = usePaginationControls();
  const { isMobile } = useResponsive();
  const { t } = useTranslation();
  React.useEffect(() => {
    changeTotalItems(products.length);
  }, []);
  return (
    <div className="w-full flex flex-col gap-4">
      <SectionHeader sectionTitle={t("your_products", "Your Products")}>
        {isMobile ? (
          <SquarePlusOutlineIcon className="text-2xl" onClick={AddNewProduct} />
        ) : (
          <Button onClick={AddNewProduct}>
            {t("add_new_product", "Add New Product")}
          </Button>
        )}
      </SectionHeader>
      <div className="flex flex-col gap-4 shadow p-4">
        <TableContainer>
          <Table className="w-full">
            <THead>
              <Tr>
                <Th>{t("image", "Image")}</Th>
                <Th>{t("product", "Product")}</Th>
                <Th>{t("price", "Price")}</Th>
                <Th>{t("stock_status", "Stock Status")}</Th>
                <Th>{t("earnings", "Earnings")}</Th>
                <Th>{t("sales", "Sales")}</Th>
                <Th>{t("status", "Status")}</Th>
                <Th>{t("action", "Action")}</Th>
              </Tr>
            </THead>
            <TBody>
              {products.map((product, i) => (
                <Tr key={product.id + i}>
                  <Td align="center" className="w-24">
                    <img
                      className="h-auto w-full"
                      src={product.image}
                      alt={product.name}
                    />
                  </Td>
                  <Td align="center">{product.name}</Td>
                  <Td align="center">
                    {product.price.amount} {product.price.currency}
                  </Td>
                  <Td align="center">{product.stockStatus}</Td>
                  <Td align="center">
                    {product.earnings.amount} {product.earnings.currency}
                  </Td>
                  <Td align="center">{product.sales}</Td>
                  <Td align="center">{product.status}</Td>
                  <Td align="center">
                    <div className="flex items-center gap-2">
                      <EditIcon className="text-xl cursor-pointer" />
                      <TrashIcon className="text-red-700 text-xl cursor-pointer" />
                    </div>
                  </Td>
                </Tr>
              ))}
            </TBody>
          </Table>
        </TableContainer>
        <ItemsPagination controls={controls} />
      </div>
    </div>
  );
};
const products: ProductManagementDetailsDataType[] = [
  {
    id: "123",
    image: "/shop-2.jpeg",
    earnings: {
      amount: 200,
      currency: "USD",
    },
    name: "product 1",
    price: {
      amount: 30,
      currency: "USD",
    },
    sales: 10,
    status: "active",
    stockStatus: 15,
  },
  {
    id: "1598",
    image: "/place-2.jpg",
    earnings: {
      amount: 200,
      currency: "USD",
    },
    name: "product 1",
    price: {
      amount: 30,
      currency: "USD",
    },
    sales: 10,
    status: "active",
    stockStatus: 15,
  },
  {
    id: "234",
    image: "/verticalImage.jpg",
    earnings: {
      amount: 200,
      currency: "USD",
    },
    name: "product 1",
    price: {
      amount: 30,
      currency: "USD",
    },
    sales: 10,
    status: "active",
    stockStatus: 15,
  },
];
