import { CancelOrderDto, declineReturnRequestDto } from "dto";
import { Formik, Form } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { FormOptionType, OrdersFilter, TranslationTextType } from "types";
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
} from "ui";
import { useGetOrdersHistoryQuery, useCancelOrderMutation } from "ui/Hooks";
import { ReturnDeclineRequestValidationSchema } from "validation";

export interface OrdersListProps {}

export const OrdersList: React.FC<OrdersListProps> = () => {
  const { viewOrder } = React.useContext(OrderContext);
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
                      ThProps={{ className: "first:text-left first:pl-2" }}
                      TdProps={{ className: "first:text-left first:pl-2" }}
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
                                              loading={orderCancelationLoading}
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
