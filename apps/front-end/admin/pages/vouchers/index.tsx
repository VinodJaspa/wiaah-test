import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  DateFormInput,
  Input,
  Pagination,
  randomNum,
  Table,
  TableContainer,
  TBody,
  Td,
  Th,
  THead,
  Tr,
} from "ui";
import { mapArray } from "utils";

interface Voucher {
  id: string;
  number: string;
  username: string;
  currency: string;
  price: number;
  createdAt: string;
}

const vouchers: Voucher[] = [...Array(10)].map((_, i) => ({
  id: i.toString(),
  number: randomNum(150).toString(),
  createdAt: new Date().toString(),
  currency: "USD",
  price: randomNum(300),
  username: `user-${i}`,
}));

const Voucher = () => {
  const { t } = useTranslation();
  return (
    <section>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Input flushed className="w-full" placeholder={t("Voucher Number")} />
        <Input flushed className="w-full" placeholder={t("User Name")} />
        <Input flushed className="w-full" placeholder={t("Voucher Currency")} />
        <Input flushed className="w-full" placeholder={t("Voucher Price")} />
        <Input flushed className="w-full" placeholder={t("Shop Name")} />
        <Input flushed className="w-full" placeholder={t("Product Name")} />
        <DateFormInput flushed placeholder={t("Date")} />
        <Button className="w-fit">{t("Filter")}</Button>
      </div>
      <TableContainer>
        <Table className="w-full">
          <THead>
            <Tr>
              <Th>{t("Voucher Number")}</Th>
              <Th>{t("User Name")}</Th>
              <Th>{t("Voucher Currency")}</Th>
              <Th>{t("Voucher Price")}</Th>
              <Th>{t("Date")}</Th>
            </Tr>
            <Tr>
              <Th><Input /></Th>
              <Th><Input /></Th>
              <Th><Input /></Th>
              <Th><Input /></Th>
              <Th><DateFormInput /></Th>
            </Tr>
          </THead>

          <TBody>
            {mapArray(
              vouchers,
              ({ createdAt, currency, number, price, username, id }, i) => (
                <Tr key={id}>
                  <Td>{number}</Td>
                  <Td>{username}</Td>
                  <Td>{currency}</Td>
                  <Td>{price}</Td>
                  <Td>{new Date(createdAt).toDateString()}</Td>
                </Tr>
              )
            )}
          </TBody>
        </Table>
      </TableContainer>
      <Pagination />
    </section>
  );
};

export default Voucher;
