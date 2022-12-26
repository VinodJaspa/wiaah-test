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
  CancelIcon,
  Pagination,
} from "@UI";
import { getRandomImage } from "placeholder";
import { randomNum } from "utils";
import { useModalDisclouser, useAccountType } from "hooks";
import { OrderedProductStatus, PriceType } from "types";
import { useUpdateProductStatus } from "@UI";
import { UpdateProductStatusDto } from "dto";

export const OrderDetailsSection: React.FC<{
  order: {
    customer: string;
    dateAdded: string;
    orderId: string;
    orderStatus: string;
    paymentMethod: string;
    productsNum: number;
    total: {
      amount: number;
      currency: string;
    };
    shippingDetails?: {
      name: string;
      address: string;
      zipCode: string;
      city: string;
      country: string;
    };
    products: ProductType[];
  };
}> = ({
  order = {
    customer: "customer",
    dateAdded: new Date(Date.now()).toDateString(),
    orderId: `${randomNum(100000)}`,
    orderStatus: "confirmed",
    paymentMethod: "stripe",
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
  },
}) => {
  const { orderId, cancelViewOrder, shopping } = React.useContext(OrderContext);
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-4xl font-bold">{t("Order Details")}</span>
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
                  placeholder={t("Status")}
                  name="status"
                >
                  {statusOptions.map((opt, i) => (
                    <SelectOption value={opt.value}>
                      <TranslationText translationObject={opt.name} />
                    </SelectOption>
                  ))}
                </FormikInput>
                <div className="flex items-center gap-2">
                  <FormikInput placeholder={t("Order ID")} name="DateAdded" />
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
                <div className="font-bold shadow-lg grid grid-cols-2 gap-2 py-2">
                  <span>
                    {t("Order ID")}:{" "}
                    <span className="font-normal">{order.orderId}</span>
                  </span>
                  <span>
                    {t("Payment Mothed")}:{" "}
                    <span className="font-normal">{order.paymentMethod}</span>
                  </span>
                  <span>
                    {t("Date Added")}:{" "}
                    <span className="font-normal">{order.dateAdded}</span>
                  </span>
                </div>
              </AccordionPanel>
            </AccordionItem>
            {order.shippingDetails ? (
              <AccordionItem itemkey={"2"}>
                <AccordionButton className="text-white text-lg">
                  <div className="p-2 cursor-pointer pr-8 bg-primary text-white flex w-full justify-between">
                    <span>{t("shipping_details", "Shipping Details")}</span>
                  </div>
                </AccordionButton>
                <AccordionPanel>
                  <div className="font-bold shadow-lg flex flex-col gap-2 p-2">
                    <span>
                      {t("Name")}:{" "}
                      <span className="font-normal">
                        {order.shippingDetails.name}
                      </span>
                    </span>
                    <span>
                      {t("Address")}:{" "}
                      <span className="font-normal">
                        {order.shippingDetails.address}
                      </span>
                    </span>
                    <span>
                      {t("Zip Code")}:{" "}
                      <span className="font-normal">
                        {order.shippingDetails.zipCode}
                      </span>
                    </span>
                    <span className="flex gap-1">
                      {t("City")}:{" "}
                      <span className="font-normal">
                        {order.shippingDetails.city}
                      </span>
                    </span>
                    <span className="flex gap-1">
                      {t("Country")}:{" "}
                      <span className="font-normal">
                        {order.shippingDetails.country}
                      </span>
                    </span>
                  </div>
                </AccordionPanel>
              </AccordionItem>
            ) : null}
          </div>
        </Accordion>
      </div>
      <div>
        <Table className="w-full">
          <Tr>
            <Th className="pl-0 text-left">
              {t("product_image", "Product Image")}
            </Th>
            <Th>{t("Product Name")}</Th>
            <Th>{t("Category")}</Th>
            <Th>{t("Quantity")}</Th>
            <Th>{t("Price")}</Th>
            <Th>{t("Total")}</Th>
            <Th>{shopping ? t("Track") : t("Status", "Status")}</Th>
            <Th>{shopping ? t("Cancelation") : t("Edit")}</Th>
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
                <Td>{prod.productName}</Td>
                <Td>{prod.quantity}</Td>
                <Td>
                  <PriceDisplay priceObject={prod.price} />
                </Td>
                <Td>
                  <PriceDisplay priceObject={prod.total} />
                </Td>
                <Td className="pr-0">
                  <div className="w-full flex justify-center">
                    <Button>
                      {shopping ? <>{t("Track")}</> : <>{prod.status}</>}
                    </Button>
                  </div>
                </Td>
                <Td>
                  <div className="w-full flex justify-center items-center">
                    {shopping ? (
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
                          trackingLink={prod.trackingLink}
                        />
                      </ModalExtendedWrapper>
                    )}
                  </div>
                </Td>
              </Tr>
            ))}
          </TBody>
        </Table>
        <Pagination />
      </div>
    </div>
  );
};

export const UpdateProductStatusModal: React.FC<UpdateProductStatusDto> = ({
  productId,
  status,
  trackingLink,
}) => {
  const { isOpen, handleClose, handleOpen } = useModalDisclouser({});
  const { mutate, isLoading } = useUpdateProductStatus({
    onSuccess: handleClose,
  });
  const { t } = useTranslation();
  return (
    <Modal isOpen={isOpen} onClose={handleClose} onOpen={handleOpen}>
      <ModalOverlay />
      <ModalContent className="flex flex-col gap-12 min-w-[min(100%,40rem)]">
        <HStack className="justify-between">
          <span className="text-2xl font-semibold">
            {t("Update Order Status")}
          </span>
          <ModalCloseButton>
            <span>
              <CloseIcon className="text-2xl cursor-pointer" />
            </span>
          </ModalCloseButton>
        </HStack>
        <Formik<UpdateProductStatusDto>
          initialValues={{
            productId,
            status,
            trackingLink,
          }}
          onSubmit={(data) => {
            mutate(data);
          }}
        >
          {({ setFieldValue }) => {
            return (
              <Form className="flex text-left flex-col gap-12">
                <div>
                  <span className="px-2 text-sm text-gray-500">
                    {t("Select Status")}
                  </span>
                  <Select
                    flushed
                    onOptionSelect={(opt) => setFieldValue("status", opt)}
                  >
                    <SelectOption value={"confirmed"}>
                      {t("Confirmed")}
                    </SelectOption>
                    <SelectOption value={"canceled"}>
                      {t("Canceled")}
                    </SelectOption>
                    <SelectOption value={"pending"}>
                      {t("Pending")}
                    </SelectOption>
                  </Select>
                </div>

                <FormikInput
                  label={t("order_tracking_link", "Order Tracking Link")}
                  name="trackingLink"
                  placeholder={t("add a tracking link for this order")}
                />

                <HStack className="justify-end">
                  <ModalCloseButton>
                    <Button colorScheme="white">{t("close", "Close")}</Button>
                  </ModalCloseButton>
                  <Button loading={isLoading} type="submit">
                    {t("Update Status")}
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
  trackingLink: string;
  category: string;
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
  trackingLink: "link",
  category: "category",
}));
