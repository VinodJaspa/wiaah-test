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
  useResponsive,
  HStack,
  ArrowLeftAlt1Icon,
  PriceDisplay,
  Input,
  InputGroup,
  InputLeftElement,
  Divider,
} from "@UI"; // Update this path to the correct relative path of the UI module
import { mapArray, useForm } from "utils";
import {
  useCreateVoucherMutation,
  useGetMyVouchersQuery,
} from "@features/Vouchers";
import { VoucherStatus } from "@features/API/gql/generated";

export const VouchersSection: React.FC = () => {
const { t } = useTranslation();
  const { isMobile } = useResponsive();
  const {
    changeTotalItems,
    controls,
    pagination: { page, take },
  } = usePaginationControls();

  const { data } = useGetMyVouchersQuery();

  const { data: balance } = useGetMyBalanceQuery();

  const { form, inputProps, selectProps } = useForm<
    Parameters<typeof mutate>[0]
  >({ amount: 0, currency: "", code: "" });

  const { mutate } = useCreateVoucherMutation();

  return isMobile ? (
    <div className="flex flex-col gap-6 p-2">
      <HStack className="relative justify-center">
        <p>{t("Vouchers")}</p>
        <ArrowLeftAlt1Icon className="absolute top-1/2 left-0" />
      </HStack>

      <div className="bg-primary px-6 h-[4.75rem] flex items-center justify-between rounded-xl">
        <p className="font-medium">{t("Available Balance")}:</p>

        <PriceDisplay
          className="text-lg font-bold"
          price={balance?.withdrawableBalance}
        />
      </div>

      <div>
        <p>{t("Amount to convert")}</p>
        <InputGroup>
          <InputLeftElement>
            <Select {...selectProps("currency")} className="border-0">
              <SelectOption value={"usd"}>USD</SelectOption>
              <SelectOption value={"eur"}>EUR</SelectOption>
            </Select>
          </InputLeftElement>
          <Input {...inputProps("amount")} />
        </InputGroup>
      </div>

      <div className="fex flex-col gap-2">
        <HStack className="justify-between">
          <p>{t("Currency")}</p>
          <p className="text-sm font-semibold uppercase">{form.currency}</p>
        </HStack>
        <HStack className="justify-between">
          <p>{t("Fees")}</p>
          <PriceDisplay className="text-sm font-semibold" price={form.amount} />
        </HStack>
        <Divider />
        <HStack className="justify-between">
          <p>{t("Converted Amount")}</p>
          <PriceDisplay className="text-lg font-bold" price={form.amount} />
        </HStack>
      </div>

      <Button onClick={() => mutate(form)} colorScheme="darkbrown">
        {t("Convert into voucher")}
      </Button>

      <div className="flex flex-col">
        <p>{t("Vouchers")}</p>

        {mapArray(data, ({ amount, code, createdAt, currency, status }) => (
          <HStack className="justify-between shadow-sm p-2">
            <div className="flex flex-col gap-2">
              <p className="font-medium">{code}</p>
              <p className="text-xs text-grayText">
                {new Date(createdAt).toLocaleDateString("en-us", {
                  year: "numeric",
                  month: "long",
                  weekday: "short",
                  day: "2-digit",
                })}
              </p>
            </div>

            <HStack className="font-semibold">
              {amount} {currency}
            </HStack>

            <p
              className={`${
                status === VoucherStatus.Active
                  ? "text-primary"
                  : "text-secondaryRed"
              } text-xs font-medium`}
            >
              {status === VoucherStatus.Active ? t("Active") : t("Inactive")}
            </p>
          </HStack>
        ))}
      </div>
    </div>
  ) : (
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
                placeholder={t("enter_amount", "Enter Amount") as string}
              />
              <FormikInput<SelectProps>
                as={Select}
                flushed
                name="currency"
                onOptionSelect={(opt) => setFieldValue("currency", opt)}
                value={values.currency}
                placeholder={t("select_currency", "Select Currency") as string}
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
            {mapArray(data, (voucher:any, i) => (
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
