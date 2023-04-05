import {
  AdminListTable,
  AdminTableCellTypeEnum,
  usePaginationControls,
} from "@blocks";
import { HStack, PriceDisplay } from "@partials";
import React from "react";
import { useTranslation } from "react-i18next";
import { getRandomName, mapArray, randomNum } from "utils";

interface Profit {
  type: string;
  user: string;
  photo: string;
  amount: number;
  date: string;
}

const data: Profit[] = [...Array(5)].map((_, i) => ({
  amount: randomNum(65),
  date: new Date().toString(),
  photo: `/profile (${i + (1 % 7)}).jfif`,
  type: randomNum(10) % 3 ? "subscription" : "sale",
  user: `${getRandomName().firstName} ${getRandomName().lastName}`,
}));

const Profit = () => {
  const { t } = useTranslation();
  const { pagination } = usePaginationControls();

  return (
    <section>
      <AdminListTable
        pagination={pagination}
        title={t("Profit")}
        headers={[
          {
            type: AdminTableCellTypeEnum.image,
            value: t("Photo"),
            // inputProps: inputProps("name"),
          },
          {
            type: AdminTableCellTypeEnum.text,
            value: t("Seller"),
            // inputProps: inputProps("accounts"),
          },
          {
            type: AdminTableCellTypeEnum.number,
            value: t("Amount"),
          },
          {
            type: AdminTableCellTypeEnum.text,
            value: t("Type"),
          },
          {
            type: AdminTableCellTypeEnum.date,
            value: t("Date"),
          },
        ]}
        data={mapArray(data, ({ amount, date, photo, type, user }) => ({
          id: "",
          cols: [
            {
              type: AdminTableCellTypeEnum.avatar,
              value: photo,
            },
            {
              value: user,
            },
            {
              type: AdminTableCellTypeEnum.custom,
              custom: (
                <HStack className="text-primary text-lg font-semibold gap-0">
                  <PriceDisplay price={amount}></PriceDisplay>+
                </HStack>
              ),
            },
            {
              value: type,
            },
            {
              type: AdminTableCellTypeEnum.date,
              value: new Date(date).toLocaleDateString("en-us", {
                year: "numeric",
                month: "long",
                day: "2-digit",
                hour12: true,
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
          ],
        }))}
      />
    </section>
  );
};

export default Profit;
