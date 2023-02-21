import { VoucherStatus } from "@features/API";
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
} from "ui";
import { mapArray, setTestid, useForm } from "utils";

const Voucher = () => {
  const { t } = useTranslation();

  const { pagination, controls } = usePaginationControls();

  const { form, inputProps } = useForm<
    Parameters<typeof useAdminGetVouchersQuery>[0]
  >({ pagination });

  const { data: vouchers } = useAdminGetVouchersQuery(form);

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
              ({ createdAt, currency, amount, code, status, user, id }, i) => (
                <Tr {...setTestid("voucher-record")} key={id}>
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
