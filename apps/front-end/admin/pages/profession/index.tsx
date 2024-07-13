import { AdminListTable, AdminTableCellTypeEnum } from "@components";
import {
  AdminGetProfessionsQuery,
  Button,
  EditIcon,
  useAdminGetProfessionQuery,
  usePaginationControls,
} from "ui";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { mapArray, randomNum, useForm } from "utils";
import { ProductUsageStatus } from "types";

const Profession: NextPage = () => {
  const { t } = useTranslation();
  const { visit, getCurrentPath } = useRouting();
  const { controls, pagination } = usePaginationControls();

  const { form, inputProps } = useForm<
    Parameters<typeof useAdminGetProfessionQuery>[0]
  >({ pagination }, { pagination });
  const { data: _data } = useAdminGetProfessionQuery(form);
  const data = FAKE_PROFESSION;

  return (
    <section>
      <AdminListTable
        pagination={controls}
        onAdd={() => {
          visit((r) => r.addPath(getCurrentPath()).addPath("add"));
        }}
        title={t("Profession")}
        headers={[
          {
            type: AdminTableCellTypeEnum.text,
            value: t("Name"),
            inputProps: inputProps("name"),
          },
          {
            type: AdminTableCellTypeEnum.number,
            value: t("Accounts"),
            inputProps: inputProps("accounts"),
          },
          {
            type: AdminTableCellTypeEnum.action,
          },
        ]}
        data={mapArray(data, ({ id, title, usage }) => ({
          id,
          cols: [
            {
              value: title,
            },
            {
              value: usage.toString(),
            },
            {
              type: AdminTableCellTypeEnum.action,
              actionBtns: [
                <Button
                  key={id}
                  onClick={() =>
                    visit((r) => r.addPath(getCurrentPath()).addQuery({ id }))
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

export default Profession;

const FAKE_PROFESSION: AdminGetProfessionsQuery["adminGetProfessions"] = [
  {
    __typename: "Profession",
    id: "prof1",
    sortOrder: 1,
    title: "Software Engineer",
    usage: 2,
  },
  {
    __typename: "Profession",
    id: "prof2",
    sortOrder: 2,
    title: "Data Scientist",
    usage: 3,
  },
  {
    __typename: "Profession",
    id: "prof3",
    sortOrder: 3,
    title: "Product Manager",
    usage: 3,
  },
];
