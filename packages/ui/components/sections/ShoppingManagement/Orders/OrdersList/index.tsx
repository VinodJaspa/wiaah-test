import { Formik, Form } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
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
  ModalButton,
  ModalCloseButton,
  ModalExtendedWrapper,
  ModalFooter,
  Textarea,
  CancelIcon,
  Radio,
  EyeIcon,
  LinkIcon,
  Pagination,
  Modal,
  ModalContent,
  ModalOverlay,
  Divider,
  HStack,
  NotAllowedIcon,
  Badge,
  Stack,
} from "@partials";

import { OrderContext, SectionHeader, UpdateProductStatusModal } from "@UI";
import { FormikInput, usePaginationControls } from "@blocks";

import { AddToDate, DateDetails, mapArray } from "utils";
import { ReturnDeclineRequestValidationSchema } from "validation";
import { useTypedReactPubsub } from "@libs";
import { useAskForRefundMutation, useGetMyOrdersQuery } from "@features/Orders";
import { OrderStatusEnum, RefundType } from "@features/API";
import { useResponsive } from "@UI/../hooks";

export interface OrdersListProps { }

export const OrdersList: React.FC<OrdersListProps> = () => {
  const [filter, setFilter] = React.useState<OrderStatusEnum>();
  const { emit: openOrderDetailsModal } = useTypedReactPubsub(
    (keys) => keys.openOrderDetailsModal
  );
  const { isMobile } = useResponsive();
  const { visit } = useRouting();
  const shopping = React.useContext(OrderContext);
  const { pagination, controls } = usePaginationControls();
  const { data: orders } = useGetMyOrdersQuery({
    status: filter,
    pagination,
  });
  const { t } = useTranslation();

  const [refundOrderId, setRefundOrderId] = React.useState<string>();
  const { mutate, isLoading: RefundLoading } = useAskForRefundMutation();

  return isMobile ? (
    <div className="flex flex-col gap-4">
      <SectionHeader sectionTitle={t("Orders")}></SectionHeader>
      <InputGroup>
        <InputLeftElement>
          <SearchIcon />
        </InputLeftElement>
        <Input
          placeholder={t("Search for order id, customer, order status")}
        ></Input>
      </InputGroup>
      <Stack
        divider={<Divider />}
        className="flex flex-col w-full h-full overflow-y-scroll noScroll gap-4"
      >
        {mapArray(orders, (order, i) => (
          <div
            key={order.id + i}
            className="flex shadow px-2 py-4 flex-col w-full"
          >
            <HStack className="justify-between">
              <div className="flex flex-col gap-2">
                <HStack>
                  <p className="text-sm font-medium">{t("Seller name")}: </p>
                  <span className="font-semibold">
                    {order.seller?.profile?.username}
                  </span>
                </HStack>
                <HStack>
                  <p className="text-sm font-medium">{t("Order ID")}: </p>
                  <span className="font-semibold">{order.id}</span>
                </HStack>
              </div>
              <Badge
                value={order.status.of}
                cases={{
                  fail: [OrderStatusEnum.Canceled],
                  success: OrderStatusEnum.Compeleted,
                }}
              />
            </HStack>

            <Divider className="my-3" />

            <HStack>
              <p className="text-sm font-medium">{t("Delivery pricing")}: </p>
              <span className="font-bold">
                <PriceDisplay price={order.paid} />
              </span>
            </HStack>
            <HStack>
              <p className="text-sm font-medium">{t("Payment")}: </p>
              <span className="font-bold">
                <PriceDisplay price={order.paid} />
              </span>
            </HStack>

            <HStack className="mt-6 gap-8">
              <button>
                <HStack>
                  <p className="inline text-sm">{t("Tracking")}: </p>
                  <LinkIcon className="text-base" />
                </HStack>
              </button>
              <button>
                <HStack>
                  <p className="text-sm">{t("View")}: </p>
                  <EyeIcon className="text-base" />
                </HStack>
              </button>
              <button>
                <HStack>
                  <p className="text-sm">{t("Action")}: </p>
                  <NotAllowedIcon className="text-base" />
                </HStack>
              </button>
            </HStack>
          </div>
        ))}
      </Stack>
    </div>
  ) : (
    <div className="flex flex-col gap-4">
      <SectionHeader sectionTitle={t("Orders")} />
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
      <div className="flex gap-2 items-center">
        {Object.values(OrderStatusEnum).map((value, i) => (
          <>
            <div onClick={() => setFilter(value)} className="px-4 py-2">
              <TranslationText
                className={`${filter === value
                    ? "text-primary border-b-2 border-primary"
                    : ""
                  }`}
                translationObject={value}
              />
            </div>
          </>
        ))}
      </div>

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
                const { shipping, createdAt, status, id, seller, buyer, paid } =
                  props;
                const date = AddToDate(createdAt, {
                  days: shipping.deliveryTimeRange.to,
                });
                function handleGoToTrackingLink(link: string) { }
                return (
                  <Tr className="cursor-pointer" key={i}>
                    <Td>{id}</Td>
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
                          {seller?.profile.username}
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
                          {buyer?.profile.username}
                        </p>
                      )}
                    </Td>
                    <Td>
                      {new Date(date).toLocaleDateString("en", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </Td>
                    <Td>
                      <PriceDisplay price={shipping.cost} />
                    </Td>
                    <Td>
                      <OrderStatusDisplay
                        className="w-fit capitalize mx-auto"
                        status={status.of}
                      />
                    </Td>
                    <Td>{shipping.cost}</Td>
                    <Td>
                      <div className="flex w-full justify-center">
                        <EyeIcon
                          onClick={() =>
                            openOrderDetailsModal({
                              id: id,
                            })
                          }
                        />
                      </div>
                    </Td>
                    <Td>
                      <ModalExtendedWrapper>
                        <ModalButton>
                          <LinkIcon
                            onClick={() => {
                              shopping
                                ? handleGoToTrackingLink(
                                  props.trackingLink || ""
                                )
                                : null;
                            }}
                          />
                        </ModalButton>
                        {shopping ? null : (
                          <UpdateProductStatusModal
                            productId={id}
                            status="confirmed"
                            trackingLink="test"
                          />
                        )}
                      </ModalExtendedWrapper>
                    </Td>
                    {shopping ? (
                      <Td>
                        <div className="w-full flex justify-center">
                          <CancelIcon
                            onClick={() => setRefundOrderId(id)}
                            className="mx-auto"
                          />
                        </div>
                      </Td>
                    ) : null}
                  </Tr>
                );
              })}
          </TBody>
        </Table>
      </TableContainer>
      <Pagination controls={controls} />
      <Modal
        isOpen={!!refundOrderId}
        onClose={() => setRefundOrderId(undefined)}
      >
        <ModalOverlay />
        <ModalContent>
          <Formik<Parameters<typeof mutate>[0]>
            onSubmit={(data) => {
              mutate(data);
            }}
            initialValues={{
              reason: "",
              type: RefundType.Money,
              fullAmount: true,
              amount: 0,
              opened: false,
              orderItemId: refundOrderId || "",
              qty: 0,
            }}
            validationSchema={ReturnDeclineRequestValidationSchema}
          >
            {({ setFieldValue, values }) => {
              const order = orders?.find((v) => v.id === refundOrderId);
              const date = AddToDate(order?.createdAt, {
                days: order?.shipping.deliveryTimeRange.to,
              });
              const orderDate = DateDetails(date);
              return (
                <Form className="flex w-full items-center flex-col gap-4">
                  <p className="font-bold text-xl">
                    {t("Refund Request For Order")} #{order?.id}
                  </p>
                  <div className="flex gap-2 whitespace-nowrap">
                    {t("Paid")} <PriceDisplay price={order?.paid} /> {t("on")}{" "}
                    {orderDate
                      ? `${orderDate.month_long} ${orderDate.day}, ${orderDate.year_num}`
                      : null}
                  </div>
                  <div className="grid grid-cols-3 gap-4 w-full">
                    <p>{t("I would like to get")}</p>
                    <div className="flex col-span-2 flex-col gap-2">
                      <Radio
                        checked={values.type === RefundType.Money}
                        onChange={(e) =>
                          e.target.checked
                            ? setFieldValue("type", RefundType.Money)
                            : null
                        }
                      >
                        {t("My money back")}
                      </Radio>

                      <Radio
                        checked={values.type === RefundType.Credit}
                        onChange={(e) =>
                          e.target.checked
                            ? setFieldValue("type", RefundType.Credit)
                            : null
                        }
                      >
                        {t("Credit note for future purchase")}
                      </Radio>
                    </div>
                    <p>{t("For")}</p>
                    <div className="flex flex-col col-span-2 gap-2">
                      <Radio
                        checked={values.fullAmount || false}
                        onChange={(e) =>
                          e.target.checked
                            ? setFieldValue("fullAmount", true)
                            : null
                        }
                      >
                        {t("Full amount")}
                      </Radio>
                      <Radio
                        checked={!values.fullAmount}
                        onChange={(e) =>
                          e.target.checked
                            ? setFieldValue("fullAmount", false)
                            : null
                        }
                        className="whitespace-nowrap"
                      >
                        <p className="whitespace-nowrap">
                          {t("Partial amount of")}{" "}
                        </p>
                        {values.fullAmount ? null : (
                          <Input
                            value={values.amount?.toString()}
                            type={"number"}
                            onChange={(e) =>
                              setFieldValue("amount", parseInt(e.target.value))
                            }
                          />
                        )}
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
                      <Button type={"submit"} loading={RefundLoading}>
                        {t("Send my request")}
                      </Button>
                    </ModalCloseButton>
                    <Button
                      onClick={() => {
                        setRefundOrderId(undefined);
                      }}
                      colorScheme="white"
                    >
                      {t("Cancel")}
                    </Button>
                  </ModalFooter>
                </Form>
              );
            }}
          </Formik>
        </ModalContent>
      </Modal>
    </div>
  );
};
