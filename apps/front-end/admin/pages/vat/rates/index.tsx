import { Button, EditIcon, usePaginationControls } from "ui";
import { NextPage } from "next";
import React from "react";
import { randomNum } from "utils";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { AdminListTable, AdminTableCellTypeEnum } from "@components";

interface TaxRate {
  name: string;
  rate: number;
  type: "fixed" | "percent";
  zone: {
    id: string;
    name: string;
  };
  id: string;
}

const rates: TaxRate[] = [...Array(3)].map((_, i) => ({
  id: i.toString(),
  name: `tax name-${i}`,
  rate: randomNum(30),
  type: "fixed",
  zone: {
    id: i.toString(),
    name: "UK VAT Zone",
  },
}));

const taxRates: NextPage = () => {
  const { t } = useTranslation();
  const { getCurrentPath, visit } = useRouting();
  const { controls } = usePaginationControls();
  return (
    <section>
      <AdminListTable
        pagination={controls}
        props={{ TdProps: { className: "border-b border-b-gray-300" } }}
        onAdd={() => {}}
        onDelete={() => {}}
        headers={[
          {
            type: AdminTableCellTypeEnum.checkbox,
          },
          {
            value: t("Tax Name"),
          },
          {
            value: t("Tax Rate"),
          },
          {
            value: t("Type"),
          },
          {
            value: t("Geo Zone"),
          },
          {
            value: t("Action"),
          },
        ]}
        title={t("Tax Rate List")}
        data={rates.map((v) => ({
          id: v.id,
          cols: [
            {
              type: AdminTableCellTypeEnum.checkbox,
            },
            {
              value: v.name,
            },
            {
              value: v.rate.toString(),
              type: AdminTableCellTypeEnum.number,
            },
            {
              value: v.type,
            },
            {
              value: v.zone.name,
            },
            {
              type: AdminTableCellTypeEnum.action,
              actionBtns: [
                <Button
                  onClick={() =>
                    visit((r) =>
                      r.addPath(getCurrentPath()).addPath("form").addPath(v.id)
                    )
                  }
                  center
                  className="w-8 h-8"
                >
                  <EditIcon />
                </Button>,
              ],
            },
          ],
        }))}
      />
    </section>
  );
};

export default taxRates;
