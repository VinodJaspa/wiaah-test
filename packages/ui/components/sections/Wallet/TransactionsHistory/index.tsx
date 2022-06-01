import React from "react";
import { useTranslation } from "react-i18next";
import { BsFilePdfFill } from "react-icons/bs";
import { BalanceRecordData, PriceType, TransactionStatusEnum } from "types";
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
  TableContainer,
  PriceDisplay,
  ItemsPagination,
  Status,
} from "ui";
import { randomNum, randomNumWithNegative } from "../../../helpers";
import { HStack } from "../../../partials";

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
        <div className="flex flex-wrap sm:flex-nowrap gap-8 items-center">
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
          {t("transaction_history", "Transaction History")}
        </span>
        <TableContainer>
          <Table
            TdProps={{ className: "whitespace-nowrap" }}
            className="text-xl border-collapse"
          >
            <THead>
              <Tr>
                <Th>{t("date", "Date")}</Th>
                <Th>{t("status_and_id", "Status and ID")}</Th>
                <Th>{t("transaction_type", "Transaction type")}</Th>
                <Th>{t("recipient", "Recipient")}</Th>
                <Th>{t("amount", "Amount")}</Th>
                <Th>{t("currency", "Currency")}</Th>
              </Tr>
            </THead>
            <TBody>
              {balanceRecords.map(
                (
                  {
                    dateAdded,
                    transactionStatus,
                    type,
                    recipient,
                    amount,
                    orderId,
                    currency,
                  },
                  idx
                ) => (
                  <Tr key={idx}>
                    <Td>
                      {new Date(dateAdded).toLocaleDateString("en-us", {
                        dateStyle: "medium",
                      })}
                    </Td>
                    <Td>
                      <HStack>
                        <Status status={transactionStatus} />
                        {orderId}
                      </HStack>
                    </Td>
                    <Td>{type}</Td>
                    <Td>
                      {recipient.slice(0, 4)}...
                      {recipient.slice(recipient.length - 4, recipient.length)}
                    </Td>
                    <Td>
                      <span
                        className={`${
                          amount > 0 ? "text-primary" : "text-red-500"
                        }`}
                      >
                        {amount > 0 ? "+" : "-"}
                        {amount}
                      </span>
                    </Td>
                    <Td>{currency}</Td>
                  </Tr>
                )
              )}
            </TBody>
          </Table>
        </TableContainer>
        {/* <ItemsPagination currentPage={1} maxItemsNum={balanceRecords.length} />
        <TableContainer>
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
                  <Td></Td>
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
          </Table> */}
        {/* </TableContainer> */}
      </div>
    );
  };

const transactionStatus: TransactionStatusEnum[] = [
  "completed",
  "failed",
  "pending",
];
const recipientType: string[] = [
  "Receipt from external wallet",
  "Receipt from a citizen",
  "Sending to citizen",
  "Sending to external wallet",
];
const Currncies: string[] = ["CHF", "USD", "GP", "EGP"];
const balanceRecords: BalanceRecordData[] = [...Array(8)].map(() => ({
  orderId: `${randomNum(143642)}`,
  amount: randomNumWithNegative(13543),
  quantity: randomNum(10),
  dateAdded: new Date(Date.now()).toDateString(),
  currency: Currncies[randomNum(Currncies.length)],
  type: recipientType[randomNum(recipientType.length)],
  recipient: "wkhadkjh2k1jh3124k21hkeh2kjhe",
  transactionStatus: transactionStatus[randomNum(transactionStatus.length)],
}));
