import React from "react";
import { useTranslation } from "react-i18next";
import { BsFilePdfFill } from "react-icons/bs";
import {
  Button,
  Table,
  Tr,
  Td,
  Th,
  TBody,
  THead,
  TableContainer,
  Status,
  HStack,
  Pagination,
} from "@partials";

import { FinancialCard } from "@blocks/Cards";

import { SectionHeader } from "@sections";

import { mapArray } from "utils";

import { useGetMyBalanceQuery, useGetMyTransactionHistoryQuery } from "@UI";
import { usePaginationControls } from "@blocks";
import { TransactionStatus } from "@features/API";
import { useUserData } from "@UI";

export interface TransactionsHistorySectionProps {}

export const TransactionsHistorySection: React.FC<
  TransactionsHistorySectionProps
> = () => {
  const { user } = useUserData();

  const { pagination, controls } = usePaginationControls();
  const { data: transactions } = useGetMyTransactionHistoryQuery({
    pagination,
  });

  const { data: balance } = useGetMyBalanceQuery();

  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-8">
      <SectionHeader sectionTitle={t("Your Finances")}>
        <Button className="flex gap-2 items-center">
          <BsFilePdfFill />
          {t("PDF")}
        </Button>
      </SectionHeader>
      <div className="flex flex-wrap sm:flex-nowrap gap-8 items-center">
        <FinancialCard
          className="w-full"
          title={t("Your Current Balance")}
          amount={{
            amount: balance?.withdrawableBalance || 0,
            currency: balance?.balanceCurrency,
          }}
        />
        <FinancialCard
          className="w-full"
          title={t("Your Earnings to Date")}
          amount={{
            amount: balance?.withdrawableBalance || 0,
            currency: balance?.balanceCurrency,
          }}
        />
      </div>
      <span className="text-2xl font-bold">{t("Transaction History")}</span>
      <TableContainer>
        <Table
          TdProps={{
            className:
              "whitespace-nowrap border-collapse border-[1px] border-gray-300 ",
          }}
          ThProps={{
            className:
              "whitespace-nowrap border-collapse border-[1px] border-gray-300 ",
          }}
          className="border-collapse w-full"
          TrProps={{ className: "border-collapse" }}
        >
          <THead>
            <Tr>
              <Th>{t("Date")}</Th>
              <Th>{t("Status and ID")}</Th>
              <Th>{t("Transaction type")}</Th>
              <Th>{t("Recipient")}</Th>
              <Th>{t("Amount")}</Th>
              <Th>{t("Currency")}</Th>
            </Tr>
          </THead>
          <TBody>
            {mapArray(
              transactions,
              (
                {
                  amount,
                  createdAt,
                  id,
                  status,
                  userId,
                  description,
                  fromUser,
                  toUser,
                  currency,
                },
                idx
              ) => {
                const recipient =
                  userId === user?.id
                    ? toUser.profile?.username || ""
                    : fromUser.profile?.username || "";
                return (
                  <Tr key={idx}>
                    <Td>
                      {new Date(createdAt).toLocaleDateString("en-us", {
                        dateStyle: "medium",
                      })}
                    </Td>
                    <Td>
                      <HStack>
                        <Status
                          status={
                            status === TransactionStatus.Success
                              ? "completed"
                              : status === TransactionStatus.Failed
                              ? "failed"
                              : "pending"
                          }
                        />
                        {id}
                      </HStack>
                    </Td>
                    <Td>{description}</Td>
                    <Td>
                      {recipient.slice(0, 4)}...
                      {recipient.slice(recipient.length - 4, recipient.length)}
                    </Td>
                    <Td>
                      <span
                        className={`${
                          userId === user?.id ? "text-primary" : "text-red-500"
                        }`}
                      >
                        {userId === user?.id ? "+" : "-"}
                        {amount}
                      </span>
                    </Td>
                    <Td>{currency}</Td>
                  </Tr>
                );
              }
            )}
            {!transactions || transactions.length < 1 ? (
              <Tr>
                <Td colSpan={6}>{t("No Records Found")}</Td>
              </Tr>
            ) : null}
          </TBody>
        </Table>
      </TableContainer>
      <Pagination controls={controls} />
    </div>
  );
};
