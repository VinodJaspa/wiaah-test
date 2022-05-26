import { Formik, Form } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { BiCalendarEdit } from "react-icons/bi";
import { PriceType } from "types";
import { DateInput, FormikInput, OrderContext } from "ui";
import {
  Divider,
  Menu,
  MenuButton,
  MenuList,
  Select,
  SelectOption,
  TranslationText,
} from "ui";
import { getRandomImage } from "ui/placeholder";
import { randomNum } from "ui/components/helpers";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Button,
  PriceDisplay,
  Table,
  TBody,
  Td,
  Th,
  Tr,
} from "ui";
import { statusOptions } from "ui";

export const OrderDetailsSection: React.FC = () => {
  const { orderId, cancelViewOrder } = React.useContext(OrderContext);
  const { t } = useTranslation();

  const order = {
    customer: "customer",
    dateAdded: new Date(Date.now()).toDateString(),
    orderId: `${randomNum(100000)}`,
    orderStatus: "confirmed",
    paymentMoted: "stripe",
    productsNum: randomNum(10),
    total: {
      amount: randomNum(5000),
      currency: "USD",
    },
    shippingDetails: {
      name: "name",
      address: "address",
      zipCode: "1234",
      city: "city",
      country: "country",
    },
    products,
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-4xl font-bold">{t("orders", "Orders")}</span>

          <div className="flex gap-2 items-center">
            <Button onClick={cancelViewOrder}>{t("go_back", "Go Back")}</Button>
            <Button>{t("download_pdf", "Download PDF")}</Button>
          </div>
        </div>
        <Divider className="border-primary" />
      </div>
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
                  placeholder={t("status,Status")}
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
                    placeholder={t("order_id", "Order ID")}
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
      <Divider />
      <div>
        <Accordion>
          <div className="flex flex-col gap-4">
            <AccordionItem itemkey={"1"}>
              <AccordionButton>
                <div className="p-2 cursor-pointer bg-primary text-white flex w-full justify-between">
                  <span>{t("order_id", "Order ID")}</span>
                </div>
              </AccordionButton>
              <AccordionPanel>
                <div className="font-bold shadow-lg grid grid-cols-2 gap-2 p-2">
                  <span>
                    {t("order_id", "Order ID")}:{" "}
                    <span className="font-normal">{order.orderId}</span>
                  </span>
                  <span>
                    {t("payment_mothed", "Payment Mothed")}:{" "}
                    <span className="font-normal">{order.paymentMoted}</span>
                  </span>
                  <span>
                    {t("date_added", "Date Added")}:{" "}
                    <span className="font-normal">{order.dateAdded}</span>
                  </span>
                </div>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem itemkey={"2"}>
              <AccordionButton>
                <div className="p-2 cursor-pointer bg-primary text-white flex w-full justify-between">
                  <span>{t("shipping_details", "Shipping Details")}</span>
                </div>
              </AccordionButton>
              <AccordionPanel>
                <div className="font-bold shadow-lg flex flex-col gap-2 p-2">
                  <span>
                    {t("name", "Name")}:{" "}
                    <span className="font-normal">
                      {order.shippingDetails.name}
                    </span>
                  </span>
                  <span>
                    {t("address", "Address")}:{" "}
                    <span className="font-normal">
                      {order.shippingDetails.address}
                    </span>
                  </span>
                  <span>
                    {t("zip_code", "Zip Code")}:{" "}
                    <span className="font-normal">
                      {order.shippingDetails.zipCode}
                    </span>
                  </span>
                  <span className="flex gap-1">
                    {t("city", "City")}:{" "}
                    <span className="font-normal">
                      {order.shippingDetails.city}
                    </span>
                  </span>
                  <span className="flex gap-1">
                    {t("country", "Country")}:{" "}
                    <span className="font-normal">
                      {order.shippingDetails.country}
                    </span>
                  </span>
                </div>
              </AccordionPanel>
            </AccordionItem>
          </div>
        </Accordion>
      </div>
      <div>
        <Table className="w-full">
          <Tr>
            <Th className="pl-0 text-left">
              {t("product_image", "Product Image")}
            </Th>
            <Th>{t("product_name", "Product Name")}</Th>
            <Th>{t("quantity", "Quantity")}</Th>
            <Th>{t("price", "Price")}</Th>
            <Th>{t("total", "Total")}</Th>
            <Th className="pr-0 text-right">{t("Status", "Status")}</Th>
          </Tr>
          <TBody>
            {order.products.map((prod, i) => (
              <Tr key={i}>
                <Td className="pl-0">
                  <img
                    className="w-16 h-auto"
                    src={prod.productImage}
                    alt={prod.productName}
                  />
                </Td>
                <Td>{prod.productName}</Td>
                <Td>{prod.quantity}</Td>
                <Td>
                  <PriceDisplay priceObject={prod.price} />
                </Td>
                <Td>
                  <PriceDisplay priceObject={prod.total} />
                </Td>
                <Td className="pr-0">
                  <div className="w-full flex justify-end">
                    <div className="px-4 py-2 w-fit rounded bg-primary text-white">
                      {prod.status}
                    </div>
                  </div>
                </Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      </div>
    </div>
  );
};

type ProductType = {
  productImage: string;
  productName: string;
  quantity: number;
  price: PriceType;
  total: PriceType;
  status: string;
};

const products: ProductType[] = [...Array(15)].map((_, i) => ({
  productImage: getRandomImage(),
  productName: `product ${i}`,
  quantity: randomNum(10),
  price: {
    amount: randomNum(50),
    currency: "USD",
  },
  total: {
    amount: randomNum(500),
    currency: "USD",
  },
  status: "confirmed",
}));
