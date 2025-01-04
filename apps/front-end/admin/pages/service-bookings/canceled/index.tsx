import {
  Button,
  Image,
  Input,
  ListIcon,
  Pagination,
  PriceDisplay,
  Select,
  SelectOption,
  Table,
  TableContainer,
  TBody,
  Td,
  Th,
  THead,
  Tr,
  TrashIcon,
} from "ui";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { mapArray, randomNum } from "utils";
import { getRandomImage } from "placeholder";
import Head from "next/head";

interface CanceledOrder {
  id: string;
  thumbnail: string;
  title: string;
  seller: string;
  buyer: string;
  qty: number;
  price: number;
  shippingCost: number;
  returnReason: string;
  otherReason: string;
  paymentMethod: string;
}

const orders: CanceledOrder[] = [...Array(10)].map((_, i) => ({
  id: i.toString(),
  seller: `seller-${i}`,
  buyer: `buyer-${i}`,
  otherReason: `other reason`,
  price: randomNum(500),
  qty: randomNum(5),
  returnReason: `return reason-${i}`,
  shippingCost: randomNum(100),
  thumbnail: getRandomImage(),
  title: `product name-${i}`,
  paymentMethod: "paypal",
}));

const CanceledOrders: NextPage = () => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Head>
        <title>Admin | Canceled Service Bookings </title>
      </Head>
      <section>
        <div className="border border-gray-300">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ListIcon />
              <p>{t("Canceled Orders")}</p>
            </div>
            <Select className="w-1/2" flushed>
              <SelectOption value={"filter"}>{t("Filter")}</SelectOption>
            </Select>
          </div>
          <div className="p-4">
            <TableContainer>
              <Table className="min-w-max">
                <THead>
                  <Tr>
                    <Th className="w-32">{t("Product Image")}</Th>
                    <Th>{t("Product Name")}</Th>
                    <Th>{t("Seller Name")}</Th>
                    <Th>{t("Buyer Name")}</Th>
                    <Th>{t("Quantity")}</Th>
                    <Th>{t("Paid Price")}</Th>
                    <Th>{t("Shipping Amount")}</Th>
                    <Th>{t("Return Reason")}</Th>
                    <Th>{t("Other Reason")}</Th>
                    <Th>{t("Payment Method")}</Th>
                    <Th>{t("Action")}</Th>
                  </Tr>
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
                      <Input type={"number"} />
                    </Th>
                    <Th>
                      <Input type={"number"} />
                    </Th>
                    <Th>
                      <Input type={"number"} />
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
                    <Th></Th>
                  </Tr>
                </THead>
                <TBody>
                  {mapArray(
                    orders,
                    ({
                      buyer,
                      id,
                      otherReason,
                      paymentMethod,
                      price,
                      qty,
                      returnReason,
                      seller,
                      shippingCost,
                      thumbnail,
                      title,
                    }) => (
                      <Tr>
                        <Td>
                          <Image src={thumbnail} alt="thumbnail" />
                        </Td>
                        <Td>{title}</Td>
                        <Td>{seller}</Td>
                        <Td>{buyer}</Td>
                        <Td>{qty}</Td>
                        <Td>
                          <PriceDisplay price={price} />
                        </Td>
                        <Td>
                          <PriceDisplay price={shippingCost} />
                        </Td>
                        <Td>{returnReason}</Td>
                        <Td>{otherReason}</Td>
                        <Td>{paymentMethod}</Td>
                        <Td>
                          <Button colorScheme="danger">
                            <TrashIcon></TrashIcon>
                          </Button>
                        </Td>
                      </Tr>
                    ),
                  )}
                </TBody>
              </Table>
            </TableContainer>
            <Pagination />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default CanceledOrders;
