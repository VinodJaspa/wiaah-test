import React from "react";
import { useTranslation } from "react-i18next";
import {
  Modal,
  ModalContent,
  ModalOverlay,
  useGetOrderDetailsQuery,
  SpinnerFallback,
  Stack,
  Divider,
  Button,
  PriceDisplay,
  PdfIcon,
  TargetCursorIcon,
  MessageWriteIcon,
  CreditCardIcon,
  RateFeedBackModal,
} from "@UI";
import { DateDetails } from "utils";

import { useScreenWidth } from "hooks";
import { IoHeartOutline } from "react-icons/io5";
import {
  EllipsisText,
  Prefix,
  UnDiscountedPriceDisplay,
  BoldText,
  CashbackBadge,
  Radio,
  Table,
  TBody,
  Tr,
  Td,
  AspectRatioImage,
} from "@UI";
import { setTestid } from "utils";
import { useTypedReactPubsub } from "@libs";

export interface OrderDetailsModalProps { }

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = () => {
  const [id, setId] = React.useState<string>();
  const { Listen } = useTypedReactPubsub((keys) => keys.openOrderDetailsModal);
  const {
    data: res,
    isLoading,
    isError,
  } = useGetOrderDetailsQuery(id || "", { enabled: !!id });
  Listen((props) => {
    if ("id" in props) {
      setId(props.id);
    } else {
      setId(undefined);
    }
  });
  const orderDate = DateDetails(res ? res.order.createdAt : "");
  const deliveryDate = DateDetails(
    res
      ? res.order.shipping.deliveryTimeRange.from -
      res.order.shipping.deliveryTimeRange.to
      : ""
  );
  const subtotal = res
    ? res.order.orderItem.products.reduce((acc, curr) => {
      return acc + curr.price * curr.qty;
    }, 0)
    : 0;
  const discountCost = res
    ? subtotal * (res.order.orderItem.discount! / 100)
    : 0;
  const deliveryCost = res ? res.order.shipping.cost : 0;
  const tax = res ? res.order.orderItem.products[0].vat : 0;
  const total = subtotal - discountCost + deliveryCost + tax;
const { t } = useTranslation();

  const { min } = useScreenWidth({ minWidth: 900 });

  function handleMoveToWishList() { }
  function handleItemDeletion() { }

  return (
    <Modal isOpen={!!id} onClose={() => setId(undefined)} onOpen={() => { }}>
      <ModalOverlay />
      <ModalContent className="w-[min(100%,50rem)]">
        <SpinnerFallback isLoading={isLoading} isError={isError}>
          {res ? (
            <Stack col divider={<Divider />}>
              <div className="flex flex-col w-full gap-2">
                <div className="flex justify-between items-center">
                  <p className="text-2xl font-bold">
                    {t("Order ID")}: {res.order.id}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      className="flex gap-1 items-center"
                      colorScheme="white"
                    >
                      <PdfIcon /> {t("Invoice")}
                    </Button>
                    <Button className="flex gap-1 items-center">
                      <TargetCursorIcon /> {t("Track order")}
                    </Button>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="flex gap-2">
                    <p className="text-gray-500">{t("Order date")}:</p>
                    <p className="font-semibold">
                      {orderDate
                        ? `${orderDate.month_short} ${orderDate.day}, ${orderDate.year_num}`
                        : null}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <p className="text-primary">
                      {t("Estimated delivery")}:{" "}
                      {deliveryDate
                        ? `${deliveryDate.month_short} ${deliveryDate.day}, ${deliveryDate.year_num}`
                        : null}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {res?.order?.orderItem.products.map(
                  (
                    {
                      cashback,
                      colors,
                      description,
                      discount,
                      id,
                      title,
                      price,
                      shippingDetails,
                      sizes,
                      qty,
                      thumbnail,
                    },
                    i
                  ) => (
                    <div key={i} className="flex w-full">
                      <div className="flex flex-col w-full">
                        <div
                          className={`${min ? "flex-col" : "flex-row"
                            } flex w-full gap-4 justify-between`}
                        >
                          <div
                            className={`${min ? "flex-col" : "flex-row"
                              } flex w-full gap-4`}
                          >
                            <div
                              className={`${min ? "w-full" : ""
                                } flex justify-center`}
                            >
                              <div className="relative w-40">
                                <AspectRatioImage
                                  src={thumbnail}
                                  alt={title[0].value}
                                  ratio={6 / 4}
                                />
                              </div>
                            </div>
                            <div className="flex flex-col justify-between">
                              <div className="flex  justify-between">
                                <div className="flex flex-col">
                                  <span id="ProductName" className="font-bold">
                               {title[0].value}
                                  </span>
                                  <EllipsisText maxLines={1}>
                                    {description[0].value}
                                  </EllipsisText>
                                  <div>
                                    {colors[0] && (
                                      <p id="ProductColor">
                                        {t("Color")}: {colors[0]}
                                      </p>
                                    )}
                                    {sizes[0] && (
                                      <p id="ProductSize">
                                        {t("Size")}: {sizes[0]}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div
                                  className={`${min ? "items-start" : "items-end"
                                    } flex flex-col`}
                                >
                                  <div className="flex gap-2">
                                    <BoldText>
                                      <UnDiscountedPriceDisplay
                                        id="ProductOldPrice"
                                        amount={price}
                                        discount={discount.amount}
                                      />
                                    </BoldText>
                                    <BoldText>
                                      <PriceDisplay price={price} />
                                    </BoldText>
                                  </div>
                                  {discount && (
                                    <p
                                      className="text-[#ff0000] whitespace-nowrap"
                                      id="ProductDiscount"
                                    >
                                      <span>
                                        {t("You Save")} %{discount.amount}
                                      </span>
                                    </p>
                                  )}
                                </div>
                              </div>

                              <Table
                                TdProps={{ className: "py-1 px-0" }}
                                className="text-xs"
                              >
                                <TBody>
                                  {Array.isArray(shippingDetails?.shippingTypes)
                                    ? shippingDetails?.shippingTypes.map(
                                      (method) => (
                                        <Tr>
                                          <Td>
                                            <Radio
                                              name={`shippingMethod-${id}`}
                                              value={method.toString()}
                                            >
                                              {method.toString()}
                                            </Radio>
                                          </Td>
                                          <Td>
                                            <PriceDisplay
                                              price={res.order.shipping.cost}
                                            />
                                          </Td>
                                          <Td>
                                            <p>
                                              {t("Available in")}{" "}
                                              {
                                                res.order.shipping
                                                  .deliveryTimeRange.from
                                              }{" "}
                                              -{" "}
                                              {
                                                res.order.shipping
                                                  .deliveryTimeRange.to
                                              }{" "}
                                              {t("Days")}
                                            </p>
                                          </Td>
                                        </Tr>
                                      )
                                    )
                                    : null}
                                </TBody>
                              </Table>

                              <div className="flex items-end gap-1 justify-between">
                                <p className="text-xs">
                                  <div className="flex items-center w-fit gap-4">
                                    <div
                                      className="cursor-pointer"
                                      id="MoveToWishListButton"
                                      onClick={handleMoveToWishList}
                                      {...setTestid("MoveToWishlistBtn")}
                                    >
                                      <Prefix Prefix={<IoHeartOutline />}>
                                        {t("Move to wish list")}
                                      </Prefix>
                                    </div>
                                    <div
                                      className="cursor-pointer"
                                      id="GiveFeedBack"
                                      {...setTestid("GiveFeedBackBtn")}
                                      onClick={handleItemDeletion}
                                    >
                                      <Prefix Prefix={<MessageWriteIcon />}>
                                        {t("Give Feedback")}
                                      </Prefix>
                                    </div>
                                  </div>
                                </p>
                                <div className="flex flex-col text-xs items-end gap-1">
                                  <p id="ProductQty">
                                    {qty} {t("Units")}
                                  </p>
                                  {cashback && <CashbackBadge {...cashback} />}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
              <RateFeedBackModal variant="product" />
              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col w-full gap-2">
                  <p className="text-xl font-bold">{t("Payment")}</p>
                  <div className="flex gap-2 items-center text-lg">
                    {res ? res.payment.method || "" : ""}{" "}
                    {res ? res.payment.value || "" : ""} <CreditCardIcon />
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <p className="text-xl font-bold">{t("Order Summary")}</p>
                  <div className="flex justify-between gap-2">
                    <p className="text-lg font-semibold">{t("Subtotal")}</p>
                    <PriceDisplay price={subtotal} />
                  </div>
                  <div className="flex justify-between gap-2">
                    <p>{t("Discount")}</p>
                    <div className="flex gap-2">
                      <p>{`(${res.order.orderItem.products[0].discount}%)`}</p>
                      -
                      <PriceDisplay price={subtotal} />
                    </div>
                  </div>
                  <div className="flex justify-between gap-2">
                    <p>{t("Delivery")}</p>
                    <PriceDisplay price={deliveryCost} />
                  </div>
                  <div className="flex justify-between gap-2">
                    <p>{t("Tax")}</p>
                    <PriceDisplay price={tax} />
                  </div>
                  <Divider />
                  <div className="flex justify-between items-center text-2xl font-bold">
                    <p>{t("Total")}</p>
                    <PriceDisplay price={total} />
                  </div>
                </div>
                <div></div>
                <div className="flex flex-col w-full gap-2">
                  <p className="text-xl font-bold">{t("Delivery")}</p>
                  <div className="flex flex-col gap-1">
                    <p className="text-gray-400">{t("Address")}</p>
                    <div className="flex flex-col">
                      <p>{res.order.shipping.location.address}</p>
                      <p>
                        {res.order.shipping.location.city}{" "}
                        {res.order.shipping.location.country}
                      </p>
                      <p>{res.order.shipping.location.postalCode}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Stack>
          ) : null}
        </SpinnerFallback>
      </ModalContent>
    </Modal>
  );
};
