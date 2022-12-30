import { AdminListTable, AdminTableCellTypeEnum } from "@components";
import { Button, EditIcon, usePaginationControls } from "ui";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { randomNum } from "utils";

interface Profession {
  id: string;
  name: string;
  accounts: number;
}

const professions: Profession[] = [...Array(10)].map((_, i) => ({
  id: i.toString(),
  name: `profession-${i}`,
  accounts: randomNum(150),
}));

const profession: NextPage = () => {
  const { t } = useTranslation();
  const { visit, getCurrentPath } = useRouting();
  const { controls } = usePaginationControls();
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
          },
          {
            type: AdminTableCellTypeEnum.number,
            value: t("Accounts"),
          },
          {
            type: AdminTableCellTypeEnum.action,
          },
        ]}
        data={professions.map(({ accounts, id, name }) => ({
          id,
          cols: [
            {
              value: name,
            },
            {
              value: accounts.toString(),
            },
            {
              type: AdminTableCellTypeEnum.action,
              actionBtns: [
                <Button
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

export default profession;
