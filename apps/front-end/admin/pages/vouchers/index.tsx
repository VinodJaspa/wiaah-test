import { VoucherStatus } from "@features/API/gql/generated";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  DateFormInput,
  Input,
  Pagination,
  Select,
  SelectOption,
  Table,
  TableContainer,
  TBody,
  Td,
  Th,
  THead,
  Tr,
  usePaginationControls,
  useAdminGetVouchersQuery,
  AdminGetVouchersQuery,
} from "ui";
import { mapArray, setTestid, useForm } from "utils";

const Voucher = () => {
  const { t } = useTranslation();

  const { pagination, controls } = usePaginationControls();

  const { form, inputProps } = useForm<
    Parameters<typeof useAdminGetVouchersQuery>[0]
  >({
    currency: "USD",
    date: "2024-07-02",
    name: "Sample Voucher",
    price: 50.0,
    status: VoucherStatus.Active,
    voucherNumber: 123456,
  });

  const { data: _vouchers } = useAdminGetVouchersQuery(form);
  const vouchers = FAKE_VOUCHERS;

  return (
    <section>
      <TableContainer>
        <Table className="w-full">
          <THead>
            <Tr>
              <Th>{t("Voucher Number")}</Th>
              <Th>{t("User Name")}</Th>
              <Th>{t("Voucher Currency")}</Th>
              <Th>{t("Voucher Price")}</Th>
              <Th>{t("Status")}</Th>
              <Th>{t("Date")}</Th>
            </Tr>
            <Tr>
              <Th>
                <Input {...inputProps("voucherNumber")} />
              </Th>
              <Th>
                <Input {...inputProps("name")} />
              </Th>
              <Th>
                <Input {...inputProps("currency")} />
              </Th>
              <Th>
                <Input {...inputProps("price")} />
              </Th>
              <Th>
                <Select
                  {...inputProps("status", "value", "onOptionSelect", (e) => e)}
                >
                  <SelectOption value={VoucherStatus.Active}>
                    {t("Active")}
                  </SelectOption>
                  <SelectOption value={VoucherStatus.InActive}>
                    {t("InActive")}
                  </SelectOption>
                </Select>
              </Th>
              <Th>
                <DateFormInput
                  {...inputProps("date", "dateValue", "onDateChange", (e) => e)}
                />
              </Th>
            </Tr>
          </THead>

          <TBody>
            {mapArray(
              vouchers,
              ({ createdAt, currency, amount, code, status, user }, i) => (
                <Tr {...setTestid("voucher-record")} key={i}>
                  <Td {...setTestid("voucher-code")}>{code}</Td>
                  <Td {...setTestid("voucher-name")}>{user?.firstName}</Td>
                  <Td {...setTestid("voucher-currency")}>{currency}</Td>
                  <Td {...setTestid("voucher-price")}>{amount}</Td>
                  <Td {...setTestid("voucher-status")}>{status}</Td>
                  <Td {...setTestid("voucher-date")}>
                    {new Date(createdAt).toDateString()}
                  </Td>
                </Tr>
              )
            )}
          </TBody>
        </Table>
      </TableContainer>
      <Pagination controls={controls} />
    </section>
  );
};

export default Voucher;

const FAKE_VOUCHERS: AdminGetVouchersQuery["getFilteredVouchers"] = [
  {
    __typename: "Voucher",
    amount: 100,
    code: "ABC123",
    createdAt: "2023-01-01T00:00:00Z",
    currency: "USD",
    status: VoucherStatus.Active,
    user: {
      __typename: "Account",
      id: "1",
      firstName: "John",
    },
  },
  {
    __typename: "Voucher",
    amount: 200,
    code: "XYZ789",
    createdAt: "2023-02-01T00:00:00Z",
    currency: "EUR",
    status: VoucherStatus.Active,
    user: {
      __typename: "Account",
      id: "2",
      firstName: "Jane",
    },
  },
  {
    __typename: "Voucher",
    amount: 150,
    code: "LMN456",
    createdAt: "2023-03-01T00:00:00Z",
    currency: "GBP",
    status: VoucherStatus.InActive,
    user: {
      __typename: "Account",
      id: "3",
      firstName: "Alice",
    },
  },
];
