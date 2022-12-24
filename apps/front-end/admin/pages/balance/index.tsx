import { AdminListTable, AdminTableCellTypeEnum } from "@components";
import {
  Badge,
  CircularProgress,
  PriceDisplay,
  usePaginationControls,
} from "ui";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { randomNum } from "utils";
import { startCase } from "lodash";
import { FaFileInvoice } from "react-icons/fa";

interface CommsissionBalance {
  id: string;
  seller: {
    id: string;
    name: string;
    plan: string;
  };
  fee: {
    amount: number;
  };
  description: string;
  createdAt: string;
  status: string;
}

const transactions: CommsissionBalance[] = [
  {
    id: "1",
    fee: {
      amount: 200,
    },
    createdAt: new Date().toString(),
    description: "Monthly subscription (pay)",
    seller: {
      id: "1",
      name: "sellername",
      plan: "Pay",
    },
    status: "compeleted",
  },
  {
    id: "2",
    fee: {
      amount: randomNum(200),
    },
    createdAt: new Date().toString(),
    description: "Commission on sale",
    seller: {
      id: "1",
      name: "sellername",
      plan: "Free",
    },
    status: "pending",
  },
  {
    id: "3",
    fee: {
      amount: randomNum(200),
    },
    createdAt: new Date().toString(),
    description: "Monthly subscription (pay)",
    seller: {
      id: "1",
      name: "sellername",
      plan: "Pay",
    },
    status: "failed",
  },
  {
    id: "4",
    fee: {
      amount: randomNum(200),
    },
    createdAt: new Date().toString(),
    description: `Monthly subscription (per click) (${randomNum(
      50000
    )} clicks)`,
    seller: {
      id: "1",
      name: "sellername",
      plan: "per-click",
    },
    status: "on_hold",
  },
  {
    id: "1",
    fee: {
      amount: 200,
    },
    createdAt: new Date().toString(),
    description: "Monthly subscription (pay)",
    seller: {
      id: "1",
      name: "sellername",
      plan: "Pay",
    },
    status: "compeleted",
  },
  {
    id: "2",
    fee: {
      amount: randomNum(200),
    },
    createdAt: new Date().toString(),
    description: "Commission on sale",
    seller: {
      id: "1",
      name: "sellername",
      plan: "Free",
    },
    status: "pending",
  },
  {
    id: "3",
    fee: {
      amount: randomNum(200),
    },
    createdAt: new Date().toString(),
    description: "Monthly subscription (pay)",
    seller: {
      id: "1",
      name: "sellername",
      plan: "Pay",
    },
    status: "failed",
  },
  {
    id: "4",
    fee: {
      amount: randomNum(200),
    },
    createdAt: new Date().toString(),
    description: `Monthly subscription (per click) (${randomNum(
      50000
    )} clicks)`,
    seller: {
      id: "1",
      name: "sellername",
      plan: "per-click",
    },
    status: "on_hold",
  },
];

const balance: NextPage = () => {
  const { t } = useTranslation();
  const { controls } = usePaginationControls();
  return (
    <section>
      <div className="flex w-full items-center justify-between">
        <div className="flex w-40 flex-col text-primary items-center gap-2">
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
        // onAdd={() => {}}
        // onDelete={() => {}}
        pagination={controls}
        data={transactions.map(
          ({ createdAt, description, fee, id, seller, status }) => ({
            id,
            cols: [
              {
                type: AdminTableCellTypeEnum.checkbox,
              },
              {
                value: id,
              },
              {
                value: seller.name,
              },
              {
                value: startCase(seller.plan),
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
                      off: "pending",
                      fail: "failed",
                      warning: "on_hold",
                    }}
                    value={status}
                  >
                    {startCase(status)}
                  </Badge>
                ),
              },
              {
                type: AdminTableCellTypeEnum.custom,
                custom: <PriceDisplay price={fee.amount} />,
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
          },
          {
            type: AdminTableCellTypeEnum.text,
            value: t("Seller"),
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
          },
          {
            type: AdminTableCellTypeEnum.text,
            value: t("Status"),
          },
          {
            type: AdminTableCellTypeEnum.number,
            value: t("Amount"),
          },
        ]}
        title={t("Transations")}
      />
    </section>
  );
};

export default balance;
