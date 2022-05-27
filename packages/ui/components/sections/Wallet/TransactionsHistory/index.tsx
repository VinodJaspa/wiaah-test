import React from "react";
import { useTranslation } from "react-i18next";
import { BsFilePdf, BsFilePdfFill } from "react-icons/bs";
import { PriceType } from "types";
import {
  SectionHeader,
  Button,
  FinancialCard,
  Table,
  Tr,
  Td,
  Th,
  TBody,
  THead,
  PriceDisplay,
  ItemsPagination,
} from "ui";
import { randomNum } from "../../../helpers";

export interface TransactionsHistorySectionProps {}

export const TransactionsHistorySection: React.FC<TransactionsHistorySectionProps> =
  ({}) => {
    const currentBalance: PriceType = {
      amount: 5,
      currency: "CHF",
    };
    const earningsToDate: PriceType = {
      amount: 15,
      currency: "CHF",
    };
    const { t } = useTranslation();
    return (
      <div className="flex flex-col gap-8">
        <SectionHeader sectionTitle={t("your_finances", "Your Finances")}>
          <Button className="flex gap-2 items-center">
            <BsFilePdfFill />
            {t("pdf", "PDF")}
          </Button>
        </SectionHeader>
        <div className="flex gap-8 items-center">
          <FinancialCard
            className="w-full"
            title={t("your_current_balance", "Your Current Balance")}
            amount={currentBalance}
          />
          <FinancialCard
            className="w-full"
            title={t("your_earnings_to_date", "Your Earnings to Date")}
            amount={earningsToDate}
          />
        </div>
        <span className="text-2xl font-bold">
          {t("balance_records", "Balance Records")}
        </span>
        <Table
          TdProps={{
            className:
              "first:w-[99%]  whitespace-nowrap border-[1px] border-gray-400 min-w-[10rem]",
          }}
          TrProps={{ className: "border-collapse" }}
          ThProps={{ className: "text-left border-[1px] border-gray-400" }}
          className="text-xl border-collapse"
        >
          <THead>
            <Tr>
              <Th>{t("order_id", "Order ID")}</Th>
              <Th>{t("amount", "amount")}</Th>
              <Th>{t("quantity", "quantity")}</Th>
              <Th>{t("date_added", "Date Added")}</Th>
            </Tr>
          </THead>
          <TBody>
            {balanceRecords.map((record, idx) => (
              <Tr className="border-collapse" key={idx}>
                <Td>{record.orderId}</Td>
                <Td>
                  <PriceDisplay priceObject={record.amount} />
                </Td>
                <Td>{record.quantity}</Td>
                <Td>{record.dateAdded}</Td>
              </Tr>
            ))}
          </TBody>
        </Table>
        <ItemsPagination currentPage={1} maxItemsNum={balanceRecords.length} />
        <Table
          ThProps={{ className: "border-[1px] border-gray-400 text-left" }}
          TdProps={{ className: "border-[1px] border-gray-400" }}
          className="text-xl"
        >
          <THead>
            <Tr>
              <Th>{t("order_id", "Order ID")}</Th>
              <Th>{t("refund_amount", "Refund Amount")}</Th>
              <Th>{t("date_added", "Date Added")}</Th>
            </Tr>
          </THead>
          <TBody>
            {balanceRecords.slice(0, 2).map((record, idx) => (
              <Tr className="border-collapse" key={idx}>
                <Td>{record.orderId}</Td>
                <Td>
                  <PriceDisplay priceObject={record.amount} />
                </Td>
                <Td>{record.dateAdded}</Td>
              </Tr>
            ))}
            <Tr>
              <Td>{t("total_refunded_amount", "Total Refunded Amount")}</Td>
              <Td></Td>
              <Td>
                <PriceDisplay
                  priceObject={{
                    amount: 0,
                    currency: "CHF",
                  }}
                />
              </Td>
            </Tr>
          </TBody>
        </Table>
      </div>
    );
  };

export interface BalanceRecordData {
  orderId: string;
  amount: PriceType;
  quantity: number;
  dateAdded: string;
}

const balanceRecords: BalanceRecordData[] = [...Array(8)].map(() => ({
  orderId: `${randomNum(143642)}`,
  amount: {
    amount: randomNum(15),
    currency: "CHF",
  },
  quantity: randomNum(10),
  dateAdded: new Date(Date.now()).toDateString(),
}));
