import { AdminListTable, AdminTableCellTypeEnum } from "../../components";
import {
  Badge,
  CircularProgress,
  PriceDisplay,
  useAdminGetFilteredTransactionsQuery,
  usePaginationControls,
} from "ui";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { mapArray, randomNum, setTestid, useForm } from "utils";
import { startCase } from "lodash";
import { FaFileInvoice } from "react-icons/fa";
import { TransactionStatus } from "@features/API";

const balance: NextPage = () => {
  const { t } = useTranslation();
  const { controls, pagination } = usePaginationControls();
  const { form, inputProps, selectProps } = useForm<
    Parameters<typeof useAdminGetFilteredTransactionsQuery>[0]
  >({});
  const { data } = useAdminGetFilteredTransactionsQuery(form);

  return (
    <section>
      <div className="flex w-full items-center justify-between">
        <div className="flex w-40 flex-col text-primary items-center gap-2">
          {/* @ts-ignore */}
          <CircularProgress maxValue={100} value={100}>
            <FaFileInvoice className="text-xl" />
          </CircularProgress>
          <div className="flex flex-col items-center gap-1">
            <p className="text-black">{t("Total Invoice")}</p>
            <p className="font-bold w-fit">
              <PriceDisplay price={randomNum(60000)} />
            </p>
          </div>
        </div>
        <div className="flex w-40 flex-col text-secondaryRed items-center gap-2">
          {/* @ts-ignore */}
          <CircularProgress maxValue={100} value={randomNum(99)}>
            <FaFileInvoice className="text-xl" />
          </CircularProgress>
          <div className="flex flex-col  items-center gap-1">
            <p className="text-black">{t("Overdue")}</p>
            <p className="font-bold">
              <PriceDisplay price={randomNum(60000)} />
            </p>
          </div>
        </div>
        <div className="flex w-40 flex-col text-yellow-400 items-center gap-2">
          {/* @ts-ignore */}
          <CircularProgress maxValue={100} value={randomNum(99)}>
            <FaFileInvoice className="text-xl" />
          </CircularProgress>
          <div className="flex flex-col  items-center gap-1">
            <p className="text-black">{t("Paid")}</p>
            <p className="font-bold">
              <PriceDisplay price={randomNum(60000)} />
            </p>
          </div>
        </div>
        <div className="flex w-40 flex-col text-blue-500 items-center gap-2">
          {/* @ts-ignore */}
          <CircularProgress maxValue={100} value={randomNum(99)}>
            <FaFileInvoice className="text-xl" />
          </CircularProgress>
          <div className="flex flex-col  items-center gap-1">
            <p className="text-black">{t("unPaid")}</p>
            <p className="font-bold">
              <PriceDisplay price={randomNum(60000)} />
            </p>
          </div>
        </div>
      </div>
      <AdminListTable
        {...setTestid("transaction-table")}
        // onAdd={() => {}}
        // onDelete={() => {}}
        pagination={controls}
        data={mapArray(
          data,
          ({ createdAt, description, id, status, amount, toUser }) => ({
            id,
            cols: [
              {
                type: AdminTableCellTypeEnum.checkbox,
              },
              {
                value: id,
              },
              {
                value: toUser?.profile?.username,
              },
              {
                value: startCase(toUser?.subscribedPlan?.membership?.name),
              },
              {
                value: new Date(createdAt).toDateString(),
              },
              {
                value: description,
              },
              {
                type: AdminTableCellTypeEnum.custom,
                props: { align: "center" },
                custom: (
                  <Badge
                    className="w-full"
                    cases={{
                      off: TransactionStatus.Pending,
                      fail: TransactionStatus.Failed,
                    }}
                    value={status}
                  >
                    {startCase(status)}
                  </Badge>
                ),
              },
              {
                type: AdminTableCellTypeEnum.custom,
                custom: <PriceDisplay price={amount} />,
              },
            ],
          })
        )}
        headers={[
          {
            type: AdminTableCellTypeEnum.checkbox,
          },
          {
            type: AdminTableCellTypeEnum.text,
            value: t("Transaction ID"),
            props: inputProps("id"),
          },
          {
            type: AdminTableCellTypeEnum.text,
            value: t("Seller"),
            props: inputProps("seller"),
          },
          {
            type: AdminTableCellTypeEnum.text,
            value: t("Plan"),
          },
          {
            type: AdminTableCellTypeEnum.text,
            value: t("Created At"),
          },
          {
            type: AdminTableCellTypeEnum.text,
            value: t("Description"),
            props: inputProps("description"),
          },
          {
            type: AdminTableCellTypeEnum.text,
            value: t("Status"),
            props: inputProps("status"),
          },
          {
            type: AdminTableCellTypeEnum.number,
            value: t("Amount"),
            props: inputProps("amount"),
          },
        ]}
        title={t("Transations")}
      />
    </section>
  );
};

export default balance;
