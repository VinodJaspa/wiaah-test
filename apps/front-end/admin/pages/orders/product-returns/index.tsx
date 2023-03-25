import { RefundStatusType } from "@features/API";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  Checkbox,
  Input,
  ListIcon,
  Pagination,
  SearchIcon,
  Table,
  TableContainer,
  TBody,
  Td,
  Th,
  THead,
  Tr,
  useGetAdminReturnedOrder,
  usePaginationControls,
} from "ui";
import { mapArray } from "utils";

type ReturnedProduct = {
  returnId: string;
  orderId: string;
  buyer: string;
  product: string;
  model: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  seller: string;
  reason: string;
};

const products: ReturnedProduct[] = [...Array(10)].map((_, i) => ({
  returnId: `returnid-${i}`,
  buyer: `buyer-${i}`,
  model: `product model-${i}`,
  createdAt: new Date().toString(),
  orderId: `orderid-${i}`,
  product: `product-${i}`,
  status: "accepted",
  updatedAt: new Date().toString(),
  seller: `seller-${i}`,
  reason: `refund reason-${i}`,
}));

const ProductReturns = () => {
  const { t } = useTranslation();
  const { controls } = usePaginationControls();
  const { back, getCurrentPath, visit } = useRouting();

  return (
    <section>
      <div className="flex flex-col w-full gap-8">
        <div className="flex flex-col gap-4 w-full shadow-lg border p-2 rounded-lg">
          <div className="flex items-center text-xl font-bold gap-2">
            <ListIcon className="text-base" />
            <p>{t("Product Retrun List")}</p>
          </div>
          <TableContainer>
            <Table
              TrProps={{ className: "" }}
              TdProps={{ className: "border" }}
              ThProps={{ className: "whitespace-nowrap border" }}
              className="w-fit"
            >
              <THead>
                <Th className="w-fit" align="left">
                  <Checkbox />
                </Th>
                <Th>{t("Return ID")}</Th>
                <Th>{t("Order ID")}</Th>
                <Th>{t("Buyer")}</Th>
                <Th>{t("Seller")}</Th>
                <Th>{t("Comment")}</Th>
                <Th>{t("Product")}</Th>
                <Th>{t("Model")}</Th>
                <Th>{t("Status")}</Th>
                <Th>{t("Date Added")}</Th>
                <Th>{t("Date Modified")}</Th>
                <Th>{t("Action")}</Th>
                <Tr>
                  <Th></Th>
                  <Th>
                    <Input />
                  </Th>
                  <Th>
                    <Input />
                  </Th>
                  <Th>
                    <Input />
                  </Th>
                  <Th>
                    <Input />
                  </Th>
                  <Th>
                    <Input />
                  </Th>
                  <Th>
                    <Input />
                  </Th>
                  <Th>
                    <Input />
                  </Th>
                  <Th>
                    <Input />
                  </Th>
                  <Th>
                    <Input />
                  </Th>
                  <Th>
                    <Input />
                  </Th>
                </Tr>
              </THead>
              <TBody>
                {mapArray(products, (prod, i) => (
                  <Tr>
                    <Td>
                      <Checkbox />
                    </Td>
                    <Td>{prod.returnId}</Td>
                    <Td>{prod.orderId}</Td>
                    <Td>{prod.buyer}</Td>
                    <Td>{prod.seller}</Td>
                    <Td>{prod.reason}</Td>
                    <Td>{prod.product}</Td>
                    <Td>{prod.model}</Td>
                    <Td>{prod.status}</Td>
                    <Td>{new Date(prod.createdAt).toDateString()}</Td>
                    <Td>{new Date(prod.updatedAt).toDateString()}</Td>
                    <Td>
                      <SearchIcon
                        onClick={() =>
                          visit((r) =>
                            r
                              .addPath(getCurrentPath())
                              .addPath("edit")
                              .addPath(prod.returnId)
                          )
                        }
                        className="w-8 h-8 p-2 text-white fill-white rounded hover:bg-cyan-600 bg-cyan-500"
                      />
                    </Td>
                  </Tr>
                ))}
              </TBody>
            </Table>
          </TableContainer>
          <Pagination />
        </div>
      </div>
    </section>
  );
};

export default ProductReturns;
