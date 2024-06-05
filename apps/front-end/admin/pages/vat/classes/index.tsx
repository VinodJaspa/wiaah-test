import React from "react";
import { NextPage } from "next";
import { AdminListTable, AdminTableCellTypeEnum } from "@components";
import { useTranslation } from "react-i18next";
import { Button, EditIcon } from "ui";
import { useRouting } from "routing";

const classes = [
  {
    title: "Downloadable Products",
    id: "1",
  },
  {
    title: "Taxable Goods",
    id: "1",
  },
];

const TaxClasses: NextPage = () => {
  const { t } = useTranslation();
  const { visit, getCurrentPath } = useRouting();
  return (
    <AdminListTable
      data={classes.map((v) => ({
        id: v.id,
        cols: [
          {
            type: AdminTableCellTypeEnum.checkbox,
          },
          {
            value: v.title,
          },
          {
            props: {
              align: "right",
            },
            type: AdminTableCellTypeEnum.action,
            actionBtns: [
              <Button
                key={v.id}
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
      headers={[
        {
          props: { className: "w-fit" },
          type: AdminTableCellTypeEnum.checkbox,
        },
        {
          value: t("Tax Class Title"),
        },
        {
          props: { align: "right" },
          value: t("Action"),
        },
      ]}
      onAdd={() => {}}
      onDelete={() => {}}
      title={t("Tax Class List")}
    />
  );
};

export default TaxClasses;
