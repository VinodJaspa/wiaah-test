import {
  AdminGetFilteredReturnOrdersQuery,
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
  useAdminGetReturnedProductsQuery,
  usePaginationControls,
} from "ui";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { mapArray, useForm } from "utils";

const CanceledOrders: NextPage = () => {
  const { t } = useTranslation();

  const { pagination, controls } = usePaginationControls();
  const { form, handleChange, inputProps } = useForm<
    Parameters<typeof useAdminGetReturnedProductsQuery>[0]
  >({ pagination }, { pagination });
  const { data: _orders } = useAdminGetReturnedProductsQuery(form);
  const orders = FAKE_ORDERS;

  return (
    <section>
      <div className="border border-gray-300">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ListIcon />
            <p className="whitespace-nowrap w-full">{t("Canceled Orders")}</p>
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
                  <Th className="w-40">{t("Product Image")}</Th>
                  <Th>{t("Product Name")}</Th>
                  <Th>{t("Seller Name")}</Th>
                  <Th>{t("Buyer Name")}</Th>
                  <Th>{t("Quantity")}</Th>
                  <Th>{t("Paid Price")}</Th>
                  <Th>{t("Shipping Amount")}</Th>
                  <Th>{t("Return Reason")}</Th>
                  <Th>{t("Payment Method")}</Th>
                  <Th>{t("Action")}</Th>
                </Tr>
                <Tr>
                  <Th></Th>
                  <Th>
                    <Input {...inputProps("productName")} />
                  </Th>
                  <Th>
                    <Input {...inputProps("sellerName")} />
                  </Th>
                  <Th>
                    <Input {...inputProps("buyerName")} />
                  </Th>
                  <Th>
                    <Input {...inputProps("qty")} type={"number"} />
                  </Th>
                  <Th>
                    <Input {...inputProps("price")} type={"number"} />
                  </Th>
                  <Th>
                    <Input {...inputProps("shippingAmount")} type={"number"} />
                  </Th>
                  <Th>
                    <Input {...inputProps("reason")} />
                  </Th>
                  <Th>
                    <Input />
                  </Th>
                  <Th></Th>
                </Tr>
              </THead>
              <TBody>
                {mapArray(orders, ({ amount, orderItem, reason }) => (
                  <Tr>
                    <Td>
                      <Image
                        src={orderItem?.product?.thumbnail}
                        alt="thumbnail"
                      />
                    </Td>
                    <Td>{orderItem?.product?.title}</Td>
                    <Td>{orderItem.seller?.profile?.username}</Td>
                    <Td>{orderItem?.buyer.profile?.username}</Td>
                    {/* <Td>{}</Td> */}
                    <Td>
                      <PriceDisplay price={orderItem.paid} />
                    </Td>
                    <Td>
                      <PriceDisplay price={orderItem.paid} />
                    </Td>
                    <Td>{reason}</Td>
                    <Td>{"visa"}</Td>
                    <Td>
                      <Button colorScheme="danger">
                        <TrashIcon onClick={() => { }} />
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </TBody>
            </Table>
          </TableContainer>
          <Pagination controls={controls} />
        </div>
      </div>
    </section>
  );
};

export default CanceledOrders;

const FAKE_ORDERS: AdminGetFilteredReturnOrdersQuery["adminGetReturnedOrders"] =
  [
    {
      __typename: "ReturnedOrder",
      amount: 100,
      reason: "Defective product",
      orderItem: {
        __typename: "OrderItem",
        paid: 44,
        product: {
          __typename: "Product",
          title: "Sample Product 1",
          thumbnail: "/shop.jpeg",
        },
        seller: {
          __typename: "Account",
          profile: {
            __typename: "Profile",
            username: "seller_user1",
          },
        },
        buyer: {
          __typename: "Account",
          profile: {
            __typename: "Profile",
            username: "buyer_user1",
          },
        },
      },
    },
    {
      __typename: "ReturnedOrder",
      amount: 150,
      reason: "Not as described",
      orderItem: {
        __typename: "OrderItem",
        paid: 33,
        product: {
          __typename: "Product",
          title: "Sample Product 2",
          thumbnail: "/shop.jpeg",
        },
        seller: {
          __typename: "Account",
          profile: {
            __typename: "Profile",
            username: "seller_user2",
          },
        },
        buyer: {
          __typename: "Account",
          profile: {
            __typename: "Profile",
            username: "buyer_user2",
          },
        },
      },
    },
  ];
