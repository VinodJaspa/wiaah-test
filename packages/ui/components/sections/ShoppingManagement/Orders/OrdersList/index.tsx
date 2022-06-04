import { CancelOrderDto } from "dto";
import { Formik, Form } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { BiCalendarEdit } from "react-icons/bi";
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
  Accordion,
  AccordionButton,
  AccordionItem,
  Pagination,
  Menu,
  MenuButton,
  MenuList,
  Select,
  SelectOption,
  AccordionPanel,
  DateInput,
} from "ui";
import { useGetOrdersHistoryQuery, useCancelOrderMutation } from "ui/Hooks";
import { randomNum } from "utils";
import { ReturnDeclineRequestValidationSchema } from "validation";

export interface OrdersListProps {}

export const OrdersList: React.FC<OrdersListProps> = () => {
  const { viewOrder, shopping } = React.useContext(OrderContext);
  const { t } = useTranslation();
  console.log(shopping);
  return (
    <div className="flex flex-col gap-4">
      <SectionHeader sectionTitle={t("orders", "Orders")} />
      {shopping ? (
        <Tabs>
          <TabsHeader />
          <InputGroup>
            <InputLeftElement>
              <SearchIcon />
            </InputLeftElement>
            <Input
              placeholder={`${t(
                "search_for_order_id",
                "Search for order ID"
              )}, ${t("customer", "customer")}, ${t(
                "order_status",
                "Order Status"
              )}, ${t("or", "Or")} ${t("something", "something")}`}
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
                  const [selectedOrder, setSelectedOrder] =
                    React.useState<string>();
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
                          className:
                            "first:text-left first:pl-2 border-gray-300 border-[1px] border-collapse",
                        }}
                        className="w-full"
                      >
                        <Tr>
                          <Th>{t("order_id", "Order ID")}</Th>
                          <Th>{t("customer", "Customer")}</Th>
                          <Th>{t("order", "Order")}</Th>
                          <Th>{t("delivery_date", "Delivery Date")}</Th>
                          <Th>{t("delivery_pricing", "Delivery Pricing")}</Th>
                          <Th>{t("delivery_status", "Delivery Status")}</Th>
                          <Th>{t("payment", "Payment")}</Th>
                          <Th>{t("action", "Action")}</Th>
                        </Tr>
                        <TBody>
                          {orders &&
                            orders.map(
                              (
                                {
                                  customer,
                                  orderId,
                                  orderDeliveryDate,
                                  orderDeliveryPricing,
                                  orderDeliveryStatus,
                                  orderName,
                                  payment,
                                },
                                i
                              ) => (
                                <Tr className="cursor-pointer" key={i}>
                                  <Td onClick={() => viewOrder(orderId)}>
                                    {orderId}
                                  </Td>
                                  <Td onClick={() => viewOrder(orderId)}>
                                    {customer}
                                  </Td>
                                  <Td onClick={() => viewOrder(orderId)}>
                                    {orderName}
                                  </Td>
                                  <Td onClick={() => viewOrder(orderId)}>
                                    {new Date(
                                      orderDeliveryDate
                                    ).toLocaleDateString("en", {
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "numeric",
                                    })}
                                  </Td>
                                  <Td onClick={() => viewOrder(orderId)}>
                                    <PriceDisplay
                                      priceObject={orderDeliveryPricing}
                                    />
                                  </Td>
                                  <Td onClick={() => viewOrder(orderId)}>
                                    <OrderStatusDisplay
                                      className="w-fit capitalize mx-auto"
                                      status={orderDeliveryStatus}
                                    />
                                  </Td>
                                  <Td onClick={() => viewOrder(orderId)}>
                                    {payment}
                                  </Td>
                                  <Td>
                                    <ModalExtendedWrapper>
                                      <ModalButton>
                                        <div className="w-full flex justify-center">
                                          <CancelIcon className="mx-auto" />
                                        </div>
                                      </ModalButton>
                                      <ControlledModal>
                                        <Formik<CancelOrderDto>
                                          onSubmit={(data) => {
                                            CancelOrder(data);
                                          }}
                                          initialValues={{
                                            orderId,
                                            cancelationReason: "",
                                          }}
                                          validationSchema={
                                            ReturnDeclineRequestValidationSchema
                                          }
                                        >
                                          <Form className="flex flex-col gap-4">
                                            <FormikInput
                                              label={t(
                                                "cancelation_reason",
                                                "Cancelation Reason"
                                              )}
                                              as={Textarea}
                                              className="min-h-[10rem]"
                                              name="cancelationReason"
                                            />
                                            <ModalFooter>
                                              <ModalCloseButton>
                                                <Button colorScheme="white">
                                                  {t("close", "Close")}
                                                </Button>
                                              </ModalCloseButton>
                                              <Button
                                                loading={
                                                  orderCancelationLoading
                                                }
                                                type="submit"
                                              >
                                                {t("submit", "Submit")}
                                              </Button>
                                            </ModalFooter>
                                          </Form>
                                        </Formik>
                                      </ControlledModal>
                                    </ModalExtendedWrapper>
                                  </Td>
                                </Tr>
                              )
                            )}
                        </TBody>
                      </Table>
                    </TableContainer>
                  );
                }}
              </TabItem>
            </>
          ))}
        </Tabs>
      ) : (
        <>
          <div>
            <Formik initialValues={{}} onSubmit={() => {}}>
              {({}) => {
                return (
                  <Form className="grid grid-cols-3 gap-4">
                    <FormikInput
                      placeholder={t("order_id", "Order ID")}
                      name="orderId"
                    />
                    <FormikInput
                      placeholder={t("payment_mothed", "Payment Mothed")}
                      name="paymentMothed"
                    />
                    <FormikInput
                      as={Select}
                      placeholder={t("status", "Status")}
                      name="status"
                    >
                      {statusOptions.map((opt, i) => (
                        <SelectOption value={opt.value}>
                          <TranslationText translationObject={opt.name} />
                        </SelectOption>
                      ))}
                    </FormikInput>
                    <div className="flex items-center gap-2">
                      <FormikInput
                        placeholder={t("added_date", "Added Date")}
                        name="DateAdded"
                      />
                      <Menu>
                        <MenuButton>
                          <BiCalendarEdit />
                        </MenuButton>
                        <MenuList className="origin-top-left left-0">
                          <DateInput />
                        </MenuList>
                      </Menu>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
          <div className="flex flex-col gap-4">
            {orders.map((order, i) => (
              <Accordion controled key={i}>
                <AccordionItem itemkey={i + 1}>
                  <AccordionButton>
                    <div className="p-2 cursor-pointer bg-primary text-white flex w-full justify-between">
                      <span>
                        {t("order_id", "Order ID")}: {order.orderId}
                      </span>
                      <span>
                        {t("status", "Status")}: {order.orderStatus}
                      </span>
                    </div>
                  </AccordionButton>
                  <AccordionPanel>
                    <div className="flex items-center justify-between w-full">
                      <div className="font-bold w-3/4 grid grid-cols-2 gap-2 py-2">
                        <span>
                          {t("date_added", "Date Added")}:{" "}
                          <span className="font-normal">{order.dateAdded}</span>
                        </span>
                        <span>
                          {t("customer", "Customer")}:{" "}
                          <span className="font-normal">{order.customer}</span>
                        </span>
                        <span>
                          {t("products", "Products")}:{" "}
                          <span className="font-normal">
                            {order.productsNum}
                          </span>
                        </span>
                        <span className="flex gap-1">
                          {t("total", "Total")}:{" "}
                          <span className="font-normal">
                            <PriceDisplay priceObject={order.total} />
                          </span>
                        </span>
                      </div>
                      <Button
                        onClick={() => {
                          viewOrder(order.orderId);
                        }}
                        className="h-fit"
                      >
                        {t("view_more", "View More")}
                      </Button>
                    </div>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
          <Pagination maxPages={15} />
        </>
      )}
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
