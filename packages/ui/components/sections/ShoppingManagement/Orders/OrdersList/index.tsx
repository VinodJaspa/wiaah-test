import { CancelOrderDto } from "dto";
import { Formik, Form } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { useReactPubsub } from "react-pubsub";
import { useRouting } from "routing";
import {
  FormOptionType,
  OrdersFilter,
  PriceType,
  TranslationTextType,
} from "types";
import {
  OrderContext,
  SectionHeader,
  Tabs,
  TabItem,
  TabTitle,
  TabList,
  TabsHeader,
  TranslationText,
  Table,
  TableContainer,
  Th,
  Td,
  Tr,
  TBody,
  Input,
  InputGroup,
  InputLeftElement,
  OrderStatusDisplay,
  PriceDisplay,
  SearchIcon,
  Button,
  ControlledModal,
  FormikInput,
  ModalButton,
  ModalCloseButton,
  ModalExtendedWrapper,
  ModalFooter,
  Textarea,
  CancelIcon,
  Radio,
  EyeIcon,
  OrderDetailsModal,
  LinkIcon,
  UpdateProductStatusModal,
} from "ui";
import { useGetOrdersHistoryQuery, useCancelOrderMutation } from "ui/Hooks";
import { DateDetails, randomNum } from "utils";
import { ReturnDeclineRequestValidationSchema } from "validation";

export interface OrdersListProps {}

export const OrdersList: React.FC<OrdersListProps> = () => {
  const { emit: openOrderDetailsModal } = useReactPubsub(
    (keys) => keys.openOrderDetailsModal
  );
  const { visit } = useRouting();
  const { shopping } = React.useContext(OrderContext);
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4">
      <SectionHeader sectionTitle={t("orders", "Orders")} />
      <Tabs>
        <TabsHeader />
        <InputGroup>
          <InputLeftElement>
            <SearchIcon />
          </InputLeftElement>
          <Input
            placeholder={`${t("Search for order ID")}, ${t(
              "customer",
              "customer"
            )}, ${t("Order Status")}, ${t("Or")} ${t("something")}`}
          />
        </InputGroup>
        <TabList />
        {OrdersTabs.map(({ tabName, filter }, i) => (
          <>
            <TabTitle>
              {({ currentTabIdx }) => (
                <TranslationText
                  className={`${
                    OrdersTabs[currentTabIdx].filter === filter
                      ? "text-primary border-b-2 border-primary"
                      : ""
                  }`}
                  translationObject={tabName}
                />
              )}
            </TabTitle>
            <TabItem>
              {() => {
                const { data: orders } = useGetOrdersHistoryQuery(filter);

                const {
                  mutate: CancelOrder,
                  isLoading: orderCancelationLoading,
                } = useCancelOrderMutation();
                return (
                  <TableContainer className="w-full">
                    <Table
                      ThProps={{
                        className:
                          "first:text-left first:pl-2 border-gray-300 border-[1px] border-collapse",
                      }}
                      TrProps={{ className: "border-collapse" }}
                      TdProps={{
                        align: "center",
                        className:
                          "first:text-left first:pl-2 border-gray-300 border border-collapse",
                      }}
                      className="w-full"
                    >
                      <Tr>
                        <Th>{t("Order ID")}</Th>
                        <Th>{shopping ? t("Seller") : t("Buyer")}</Th>
                        <Th>{t("Order")}</Th>
                        <Th>{t("Delivery Date")}</Th>
                        <Th>{t("Delivery Pricing")}</Th>
                        <Th>{t("Delivery Status")}</Th>
                        <Th>{t("Payment")}</Th>
                        <Th>{t("View")}</Th>
                        <Th>{t("Tracking")}</Th>
                        {shopping ? <Th>{t("Action")}</Th> : null}
                      </Tr>
                      <TBody>
                        {orders &&
                          orders.map((props, i) => {
                            const {
                              seller,
                              orderId,
                              orderDeliveryDate,
                              orderDeliveryPricing,
                              orderDeliveryStatus,
                              orderName,
                              payment,
                              price,
                              buyer,
                              trackingLink,
                            } = props;
                            const orderDate = DateDetails(orderDeliveryDate);
                            function handleGoToTrackingLink(link: string) {}
                            return (
                              <Tr className="cursor-pointer" key={i}>
                                <Td>{orderId}</Td>
                                <Td>
                                  {shopping ? (
                                    <p
                                      onClick={() =>
                                        visit((routes) =>
                                          routes.visitSellerSocialProfile(props)
                                        )
                                      }
                                      className="cursor-pointer hover:underline text-primary"
                                    >
                                      {seller}
                                    </p>
                                  ) : (
                                    <p
                                      onClick={() =>
                                        visit((routes) =>
                                          routes.visitBuyerSocialProfile(props)
                                        )
                                      }
                                      className="cursor-pointer hover:underline text-primary"
                                    >
                                      {buyer}
                                    </p>
                                  )}
                                </Td>
                                <Td>{orderName}</Td>
                                <Td>
                                  {new Date(
                                    orderDeliveryDate
                                  ).toLocaleDateString("en", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                  })}
                                </Td>
                                <Td>
                                  <PriceDisplay price={orderDeliveryPricing} />
                                </Td>
                                <Td>
                                  <OrderStatusDisplay
                                    className="w-fit capitalize mx-auto"
                                    status={orderDeliveryStatus}
                                  />
                                </Td>
                                <Td>{payment}</Td>
                                <Td>
                                  <div className="flex w-full justify-center">
                                    <EyeIcon
                                      onClick={() =>
                                        openOrderDetailsModal({
                                          id: orderId,
                                        })
                                      }
                                    />
                                  </div>
                                </Td>
                                <Td>
                                  <ModalExtendedWrapper>
                                    <ModalButton>
                                      <LinkIcon
                                        onClick={() =>
                                          shopping
                                            ? handleGoToTrackingLink(
                                                trackingLink
                                              )
                                            : null
                                        }
                                      />
                                    </ModalButton>
                                    {shopping ? null : (
                                      <UpdateProductStatusModal
                                        productId={orderId}
                                        status="confirmed"
                                        trackingLink="test"
                                      />
                                    )}
                                  </ModalExtendedWrapper>
                                </Td>
                                {shopping ? (
                                  <Td>
                                    <div className="w-full flex justify-center">
                                      <ModalExtendedWrapper>
                                        <ModalButton>
                                          <CancelIcon className="mx-auto" />
                                        </ModalButton>
                                        <ControlledModal>
                                          <Formik<CancelOrderDto>
                                            onSubmit={(data) => {
                                              CancelOrder(data);
                                            }}
                                            initialValues={{
                                              orderId,
                                              cancelationReason: "",
                                              get: "money",
                                              for: "full",
                                            }}
                                            validationSchema={
                                              ReturnDeclineRequestValidationSchema
                                            }
                                          >
                                            {({ setFieldValue, values }) => (
                                              <Form className="flex w-full items-center flex-col gap-4">
                                                <p className="font-bold text-xl">
                                                  {t(
                                                    "Refund Request For Order"
                                                  )}{" "}
                                                  #{orderId}
                                                </p>
                                                <div className="flex gap-2 whitespace-nowrap">
                                                  {t("Paid")}{" "}
                                                  <PriceDisplay price={price} />{" "}
                                                  {t("on")}{" "}
                                                  {orderDate
                                                    ? `${orderDate.month_long} ${orderDate.day}, ${orderDate.year_num}`
                                                    : null}
                                                </div>
                                                <div className="grid grid-cols-3 gap-4 w-full">
                                                  <p>
                                                    {t("I would like to get")}
                                                  </p>
                                                  <div className="flex col-span-2 flex-col gap-2">
                                                    <Radio
                                                      checked={
                                                        values.get === "money"
                                                      }
                                                      onChange={(e) =>
                                                        e.target.checked
                                                          ? setFieldValue(
                                                              "get",
                                                              "money"
                                                            )
                                                          : null
                                                      }
                                                    >
                                                      {t("My money back")}
                                                    </Radio>

                                                    <Radio
                                                      checked={
                                                        values.get === "credit"
                                                      }
                                                      onChange={(e) =>
                                                        e.target.checked
                                                          ? setFieldValue(
                                                              "get",
                                                              "credit"
                                                            )
                                                          : null
                                                      }
                                                    >
                                                      {t(
                                                        "Credit note for future purchase"
                                                      )}
                                                    </Radio>
                                                  </div>
                                                  <p>{t("For")}</p>
                                                  <div className="flex flex-col col-span-2 gap-2">
                                                    <Radio
                                                      checked={
                                                        values.for === "full"
                                                      }
                                                      onChange={(e) =>
                                                        e.target.checked
                                                          ? setFieldValue(
                                                              "for",
                                                              "full"
                                                            )
                                                          : null
                                                      }
                                                    >
                                                      {t("Full amount")}
                                                    </Radio>
                                                    <Radio
                                                      checked={
                                                        values.for === "partial"
                                                      }
                                                      onChange={(e) =>
                                                        e.target.checked
                                                          ? setFieldValue(
                                                              "for",
                                                              "partial"
                                                            )
                                                          : null
                                                      }
                                                      className="whitespace-nowrap"
                                                    >
                                                      <p className="whitespace-nowrap">
                                                        {t("Partial amount of")}{" "}
                                                      </p>
                                                      {values.for ===
                                                      "partial" ? (
                                                        <Input
                                                          value={values.amount}
                                                          type={"number"}
                                                          onChange={(e) =>
                                                            setFieldValue(
                                                              "amount",
                                                              e.target.value
                                                            )
                                                          }
                                                        />
                                                      ) : null}
                                                    </Radio>
                                                  </div>
                                                  <p>{t("Because")}</p>
                                                  <FormikInput
                                                    containerProps={{
                                                      className: "col-span-2",
                                                    }}
                                                    name="cancelationReason"
                                                    as={Textarea}
                                                  />
                                                </div>
                                                <ModalFooter>
                                                  <ModalCloseButton>
                                                    <Button
                                                      loading={
                                                        orderCancelationLoading
                                                      }
                                                    >
                                                      {t("Send my request")}
                                                    </Button>
                                                  </ModalCloseButton>
                                                  <Button colorScheme="white">
                                                    {t("Cancel")}
                                                  </Button>
                                                </ModalFooter>
                                              </Form>
                                            )}
                                          </Formik>
                                        </ControlledModal>
                                      </ModalExtendedWrapper>
                                    </div>
                                  </Td>
                                ) : null}
                              </Tr>
                            );
                          })}
                      </TBody>
                      <OrderDetailsModal />
                    </Table>
                  </TableContainer>
                );
              }}
            </TabItem>
          </>
        ))}
      </Tabs>
    </div>
  );
};

const OrdersTabs: {
  tabName: TranslationTextType;
  filter: OrdersFilter;
}[] = [
  {
    tabName: {
      translationKey: "all_orders",
      fallbackText: "All Orders",
    },
    filter: "all",
  },
  {
    tabName: {
      translationKey: "completed",
      fallbackText: "Completed",
    },
    filter: "completed",
  },
  {
    tabName: {
      translationKey: "continuing",
      fallbackText: "Continuing",
    },
    filter: "continuing",
  },
  {
    tabName: {
      translationKey: "restitute",
      fallbackText: "Restitute",
    },
    filter: "restitue",
  },
  {
    tabName: {
      translationKey: "canceled",
      fallbackText: "Canceled",
    },
    filter: "canceled",
  },
];

export const statusOptions: FormOptionType[] = [
  {
    name: {
      translationKey: "active",
      fallbackText: "Active",
    },
    value: "active",
  },
  {
    name: {
      translationKey: "pending",
      fallbackText: "Pending",
    },
    value: "pending",
  },
];
type OrderInfoData = {
  orderId: string;
  orderStatus: string;
  productsNum: number;
  total: PriceType;
  customer: string;
  dateAdded: string;
};

const orders: OrderInfoData[] = [...Array(10)].map(() => ({
  customer: "customer",
  dateAdded: new Date(Date.now()).toDateString(),
  orderId: `${randomNum(100000)}`,
  orderStatus: "confirmed",
  productsNum: randomNum(10),
  total: {
    amount: randomNum(5000),
    currency: "USD",
  },
}));
