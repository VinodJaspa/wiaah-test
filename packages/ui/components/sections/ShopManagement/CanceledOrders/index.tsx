import React from "react";
import { useTranslation } from "react-i18next";
import { BsFilePdfFill } from "react-icons/bs";
import { PriceType } from "types";
import {
  Button,
  Table,
  THead,
  TBody,
  Tr,
  Td,
  Th,
  PriceDisplay,
  TableContainer,
  SectionHeader,
  ControlledModal,
  ModalButton,
  ModalExtendedWrapper,
  FormikInput,
  Textarea,
  ModalCloseButton,
  ModalFooter,
  useAcceptRefundRequestMutation,
  usePaginationControls,
  Image,
  Pagination,
} from "@UI";
import { declineReturnRequestDto } from "dto";
import { Form, Formik } from "formik";
import { ReturnDeclineRequestValidationSchema } from "validation";
import {
  useGetMyReturnedProductsQuery,
  useRejectRefundRequest,
} from "@features/Orders";
import { RefundStatusType } from "@features/API";
type ReturnRequestStatusEnum = "declined" | "accepted" | "pending";

type CanceledOrderData = {
  id: string;
  productImage: string;
  productName: string;
  quantity: number;
  paidPrice: PriceType;
  shippingAmount: number;
  returnReason: string;
  otherReason: string;
  status: ReturnRequestStatusEnum;
};

export interface CanceledOrdersSectionProps {}

export const ReturnedOrders: React.FC<CanceledOrdersSectionProps> = ({}) => {
const { t } = useTranslation();
  const { mutate: declineRequest, isLoading: declineIsLoading } =
    useRejectRefundRequest();
  const { mutate: acceptRequest, isLoading: acceptIsloading } =
    useAcceptRefundRequestMutation();

  const { pagination } = usePaginationControls();
  const { data } = useGetMyReturnedProductsQuery({ pagination });

  return (
    <div className="flex flex-col gap-4 w-full">
      <SectionHeader sectionTitle={t("returned_orders", "Returned Orders")}>
        <Button className="flex py-1 items-center gap-2">
          <BsFilePdfFill /> {t("pdf", "pdf")}
        </Button>
      </SectionHeader>
      <TableContainer className="w-full flex-col flex border-[1px] border-gray-300">
        <Table
          TdProps={{
            className: "border-[1px] whitespace-nowrap border-gray-300",
          }}
          ThProps={{
            className: "whitespace-nowrap border-[1px] border-gray-300",
          }}
        >
          <THead>
            <Tr>
              <Th>{t("product_image", "Product Image")}</Th>
              <Th>{t("product_name", "Product Name")}</Th>
              <Th>{t("quantity", "Quantity")}</Th>
              <Th>{t("paid_price", "Paid Price")}</Th>
              <Th>{t("shipping_amount", "Shipping Amount")}</Th>
              <Th>{t("return_reason", "Return Reason")}</Th>
              <Th>{t("other_reason", "Other Reason")}</Th>
              <Th>{t("status", "Status")}</Th>
              <Th>{t("action", "Action")}</Th>
            </Tr>
          </THead>
          <TBody>
            {data && data.length > 0
              ? data.map((card, i) => (
                  <Tr key={i}>
                    <Td>
                      <Image
                        className="w-auto h-16"
                        src={card.product.thumbnail}
                      />
                    </Td>
                    <Td>{card.product.title[0].value ?? ''}</Td>
                    <Td>{card.qty}</Td>
                    <Td>
                      <PriceDisplay
                        className="whitespace-nowrap"
                        price={card.amount}
                      />
                    </Td>
                    <Td>{0}</Td>
                    <Td>{card.reason}</Td>
                    <Td>{card.rejectReason}</Td>
                    <Td>
                      <Button
                        colorScheme={
                          card.status === RefundStatusType.Pending
                            ? "info"
                            : card.status === RefundStatusType.Rejected
                              ? "danger"
                              : "primary"
                        }
                        className="w-full"
                      >
                        {card.status}
                      </Button>
                    </Td>
                    <Td>
                      <div className="text-sm flex items-center gap-2">
                        <ModalExtendedWrapper>
                          <ModalButton>
                            <Button colorScheme="danger">
                              {t("decline", "Decline")}
                            </Button>
                          </ModalButton>
                          <ControlledModal>
                            <Formik<declineReturnRequestDto>
                              onSubmit={(data) => {
                                declineRequest({
                                  id: card.id,
                                  reason: data.declineReason,
                                });
                              }}
                              initialValues={{
                                requestId: card.id,
                                declineReason: "",
                              }}
                              validationSchema={
                                ReturnDeclineRequestValidationSchema
                              }
                            >
                              <Form className="flex flex-col gap-4">
                                <FormikInput
                                  label={t("decline_reason", "Decline Reason")}
                                  as={Textarea}
                                  className="min-h-[10rem]"
                                  name="declineReason"
                                />
                                <ModalFooter>
                                  <ModalCloseButton>
                                    <Button colorScheme="white">
                                      {t("close", "Close")}
                                    </Button>
                                  </ModalCloseButton>
                                  <Button
                                    loading={declineIsLoading}
                                    type="submit"
                                  >
                                    {t("submit", "Submit")}
                                  </Button>
                                </ModalFooter>
                              </Form>
                            </Formik>
                          </ControlledModal>
                        </ModalExtendedWrapper>
                        <Button
                          loading={acceptIsloading}
                          onClick={() => acceptRequest(card.id)}
                        >
                          {t("accpet", "Accept")}
                        </Button>
                      </div>
                    </Td>
                  </Tr>
                ))
              : null}
          </TBody>
        </Table>
        {canceledOrders.length < 1 && (
          <p className="font-semibold text-md px-4 py-2">
            {t("no_records_found", "No records found!")}
          </p>
        )}
      </TableContainer>
      <Pagination />
    </div>
  );
};

const canceledOrders: CanceledOrderData[] = [
  {
    id: "1",
    productName: "product 1",
    status: "pending",
    productImage: "/shop-2.jpeg",
    otherReason: "other reason",
    paidPrice: {
      amount: 5,
      currency: "USD",
    },
    quantity: 2,
    returnReason: "reason",
    shippingAmount: 1,
  },
  {
    id: "2",
    productName: "product 1",
    status: "accepted",
    productImage: "/shop-2.jpeg",
    otherReason: "other reason",
    paidPrice: {
      amount: 5,
      currency: "USD",
    },
    quantity: 2,
    returnReason: "reason",
    shippingAmount: 1,
  },
  {
    id: "3",
    productName: "product 1",
    status: "declined",
    productImage: "/shop-2.jpeg",
    otherReason: "other reason",
    paidPrice: {
      amount: 5,
      currency: "USD",
    },
    quantity: 2,
    returnReason: "reason",
    shippingAmount: 1,
  },
];
