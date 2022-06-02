import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { BiCalendarEdit } from "react-icons/bi";
import { FormOptionType, PriceType } from "types";
import { DateInput, FormikInput } from "ui";
import { randomNum } from "ui/components/helpers";
import {
  Menu,
  MenuButton,
  Select,
  SelectOption,
  TranslationText,
  MenuList,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  PriceDisplay,
  Button,
  OrderContext,
  Pagination,
  SectionHeader,
} from "ui";

export interface OrdersListProps {}

export const OrdersList: React.FC<OrdersListProps> = () => {
  const { viewOrder } = React.useContext(OrderContext);
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4">
      <SectionHeader sectionTitle={t("orders", "Orders")} />
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
                    <SelectOption key={i} value={opt.value}>
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
              <AccordionButton className="text-white text-lg">
                <div className="p-2 cursor-pointer pr-8 bg-primary text-white flex w-full justify-between">
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
                      <span className="font-normal">{order.productsNum}</span>
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
    </div>
  );
};

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
