import { AdminListTable, AdminTableCellTypeEnum } from "@components";
import {
  Badge,
  Button,
  HStack,
  PriceDisplay,
  Select,
  SelectOption,
  ItemsPagination,
  Input,
} from "ui";
import React from "react";
import { useTranslation } from "react-i18next";
import { randomNum } from "utils";
import { startCase } from "lodash";
import { usePaginationControls } from "@blocks";

interface SubscriptionHistory {
  id: string;
  orderId: string;
  status: string;
  productName: string;
  recurring: {
    amount: number;
    days: number;
  };
  username: string;
  nextPaymentDate: string;
  expiryDate: string;
}

const subs: SubscriptionHistory[] = [...Array(10)].map((_, i) => ({
  id: i.toString(),
  expiryDate: new Date().toString(),
  nextPaymentDate: new Date().toString(),
  orderId: i.toString(),
  productName: `product name-${i}`,
  status: "expired",
  recurring: {
    amount: randomNum(500),
    days: randomNum(30),
  },
  username: `username-${i}`,
}));

const History: React.FC = () => {
  const { controls } = usePaginationControls();
  const { t } = useTranslation();
  return (
    <div>
      <HStack className="justify-between items-start">
        <HStack>
          <Select>
            <SelectOption value={"bulk"}>{t("Bulk Actions")}</SelectOption>
          </Select>
          <Button outline>{t("Apply")}</Button>
          <Button outline>{t("Export CSV")}</Button>
        </HStack>
        <div className="flex flex-col gap-2">
          <HStack className="text-xs">
            <Input />
            <Button className="whitespace-nowrap" outline>
              {t("Search Order")}
            </Button>
          </HStack>
          <ItemsPagination controls={controls} />
        </div>
      </HStack>
      <AdminListTable
        headers={[
          {
            type: AdminTableCellTypeEnum.checkbox,
          },
          {
            value: t("Subscription ID"),
          },
          {
            value: t("Parent Order ID"),
          },
          {
            value: t("Status"),
          },
          {
            value: t("Product Name"),
          },
          {
            value: t("Recurring Amount"),
          },
          {
            value: t("User Name"),
          },
          {
            value: t("Next Payment Date"),
          },
          {
            value: t("Subscription Expiry Date"),
          },
        ]}
        data={subs.map(
          ({
            expiryDate,
            id,
            nextPaymentDate,
            orderId,
            productName,
            recurring,
            status,
            username,
          }) => ({
            cols: [
              {
                type: AdminTableCellTypeEnum.checkbox,
              },
              {
                value: id,
              },
              {
                value: orderId,
              },
              {
                type: AdminTableCellTypeEnum.custom,
                custom: (
                  <Badge
                    value={status}
                    cases={{ fail: "expired", off: "pending" }}
                    className="w-fit"
                  >
                    {startCase(status)}
                  </Badge>
                ),
              },
              {
                value: productName,
              },
              {
                type: AdminTableCellTypeEnum.custom,
                custom: (
                  <HStack>
                    <PriceDisplay price={recurring.amount} />/
                    <p>
                      {recurring.days} {t("days")}
                    </p>
                  </HStack>
                ),
              },
              {
                value: username,
              },
              {
                value: new Date(nextPaymentDate).toDateString(),
              },
              {
                value: new Date(expiryDate).toDateString(),
              },
            ],
            id,
          })
        )}
        title={t("Subscription List")}
        contain
      />
    </div>
  );
};

export default History;
