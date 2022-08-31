import React from "react";
import { useTranslation } from "react-i18next";
import { FaCcVisa } from "react-icons/fa";
import { GrVisa } from "react-icons/gr";
import { useReactPubsub } from "react-pubsub";
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
  AspectRatioImage,
} from "ui";
import { DateDetails } from "utils";

export interface OrderDetailsModalProps {}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = () => {
  const [id, setId] = React.useState<string>();
  const { Listen } = useReactPubsub((keys) => keys.openOrderDetailsModal);
  const {
    data: res,
    isLoading,
    isError,
  } = useGetOrderDetailsQuery(id || "", { enabled: !!id });
  console.log({ id });
  Listen((props) => {
    if ("id" in props) {
      setId(props.id);
    } else {
      setId(undefined);
    }
  });
  const orderDate = DateDetails(res ? res.data.orderedDate : "");
  const deliveryDate = DateDetails(res ? res.data.deliveryDate : "");
  const subtotal = res
    ? res.data.products.reduce((acc, curr) => {
        return acc + curr.price * curr.qty;
      }, 0)
    : 0;
  const discountCost = res ? subtotal * (res.data.discount / 100) : 0;
  const deliveryCost = res ? res.data.deliveryCost : 0;
  const tax = res ? res.data.tax : 0;
  const total = subtotal - discountCost + deliveryCost + tax;
  const { t } = useTranslation();
  return (
    <Modal isOpen={!!id} onClose={() => setId(undefined)} onOpen={() => {}}>
      <ModalOverlay />
      <ModalContent>
        <SpinnerFallback isLoading={isLoading} isError={isError}>
          {res ? (
            <Stack col divider={Divider}>
              <div className="flex flex-col w-full gap-2">
                <div className="flex justify-between items-center">
                  <p className="text-2xl font-bold">
                    {t("Order ID")}: {res.data.orderId}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button colorScheme="white">{t("Invoice")}</Button>
                    <Button>{t("Track order")}</Button>
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
                {res.data.products.map((prod, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex gap-4">
                      <div className="w-20 rounded overflow-hidden">
                        <AspectRatioImage
                          src={prod.thumbnail}
                          alt={prod.name}
                          ratio={3 / 5}
                        />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-lg font-semibold">{prod.name}</p>
                        <p className="flex gap-8 text-gray-400">
                          {prod.props.map((prop) => prop)}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      <PriceDisplay className="font-bold" price={prod.price} />
                      <p>
                        {t("Qty")}: {prod.qty}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col w-full gap-2">
                  <p className="text-xl font-bold">{t("Payment")}</p>
                  <div className="flex gap-2 items-center">
                    Visa **56 <FaCcVisa />{" "}
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
                      <p>{`(${res.data.discount}%)`}</p>
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
                      <p>{res.data.deliveryAddress.address}</p>
                      <p>
                        {res.data.deliveryAddress.city}{" "}
                        {res.data.deliveryAddress.country}
                      </p>
                      <p>{res.data.phoneNumber}</p>
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
