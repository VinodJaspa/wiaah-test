import { useGetMyWithdrawalsQuery } from "ui";
import { Button, Pagination, Table, TBody, Td, Th, Tr } from "@partials";
import { SectionHeader } from "@sections/ShoppingManagement";
import { mapArray, useForm } from "utils";
import { useTranslation } from "react-i18next";
import { BsFilePdfFill } from "react-icons/bs";
import { usePaginationControls } from "@blocks";
import React from "react";

export const PayoutSection = () => {
  const { t } = useTranslation();

  const { controls, pagination } = usePaginationControls();
  const { form } = useForm<Parameters<typeof useGetMyWithdrawalsQuery>[0]>({
    pagination,
  });
  const { data } = useGetMyWithdrawalsQuery(form);

  return (
    <div>
      <SectionHeader sectionTitle={t("Payout History")}>
        <Button className="flex gap-2 items-center">
          <BsFilePdfFill />
          {t("PDF")}
        </Button>
      </SectionHeader>

      <Table className="w-full">
        <Tr>
          <Th>{t("Date")}</Th>
          <Th>{t("Amount")}</Th>
          <Th>{t("Payment Method")}</Th>
          <Th>{t("Status")}</Th>
        </Tr>
        <TBody>
          {mapArray(
            data,
            ({ amount, id, requestedAt, status, userId, financialAccount }) => (
              <Tr key={id}>
                <Td>{new Date(requestedAt).toDateString()}</Td>
                <Td>{amount}</Td>
                <Td>{financialAccount.label}</Td>
                <Td>{status}</Td>
              </Tr>
            )
          )}
        </TBody>
      </Table>
      <Pagination controls={controls} />
    </div>
  );
};
