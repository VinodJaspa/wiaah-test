import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { PriceType } from "types";
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
} from "ui";
import { randomNum } from "../../../../helpers";

const availableAmount = randomNum(500);
const convertedBalance = randomNum(500);

export const VouchersSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-8">
      <SectionHeader sectionTitle={t("vouchers", "Vouchers")} />
      <div className="w-full grid grid-cols-2">
        <span>
          <span className="font-bold">
            {t("available_amount", "Available Amount")}
          </span>
          : {availableAmount}
        </span>
        <span>
          <span className="font-bold">
            {t("converted_amount", "Converted Amount")}:{" "}
          </span>
          {convertedBalance}
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
                {t("convert_into_voucher", "Convert Into Voucher")}
              </Button>
            </Form>
          );
        }}
      </Formik>
      <TableContainer>
        <Table
          className="shadow border-collapse"
          TrProps={{ className: "border-collapse" }}
          ThProps={{
            className: "text-left border-[1px] border-b-gray-400",
          }}
          TdProps={{ className: "border-[1px] border-gray-300" }}
        >
          <THead>
            <Tr>
              <Th>{t("voucher_code", "Voucher Code")}</Th>
              <Th>{t("date", "Date")}</Th>
              <Th>{t("amount", "Amount")}</Th>
              <Th>{t("currency", "Currency")}</Th>
              <Th>{t("status", "Status")}</Th>
            </Tr>
          </THead>
          <TBody>
            {vouchers.map((voucher, i) => (
              <Tr key={i}>
                <Td>{voucher.code}</Td>
                <Td>{voucher.date}</Td>
                <Td>{voucher.amount}</Td>
                <Td>{voucher.currency}</Td>
                <Td>{voucher.status}</Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      </TableContainer>
      <ItemsPagination currentPage={1} maxItemsNum={vouchers.length} />
    </div>
  );
};

const currencys: string[] = ["USD", "EGP", "CHF"];

interface VoucherData {
  code: string;
  date: string;
  amount: number;
  currency: string;
  status: string;
}

const vouchers: VoucherData[] = [...Array(5)].map(() => ({
  code: `${randomNum(5000000)}`,
  amount: randomNum(500),
  currency: currencys[randomNum(currencys.length)],
  date: new Date(Date.now()).toDateString(),
  status: "Active",
}));
