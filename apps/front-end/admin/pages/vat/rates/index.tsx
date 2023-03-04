import {
  Button,
  EditIcon,
  useAdminGetTaxRatesQuery,
  usePaginationControls,
} from "ui";
import { NextPage } from "next";
import React from "react";
import { mapArray, randomNum, useForm } from "utils";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { AdminListTable, AdminTableCellTypeEnum } from "@components";

const taxRates: NextPage = () => {
  const { t } = useTranslation();
  const { getCurrentPath, visit } = useRouting();
  const { controls, pagination } = usePaginationControls();

  const { form, inputProps } = useForm<
    Parameters<typeof useAdminGetTaxRatesQuery>[0]
  >({ pagination });
  const { data } = useAdminGetTaxRatesQuery(form);

  return (
    <section>
      <AdminListTable
        pagination={controls}
        props={{ TdProps: { className: "border-b border-b-gray-300" } }}
        onAdd={() => {
          visit((r) =>
            r.addPath(getCurrentPath()).addPath("form").addPath("new")
          );
        }}
        headers={[
          {
            type: AdminTableCellTypeEnum.checkbox,
          },
          {
            value: t("Tax Name"),
            inputProps: inputProps("name"),
          },
          {
            value: t("Tax Rate"),
            inputProps: inputProps("rate"),
          },
          {
            value: t("Geo Zone"),
          },
          {
            value: t("Action"),
          },
        ]}
        title={t("Tax Rate List")}
        data={mapArray(data, (v) => ({
          id: v.id,
          cols: [
            {
              type: AdminTableCellTypeEnum.checkbox,
            },
            {
              value: v.title,
            },
            {
              value: v.percent.toString(),
              type: AdminTableCellTypeEnum.number,
            },
            {
              value: v.appliedOnCountries.map((v) => v.name).join(", "),
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
