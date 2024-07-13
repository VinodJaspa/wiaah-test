import { OrderSearchPeriod, OrderStatusEnum } from "@features/API";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { BiCloudDownload, BiFolder } from "react-icons/bi";
import { useRouting } from "routing";
import {
  AdminGetSalesDurningPeriodQuery,
  Button,
  DateFormInput,
  Image,
  Input,
  ListIcon,
  Pagination,
  PriceDisplay,
  SearchFilterInput,
  Table,
  TableContainer,
  TBody,
  Td,
  Th,
  THead,
  Tr,
  useAdminGetSalesByPeriod,
  usePaginationControls,
} from "ui";
import { mapArray, useForm } from "utils";

const SalesStatistics: NextPage = () => {
  const { t } = useTranslation();
  const { getParam } = useRouting();

  const period = getParam("period");

  const { pagination, controls } = usePaginationControls();
  const { form, inputProps } = useForm<
    Parameters<typeof useAdminGetSalesByPeriod>[0]
  >({
    pagination,
    searchPeriod:
      period === "day"
        ? OrderSearchPeriod.Day
        : period === "week"
          ? OrderSearchPeriod.Week
          : period === "month"
            ? OrderSearchPeriod.Month
            : undefined,
  });
  const { data: _sales } = useAdminGetSalesByPeriod(form);
  const sales = FAKE_SALES;

  return (
    <section className="flex flex-col gap-8 w-full">
      <div className="border border-gray-300">
        <div className="text-xl bg-gray-100 p-4 flex gap-2 items-center w-full">
          <ListIcon />
          <p>{t("Sales List")}</p>
        </div>
        <div className="px-4">
          <div className="flex w-full justify-between">
            <div className="flex items-center gap-2">
              <p>{t("Filter Orders")}</p>
              <DateFormInput flushed />
            </div>
            <div className="flex flex-col gap-2 items-end">
              <div className="flex gap-1 items-center ">
                <BiFolder />
                <p>{t("Export to")}</p>
                <SearchFilterInput
                  controls={{ hasMore: true, next: () => { } }}
                  value=""
                  flushed
                />
              </div>
              <Button className="flex items-center gap-1">
                <BiCloudDownload />
                <p>{t("Export")}</p>
              </Button>
            </div>
          </div>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Input
              placeholder={t("Product Name")}
              flushed
              name="product_name"
              {...inputProps("productName")}
            />
            <Input
              {...inputProps("seller")}
              placeholder={t("Seller")}
              flushed
              name="seller"
            />
            <Input
              {...inputProps("buyer")}
              placeholder={t("Buyer")}
              flushed
              name="buyer"
            />
            <Input
              {...inputProps("qty")}
              placeholder={t("Quantity")}
              flushed
              name="qty"
            />
            <Input
              {...inputProps("address")}
              placeholder={t("Address")}
              flushed
              name="address"
            />
            <Input
              placeholder={t("Payment Method")}
              flushed
              name="payment_method"
            />
            <Input
              {...inputProps("status")}
              placeholder={t("Status")}
              flushed
              name="status"
            />
          </div>
          <TableContainer>
            <Table
              TrProps={{ className: "border-t border-t-gray-200" }}
              className="w-full"
            >
              <THead>
                <Tr>
                  <Th className="w-32">{t("Cover")}</Th>
                  <Th>{t("Product Name")}</Th>
                  <Th>{t("Quantity")}</Th>
                  <Th>{t("Buyer")}</Th>
                  <Th>{t("Address")}</Th>
                  <Th>{t("Payment Method")}</Th>
                  <Th>{t("Status")}</Th>
                  <Th>{t("Amount")}</Th>
                  <Th>{t("Date")}</Th>
                </Tr>
              </THead>
              <TBody>
                {mapArray(
                  sales,
                  ({ buyer, order, qty, status, paid, product, createdAt }) => (
                    <Tr>
                      <Td>
                        <Image src={product.thumbnail} />
                      </Td>
                      <Td>{product.title}</Td>
                      <Td>{qty}</Td>
                      <Td>{buyer?.profile?.username}</Td>
                      <Td>{order.shippingAddress.location.address}</Td>
                      <Td></Td>
                      <Td>{status}</Td>
                      <Td>
                        <PriceDisplay price={paid} />
                      </Td>
                      <Td>{new Date(createdAt).toDateString()}</Td>
                    </Tr>
                  )
                )}
              </TBody>
            </Table>
          </TableContainer>
        </div>
        <Pagination controls={controls} />
      </div>
    </section>
  );
};

export default SalesStatistics;

const FAKE_SALES: AdminGetSalesDurningPeriodQuery["getSalesDurningPeriod"] = [
  {
    __typename: "OrderItem",
    qty: 2,
    discount: 10,
    discountAmount: 5,
    cashback: 2,
    status: OrderStatusEnum.Paid,
    paid: 44,
    id: "orderItem1",
    createdAt: "2024-07-13T09:00:00Z",
    product: {
      __typename: "Product",
      title: "Product A",
      thumbnail: "https://example.com/productA.jpg",
    },
    buyer: {
      __typename: "Account",
      profile: {
        __typename: "Profile",
        username: "buyer1username",
      },
    },
    order: {
      __typename: "Order",
      shippingAddress: {
        __typename: "ShippingAddress",
        location: {
          __typename: "Location",
          address: "123 Example St",
          city: "Exampleville",
          country: "Exampleland",
          state: "Exampleria",
        },
      },
    },
    affiliator: {
      __typename: "Account",
      profile: {
        __typename: "Profile",
        username: "affiliator1username",
      },
    },
  },
  {
    __typename: "OrderItem",
    qty: 1,
    discount: 5,
    discountAmount: 2,
    cashback: 1,
    status: OrderStatusEnum.Canceled,
    paid: 0,
    id: "orderItem2",
    createdAt: "2024-07-12T15:30:00Z",
    product: {
      __typename: "Product",
      title: "Product B",
      thumbnail: "https://example.com/productB.jpg",
    },
    buyer: {
      __typename: "Account",
      profile: {
        __typename: "Profile",
        username: "buyer2username",
      },
    },
    order: {
      __typename: "Order",
      shippingAddress: {
        __typename: "ShippingAddress",
        location: {
          __typename: "Location",
          address: "456 Sample Rd",
          city: "Sampletown",
          country: "Sampleland",
          state: "Sampleria",
        },
      },
    },
    affiliator: {
      __typename: "Account",
      profile: {
        __typename: "Profile",
        username: "affiliator2username",
      },
    },
  },
  // Add more order items as needed
];
