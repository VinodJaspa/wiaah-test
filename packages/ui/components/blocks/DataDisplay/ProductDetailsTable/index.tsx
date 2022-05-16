import {
  Button,
  TableContainer,
  Table,
  Thead,
  Tr,
  Td,
  Tbody,
  HStack,
  IconButton,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { BiEdit } from "react-icons/bi";
import { IoTrash } from "react-icons/io5";
import { ProductManagementDetailsDataType } from "types";
import { ItemsPagination, useEditProductData } from "ui";

export interface ProductDetailsTableProps {}

export const ProductDetailsTable: React.FC<ProductDetailsTableProps> = ({}) => {
  const { AddNewProduct } = useEditProductData();
  const { t } = useTranslation();
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="border-b-2 pb-2 border-primary flex items-center justify-between w-full">
        <h1 className="font-bold text-4xl">
          {t("your_products", "Your Products")}
        </h1>
        <Button onClick={AddNewProduct}>
          {t("add_new_product", "Add New Product")}
        </Button>
      </div>
      <div className="flex flex-col gap-4 shadow p-4">
        <TableContainer className="noScroll">
          <Table colorScheme={"primary"} size={"lg"}>
            <Thead>
              <Tr>
                <Td>{t("image", "Image")}</Td>
                <Td>{t("product", "Product")}</Td>
                <Td>{t("price", "Price")}</Td>
                <Td>{t("stock_status", "Stock Status")}</Td>
                <Td>{t("earnings", "Earnings")}</Td>
                <Td>{t("sales", "Sales")}</Td>
                <Td>{t("status", "Status")}</Td>
                <Td>{t("action", "Action")}</Td>
              </Tr>
            </Thead>
            <Tbody>
              {products.map((product, i) => (
                <Tr key={product.id + i}>
                  <Td>
                    <Image
                      className="h-full w-auto"
                      src={product.image}
                      alt={product.name}
                    />
                  </Td>
                  <Td>{product.name}</Td>
                  <Td isNumeric>
                    {product.price.amount} {product.price.currency}
                  </Td>
                  <Td>{product.stockStatus}</Td>
                  <Td isNumeric>
                    {product.earnings.amount} {product.earnings.currency}
                  </Td>
                  <Td isNumeric>{product.sales}</Td>
                  <Td>{product.status}</Td>
                  <Td>
                    <HStack>
                      <IconButton
                        aria-label={t("delete_product", "Delete Product")}
                        variant="icon"
                        fontSize={"x-large"}
                        as={BiEdit}
                      />
                      <IconButton
                        aria-label={t("delete_product", "Delete Product")}
                        variant="icon"
                        fontSize={"x-large"}
                        color="red"
                        as={IoTrash}
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <ItemsPagination currentPage={2} maxItemsNum={30} />
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
