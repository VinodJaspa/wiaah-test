import React from "react";
import { useTranslation } from "react-i18next";
import { BiEdit } from "react-icons/bi";
import { IoTrash } from "react-icons/io5";
import { ProductManagementDetailsDataType } from "types";
import { ItemsPagination, useEditProductData, Button } from "ui";

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
        <div className="noScroll">
          <table className="w-full">
            <thead>
              <tr>
                <th>{t("image", "Image")}</th>
                <th>{t("product", "Product")}</th>
                <th>{t("price", "Price")}</th>
                <th>{t("stock_status", "Stock Status")}</th>
                <th>{t("earnings", "Earnings")}</th>
                <th>{t("sales", "Sales")}</th>
                <th>{t("status", "Status")}</th>
                <th>{t("action", "Action")}</th>
              </tr>
            </thead>
            <thead>
              {products.map((product, i) => (
                <tr key={product.id + i}>
                  <td className="w-24">
                    <img
                      className="h-auto w-full"
                      src={product.image}
                      alt={product.name}
                    />
                  </td>
                  <td align="center">{product.name}</td>
                  <td align="center">
                    {product.price.amount} {product.price.currency}
                  </td>
                  <td align="center">{product.stockStatus}</td>
                  <td align="center">
                    {product.earnings.amount} {product.earnings.currency}
                  </td>
                  <td align="center">{product.sales}</td>
                  <td align="center">{product.status}</td>
                  <td align="center">
                    <div className="flex items-center gap-2">
                      <BiEdit className="text-xl cursor-pointer" />
                      <IoTrash className="text-red-700 text-xl cursor-pointer" />
                    </div>
                  </td>
                </tr>
              ))}
            </thead>
          </table>
        </div>
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
