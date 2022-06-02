import { Formik, Form } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { BiCalendarEdit } from "react-icons/bi";
import {
  DateInput,
  FormikInput,
  OrderContext,
  Divider,
  Menu,
  MenuButton,
  MenuList,
  Select,
  SelectOption,
  TranslationText,
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
  EditIcon,
  ModalExtendedWrapper,
  Modal,
  ModalContent,
  ModalButton,
  ModalCloseButton,
  statusOptions,
  HStack,
  ModalOverlay,
  CloseIcon,
  FailedIcon,
  CancelIcon,
} from "ui";
import { getRandomImage } from "placeholder";
import { randomNum } from "utils";
import { useModalDisclouser, useAccountType } from "hooks";
import { OrderedProductStatus, PriceType } from "types";
import { useUpdateProductStatus, useAddProductTrackingLink } from "ui";
import { AddProductTrackingLinkDto, UpdateProductStatusDto } from "api";

export const OrderDetailsSection: React.FC = () => {
  const { orderId, cancelViewOrder } = React.useContext(OrderContext);
  const { t } = useTranslation();
  const { isBuyer } = useAccountType();
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
              <AccordionButton className="text-lg text-white">
                <div className="p-2 cursor-pointer pr-8 bg-primary text-white flex w-full justify-between">
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
              <AccordionButton className="text-white text-lg">
                <div className="p-2 cursor-pointer pr-8 bg-primary text-white flex w-full justify-between">
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
            <Th>{t("Status", "Status")}</Th>
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
                  <ModalExtendedWrapper modalKey="1">
                    <ModalButton>
                      <Button>
                        {/* <div className="px-4 py-2 w-fit rounded bg-primary text-white"> */}
                        {isBuyer ? t("track", "Track") : prod.status}
                        {/* </div> */}
                      </Button>
                    </ModalButton>
                    {isBuyer ? (
                      <OrderTrackingLinkModal productId={prod.id} />
                    ) : null}
                  </ModalExtendedWrapper>
                </Td>
                <Td>
                  {isBuyer ? (
                    <>
                      <CancelIcon className="text-xl cursor-pointer" />
                    </>
                  ) : (
                    <ModalExtendedWrapper modalKey="34">
                      <ModalButton>
                        <EditIcon className="text-xl cursor-pointer" />
                      </ModalButton>
                      <UpdateProductStatusModal
                        status={prod.status}
                        productId={prod.id}
                      />
                    </ModalExtendedWrapper>
                  )}
                </Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      </div>
    </div>
  );
};
export const OrderTrackingLinkModal: React.FC<{
  productId: string;
}> = ({ productId }) => {
  const { isOpen, handleClose, handleOpen } = useModalDisclouser({});
  const { mutate, isLoading } = useAddProductTrackingLink({
    onSuccess: handleClose,
  });
  const { t } = useTranslation();
  return (
    <Modal isOpen={isOpen} onClose={handleClose} onOpen={handleOpen}>
      <ModalOverlay />
      <ModalContent className="flex flex-col gap-12 min-w-[min(100%,40rem)]">
        <HStack className="justify-between">
          <span className="text-2xl font-semibold">
            {t("add_tracking_link", "Add Tracking Link")}
          </span>
          <ModalCloseButton>
            <span>
              <CloseIcon className="text-2xl cursor-pointer" />
            </span>
          </ModalCloseButton>
        </HStack>
        <Formik<AddProductTrackingLinkDto>
          initialValues={{
            productId,
            trackingLink: "",
          }}
          onSubmit={(data) => {
            mutate(data);
          }}
        >
          {({ setFieldValue }) => {
            return (
              <Form className="flex flex-col gap-12">
                <FormikInput
                  name="trackingLink"
                  placeholder={t("paste_link_here", "Paste Link Here")}
                  label={t("order_tracking_link", "Order Tracking Link")}
                />

                <HStack className="justify-end">
                  <ModalCloseButton>
                    <Button disabled={isLoading} colorScheme="white">
                      {t("close", "Close")}
                    </Button>
                  </ModalCloseButton>
                  <Button loading={isLoading} type="submit">
                    {t("add_link", "Add Link")}
                  </Button>
                </HStack>
              </Form>
            );
          }}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export const UpdateProductStatusModal: React.FC<UpdateProductStatusDto> = ({
  productId,
}) => {
  const { isOpen, handleClose, handleOpen } = useModalDisclouser({});
  const { mutate } = useUpdateProductStatus({
    onSuccess: handleClose,
  });
  const { t } = useTranslation();
  return (
    <Modal isOpen={isOpen} onClose={handleClose} onOpen={handleOpen}>
      <ModalOverlay />
      <ModalContent className="flex flex-col gap-12 min-w-[min(100%,40rem)]">
        <HStack className="justify-between">
          <span className="text-2xl font-semibold">
            {t("update_product_status", "Update Product Status")}
          </span>
          <ModalCloseButton>
            <span>
              <CloseIcon className="text-2xl cursor-pointer" />
            </span>
          </ModalCloseButton>
        </HStack>
        <Formik<{ productId: string; status: OrderedProductStatus }>
          initialValues={{
            productId,
            //@ts-ignore
            status,
          }}
          onSubmit={(data) => {
            mutate(data);
          }}
        >
          {({ setFieldValue }) => {
            return (
              <Form className="flex flex-col gap-12">
                <div>
                  <span className="px-2 text-sm text-gray-500">
                    {t("select_status", "Select Status")}
                  </span>
                  <Select
                    flushed
                    onOptionSelect={(opt) => setFieldValue("status", opt)}
                  >
                    <SelectOption value={"confirmed"}>
                      {t("confirmed", "Confirmed")}
                    </SelectOption>
                    <SelectOption value={"canceled"}>
                      {t("canceled", "Canceled")}
                    </SelectOption>
                    <SelectOption value={"pending"}>
                      {t("pending", "Pending")}
                    </SelectOption>
                  </Select>
                </div>

                <HStack className="justify-end">
                  <ModalCloseButton>
                    <Button colorScheme="white">{t("close", "Close")}</Button>
                  </ModalCloseButton>
                  <Button type="submit">
                    {t("update_status", "Update Status")}
                  </Button>
                </HStack>
              </Form>
            );
          }}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

type ProductType = {
  id: string;
  productImage: string;
  productName: string;
  quantity: number;
  price: PriceType;
  total: PriceType;
  status: OrderedProductStatus;
};

const products: ProductType[] = [...Array(15)].map((_, i) => ({
  id: String(i),
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
