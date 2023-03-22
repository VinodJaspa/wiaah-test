import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  SectionHeader,
  FormikInput,
  Button,
  Select,
  SelectProps,
  SelectOption,
  Table,
  TBody,
  THead,
  Tr,
  Td,
  Th,
  TableContainer,
  ItemsPagination,
  usePaginationControls,
  useGetMyBalanceQuery,
} from "@UI";
import { mapArray, randomNum } from "utils";
import { useGetMyVouchersQuery } from "@features/Vouchers";

export const VouchersSection: React.FC = () => {
  const { t } = useTranslation();
  const {
    changeTotalItems,
    controls,
    pagination: { page, take },
  } = usePaginationControls();

  const { data } = useGetMyVouchersQuery();

  const { data: balance } = useGetMyBalanceQuery();

  return (
    <div className="flex flex-col gap-8">
      <SectionHeader sectionTitle={t("Vouchers")} />
      <div className="w-full grid grid-cols-2">
        <span>
          <span className="font-bold">{t("Available Amount")}</span>:{" "}
          {balance?.cashbackBalance}
        </span>
        <span>
          <span className="font-bold">{t("Converted Amount")}: </span>
          {balance?.convertedCashbackBalance}
        </span>
      </div>
      <Formik
        initialValues={{
          amount: "",
          currency: "",
        }}
        onSubmit={(data, { resetForm }) => {
          resetForm();
        }}
      >
        {({ setFieldValue, values }) => {
          return (
            <Form className="grid grid-cols-3 gap-4">
              <FormikInput
                flushed
                name="amount"
                placeholder={t("enter_amount", "Enter Amount")}
              />
              <FormikInput<SelectProps>
                as={Select}
                flushed
                name="currency"
                onOptionSelect={(opt) => setFieldValue("currency", opt)}
                value={values.currency}
                placeholder={t("select_currency", "Select Currency")}
              >
                {currencys.map((currency, i) => (
                  <SelectOption key={i} value={currency}>
                    {currency}
                  </SelectOption>
                ))}
              </FormikInput>
              <Button type="submit" className="w-fit ml-auto">
                {t("Convert Into Voucher")}
              </Button>
            </Form>
          );
        }}
      </Formik>
      <TableContainer>
        <Table
          className="shadow border-collapse w-full"
          TrProps={{ className: "border-collapse" }}
          ThProps={{
            className: "text-left border-[1px] border-b-gray-400",
          }}
          TdProps={{ className: "border-[1px] border-gray-300" }}
        >
          <THead>
            <Tr>
              <Th>{t("Voucher Code")}</Th>
              <Th>{t("Date")}</Th>
              <Th>{t("Amount")}</Th>
              <Th>{t("Currency")}</Th>
              <Th>{t("Status")}</Th>
            </Tr>
          </THead>
          <TBody>
            {mapArray(data, (voucher, i) => (
              <Tr key={i}>
                <Td>{voucher.code}</Td>
                <Td>{new Date(voucher.createdAt).toDateString()}</Td>
                <Td>{voucher.amount}</Td>
                <Td>{voucher.currency}</Td>
                <Td>{voucher.status}</Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      </TableContainer>
      <ItemsPagination controls={controls} />
    </div>
  );
};

const currencys: string[] = ["USD", "EGP", "CHF"];
