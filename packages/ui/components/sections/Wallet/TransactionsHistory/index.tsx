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
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  CloseIcon,
  Select,
  SelectOption,
  Link,
  ModalOverlay,
  PriceDisplay,
  InputGroup,
  InputLeftElement,
  Input,
  ModalFooter,
} from "@partials";

import { FinancialCard } from "@blocks/Cards";

import { SectionHeader } from "@sections";

import { mapArray } from "utils";

import {
  useGetMyBalanceQuery,
  useGetMyFinancialAccountsQuery,
  useGetMyTransactionHistoryQuery,
  useGetWithdrawCurrneicesQuery,
} from "@UI";
import { usePaginationControls } from "@blocks";
import { TransactionStatus } from "@features/API";
import { useUserData } from "@UI";
import { useDisclouser } from "hooks";
import { Form, Formik } from "formik";

export interface TransactionsHistorySectionProps {}

export const TransactionsHistorySection: React.FC<
  TransactionsHistorySectionProps
> = () => {
  const { user } = useUserData();
  const { handleClose, handleOpen, isOpen } = useDisclouser();

  const { pagination, controls } = usePaginationControls();
  const { data: transactions } = useGetMyTransactionHistoryQuery({
    pagination,
  });

  const { data: currencies } = useGetWithdrawCurrneicesQuery();
  const { data: accounts } = useGetMyFinancialAccountsQuery();

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
        >
          <Button className="bg-primary-500" onClick={handleOpen}>
            {t("Get Paid Now")}
          </Button>
        </FinancialCard>
        <FinancialCard
          className="w-full"
          title={t("Your Earnings to Date")}
          amount={{
            amount: balance?.allTimeEarnings || 0,
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
                  fromUser,
                  toUser,
                  currency,
                  paymentType,
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
                    <Td>{paymentType}</Td>
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
      <Modal isOpen={isOpen} onClose={handleClose} onOpen={handleOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="border-b p-2 font-bold" title={t("Withdraw")}>
            <ModalCloseButton>
              <CloseIcon />
            </ModalCloseButton>
          </ModalHeader>
          <Formik
            initialValues={{
              methodId: "",
              amount: 0,
              currency: balance?.balanceCurrency || "USD",
            }}
            onSubmit={() => {}}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <Table
                  TdProps={{
                    className:
                      "first:align-top whitespace-nowrap first:text-right odd:font-bold even:font-semibold",
                  }}
                  className="w-full"
                  TrProps={{ className: "border-b" }}
                >
                  <Tr>
                    <Td>{t("Transfer to")}:</Td>
                    <Td>
                      <Select
                        onOptionSelect={(v) => setFieldValue("methodId", v)}
                        value={values.methodId}
                        placeholder={t("Select financial account")}
                      >
                        {mapArray(accounts, ({ id, label }) => (
                          <SelectOption value={id}>{label}</SelectOption>
                        ))}
                      </Select>
                      <Link href={(r) => ""}>
                        {t("Add a financial account")}
                      </Link>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>{t("Available to withdraw")}:</Td>
                    <Td>
                      <PriceDisplay price={balance?.withdrawableBalance} />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>{t("Amount to withdraw")}:</Td>
                    <Td>
                      <InputGroup>
                        <InputLeftElement>
                          <Select
                            className="border-none"
                            value={values.currency}
                            onOptionSelect={(v) => {
                              setFieldValue("currency", v);
                            }}
                          >
                            {mapArray(currencies, (v) => (
                              <SelectOption value={v.code}>
                                {v.currency.name}
                              </SelectOption>
                            ))}
                          </Select>
                        </InputLeftElement>

                        <Input
                          placeholder={t("Withdraw amount")}
                          value={values.amount}
                          onChange={(v) =>
                            setFieldValue("amount", v.target.value)
                          }
                        />
                      </InputGroup>

                      <Table
                        ThProps={{ className: "whitespace-nowrap" }}
                        className="text-xs"
                      >
                        <THead>
                          <Tr>
                            <Th>{t("Currency")}</Th>
                            <Th>{t("Balance")}</Th>
                            <Th>{t("Exchange Rate")}</Th>
                            <Th>{t("US Dollar Equivalent")}</Th>
                          </Tr>
                        </THead>
                        <TBody>
                          <Tr>
                            <Td>{values.currency}</Td>
                            <Td>{Number(values.amount)}</Td>
                            <Td>
                              {
                                currencies?.find(
                                  (v) => v.code === values.currency
                                )?.currency.exchangeRate
                              }
                            </Td>
                            <Td>{Number(values.amount)}</Td>
                          </Tr>
                        </TBody>
                      </Table>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>{t("Fees")}:</Td>
                    <Td>
                      <PriceDisplay />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>{t("Transfer to Account")}:</Td>
                    <Td>
                      <PriceDisplay
                        priceObject={{
                          amount: Number(values.amount),
                          currency: values.currency,
                        }}
                      />
                    </Td>
                  </Tr>
                </Table>
                <ModalFooter className="pt-4">
                  <Button>{t("Submit")}</Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </div>
  );
};
