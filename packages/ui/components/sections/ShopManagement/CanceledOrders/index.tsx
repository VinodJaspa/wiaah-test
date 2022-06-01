import React from "react";
import { useTranslation } from "react-i18next";
import { BsFilePdfFill } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { IoTrash } from "react-icons/io5";
import { PriceType } from "types";
import {
  Button,
  Table,
  THead,
  TBody,
  Tr,
  Td,
  Th,
  ItemsPagination,
  PriceDisplay,
  TableContainer,
  SectionHeader,
} from "ui";

type CanceledOrderData = {
  productImage: string;
  productName: string;
  quantity: number;
  paidPrice: PriceType;
  shippingAmount: number;
  returnReason: string;
  otherReason: string;
  adminStatus: string;
};

export interface CanceledOrdersSectionProps {}

export const CanceledOrdersSection: React.FC<CanceledOrdersSectionProps> =
  ({}) => {
    const { t } = useTranslation();
    return (
      <div className="flex flex-col gap-4 w-full">
        <SectionHeader sectionTitle={t("canceled_orders", "Canceled Orders")}>
          <Button className="flex py-1 items-center gap-2">
            <BsFilePdfFill /> {t("pdf", "pdf")}
          </Button>
        </SectionHeader>
        <TableContainer className="w-full flex-col flex border-[1px] border-gray-300">
          <Table>
            <THead>
              <Tr>
                <Th className="border-[1px] border-gray-300">
                  {t("product_image", "Product Image")}
                </Th>
                <Th className="border-[1px] border-gray-300">
                  {t("product_name", "Product Name")}
                </Th>
                <Th className="border-[1px] border-gray-300">
                  {t("quantity", "Quantity")}
                </Th>
                <Th className="border-[1px] border-gray-300">
                  {t("paid_price", "Paid Price")}
                </Th>
                <Th className="border-[1px] border-gray-300">
                  {t("shipping_amount", "Shipping Amount")}
                </Th>
                <Th className="border-[1px] border-gray-300">
                  {t("return_reason", "Return Reason")}
                </Th>
                <Th className="border-[1px] border-gray-300">
                  {t("other_reason", "Other Reason")}
                </Th>
                <Th className="border-[1px] border-gray-300">
                  {t("admin_status", "Admin Status")}
                </Th>
                <Th className="border-[1px] border-gray-300">
                  {t("action", "Action")}
                </Th>
              </Tr>
            </THead>
            <TBody>
              {canceledOrders && canceledOrders.length > 0
                ? canceledOrders.map((card, i) => (
                    <Tr key={i}>
                      <Td className="border-[1px] border-gray-300">
                        <img
                          className="w-full h-auto"
                          src={card.productImage}
                        />
                      </Td>
                      <Td className="border-[1px] whitespace-nowrap border-gray-300">
                        {card.productName}
                      </Td>
                      <Td className="border-[1px] border-gray-300">
                        {card.quantity}
                      </Td>
                      <Td className="border-[1px] border-gray-300">
                        <PriceDisplay
                          className="whitespace-nowrap"
                          priceObject={card.paidPrice}
                        />
                      </Td>
                      <Td className="border-[1px] border-gray-300">
                        {card.shippingAmount}
                      </Td>
                      <Td className="border-[1px] border-gray-300">
                        {card.returnReason}
                      </Td>
                      <Td className="border-[1px] border-gray-300">
                        {card.otherReason}
                      </Td>
                      <Td className="border-[1px] border-gray-300">
                        {card.adminStatus}
                      </Td>
                      <Td className="border-[1px] border-gray-300">
                        <div className="flex items-center gap-2 text-xl">
                          <BiEdit className="text-xl cursor-pointer" />
                          <IoTrash className="text-red-700 text-xl cursor-pointer" />
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
      </div>
    );
  };

const canceledOrders: CanceledOrderData[] = [
  {
    productName: "product 1",
    adminStatus: "active",
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
