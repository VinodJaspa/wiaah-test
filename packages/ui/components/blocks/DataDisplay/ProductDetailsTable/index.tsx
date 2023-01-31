import { useResponsive } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { ProductManagementDetailsDataType } from "types";
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
  Input,
  SelectOption,
  Select,
  Image,
  PriceDisplay,
} from "@partials";
import { SectionHeader } from "@sections";
import { ItemsPagination, usePaginationControls } from "@blocks/Navigating";
import { useEditProductData } from "@src/Hooks";
import { useGetMyProducts } from "@features/Products";

export interface ProductDetailsTableProps {}

export const ProductDetailsTable: React.FC<ProductDetailsTableProps> = ({}) => {
  const { AddNewProduct, EditProduct } = useEditProductData();
  const { controls, changeTotalItems, pagination } = usePaginationControls();
  const { isMobile } = useResponsive();
  const { t } = useTranslation();

  const { data: Products } = useGetMyProducts({
    pagination,
  });

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
              <Tr>
                <Th></Th>
                <Th>
                  <Input />
                </Th>
                <Th>
                  <Input type="number" />
                </Th>
                <Th>
                  <Select>
                    <SelectOption value={"inStock"}>
                      {t("InStock")}
                    </SelectOption>
                    <SelectOption value={"outStock"}>
                      {t("outStock")}
                    </SelectOption>
                  </Select>
                </Th>
                <Th>
                  <Input type="number" />
                </Th>
                <Th>
                  <Input type="number" />
                </Th>
                <Th>
                  <Select>
                    <SelectOption value={"active"}>{t("Active")}</SelectOption>
                    <SelectOption value={"inActive"}>
                      {t("InActive")}
                    </SelectOption>
                  </Select>
                </Th>
                <Th></Th>
              </Tr>
            </THead>
            <TBody>
              {Products?.map((product, i) => (
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
                  <Td align="center">{product.status}</Td>
                  <Td align="center">
                    <div className="flex items-center gap-2">
                      <EditIcon
                        onClick={() => EditProduct(product.id)}
                        className="text-xl cursor-pointer"
                      />
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
