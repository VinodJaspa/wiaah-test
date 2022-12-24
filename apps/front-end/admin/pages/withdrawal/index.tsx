import { AdminListTable, AdminTableCellTypeEnum } from "@components";
import { Badge, Pagination, Select, SelectOption } from "ui";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { mapArray, randomNum } from "utils";
import { startCase } from "lodash";

type Statuses = "pending" | "processed" | "refused";
const statuses: Statuses[] = ["pending", "processed", "refused"];
interface WithdrawalRequest {
  id: string;
  requestedAt: string;
  processedAt: string;
  shop: string;
  seller: string;
  email: string;
  amount: number;
  status: Statuses;
}

const requests: WithdrawalRequest[] = [
  {
    id: randomNum(1500).toString(),
    amount: randomNum(150),
    email: "seller@email.com",
    processedAt: new Date().toDateString(),
    requestedAt: new Date().toDateString(),
    seller: "seller name" + randomNum(1500),
    shop: "shop name",
    status: statuses[0],
  },
  {
    id: randomNum(1500).toString(),
    amount: randomNum(150),
    email: "seller@email.com",
    processedAt: new Date().toDateString(),
    requestedAt: new Date().toDateString(),
    seller: "seller name" + randomNum(1500),
    shop: "shop name",
    status: statuses[1],
  },
  {
    id: randomNum(1500).toString(),
    amount: randomNum(150),
    email: "seller@email.com",
    processedAt: new Date().toDateString(),
    requestedAt: new Date().toDateString(),
    seller: "seller name" + randomNum(1500),
    shop: "shop name",
    status: statuses[2],
  },
  {
    id: randomNum(1500).toString(),
    amount: randomNum(150),
    email: "seller@email.com",
    processedAt: new Date().toDateString(),
    requestedAt: new Date().toDateString(),
    seller: "seller name" + randomNum(1500),
    shop: "shop name",
    status: statuses[0],
  },
  {
    id: randomNum(1500).toString(),
    amount: randomNum(150),
    email: "seller@email.com",
    processedAt: new Date().toDateString(),
    requestedAt: new Date().toDateString(),
    seller: "seller name" + randomNum(1500),
    shop: "shop name",
    status: statuses[1],
  },
  {
    id: randomNum(1500).toString(),
    amount: randomNum(150),
    email: "seller@email.com",
    processedAt: new Date().toDateString(),
    requestedAt: new Date().toDateString(),
    seller: "seller name" + randomNum(1500),
    shop: "shop name",
    status: statuses[2],
  },
  {
    id: randomNum(1500).toString(),
    amount: randomNum(150),
    email: "seller@email.com",
    processedAt: new Date().toDateString(),
    requestedAt: new Date().toDateString(),
    seller: "seller name" + randomNum(1500),
    shop: "shop name",
    status: statuses[0],
  },
  {
    id: randomNum(1500).toString(),
    amount: randomNum(150),
    email: "seller@email.com",
    processedAt: new Date().toDateString(),
    requestedAt: new Date().toDateString(),
    seller: "seller name" + randomNum(1500),
    shop: "shop name",
    status: statuses[1],
  },
  {
    id: randomNum(1500).toString(),
    amount: randomNum(150),
    email: "seller@email.com",
    processedAt: new Date().toDateString(),
    requestedAt: new Date().toDateString(),
    seller: "seller name" + randomNum(1500),
    shop: "shop name",
    status: statuses[2],
  },
];

const withdrawal: NextPage = () => {
  const { t } = useTranslation();

  return (
    <section>
      <AdminListTable
        title={t("Withdrawals List")}
        data={requests.map(
          ({
            amount,
            email,
            id,
            processedAt,
            requestedAt,
            seller,
            shop,
            status,
          }) => ({
            id,
            cols: [
              {
                type: AdminTableCellTypeEnum.text,
                value: id,
              },
              {
                type: AdminTableCellTypeEnum.text,
                value: new Date(requestedAt).toDateString(),
              },
              {
                type: AdminTableCellTypeEnum.text,
                value: new Date(processedAt).toDateString(),
              },
              {
                type: AdminTableCellTypeEnum.text,
                value: shop,
              },
              {
                type: AdminTableCellTypeEnum.text,
                value: seller,
              },
              {
                type: AdminTableCellTypeEnum.text,
                value: email,
              },
              {
                type: AdminTableCellTypeEnum.number,
                value: amount.toString(),
              },
              {
                type: AdminTableCellTypeEnum.custom,
                custom: (
                  <Badge
                    cases={{
                      off: "pending",
                      fail: "refused",
                    }}
                    value={status}
                    className="flex justify-center"
                  >
                    {startCase(status)}
                  </Badge>
                ),
              },
            ],
          })
        )}
        headers={[
          {
            type: AdminTableCellTypeEnum.text,
            value: t("Withdrawal ID"),
          },
          {
            type: AdminTableCellTypeEnum.date,
            value: t("Requested Date"),
          },
          {
            type: AdminTableCellTypeEnum.date,
            value: t("Processed Date"),
          },
          {
            type: AdminTableCellTypeEnum.text,
            value: t("Shop"),
          },
          {
            type: AdminTableCellTypeEnum.text,
            value: t("Seller Name"),
          },
          {
            type: AdminTableCellTypeEnum.text,
            value: t("Email"),
          },
          {
            type: AdminTableCellTypeEnum.number,
            value: t("Amount"),
          },
          {
            type: AdminTableCellTypeEnum.custom,
            value: t("Status"),
            custom: (
              <Select>
                {mapArray(statuses, (s, i) => (
                  <SelectOption value={s} key={i}>
                    {startCase(s)}
                  </SelectOption>
                ))}
              </Select>
            ),
          },
        ]}
      />
      <Pagination />
    </section>
  );
};

export default withdrawal;
