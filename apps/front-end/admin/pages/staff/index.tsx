import { AdminListTable, AdminTableCellTypeEnum } from "@components";
import {
  Badge,
  Button,
  PlusIcon,
  Select,
  SelectOption,
  usePaginationControls,
} from "ui";
import { NextPage } from "next";
import { getRandomImage } from "placeholder";
import React from "react";
import { useTranslation } from "react-i18next";
import { randomNum } from "utils";
import { startCase } from "lodash";
import { useDateDiff } from "hooks";
import { useRouting } from "routing";

interface Staff {
  id: string;
  name: string;
  thumbnail: string;
  role: string;
  email: string;
  status: string;
  lastActivity: string;
}

const users: Staff[] = [...Array(10)].map((_, i) => ({
  email: `testemail${i}@email.com`,
  lastActivity: new Date(
    new Date().setDate(new Date().getDate() - randomNum(10))
  ).toDateString(),
  name: `user-${i}`,
  role: randomNum(100) > 50 ? "admin" : "moderator",
  thumbnail: "/wiaah_logo.png",
  id: i.toString(),
  status: randomNum(100) > 50 ? "active" : "inActive",
}));

const Staff: NextPage = () => {
  const { t } = useTranslation();
  const { controls } = usePaginationControls();
  const { visit, getCurrentPath } = useRouting();

  return (
    <section>
      <div className="flex justify-end">
        <Button
          onClick={() =>
            visit((r) => r.addPath(getCurrentPath()).addPath("form"))
          }
          className="flex gap-2 items-center"
        >
          <PlusIcon /> {t("Add User")}
        </Button>
      </div>
      <AdminListTable
        title={t("Staff List")}
        headers={[
          {
            type: AdminTableCellTypeEnum.checkbox,
          },
          {
            type: AdminTableCellTypeEnum.avatar,
            value: t("Photo"),
          },
          {
            type: AdminTableCellTypeEnum.text,
            value: t("Name"),
          },
          {
            type: AdminTableCellTypeEnum.text,
            value: t("Email"),
          },
          {
            type: AdminTableCellTypeEnum.custom,
            value: t("Role"),
            custom: (
              <Select>
                <SelectOption value={"admin"}>{t("Admin")}</SelectOption>
                <SelectOption value={"moderator"}>
                  {t("Moderator")}
                </SelectOption>
              </Select>
            ),
          },
          {
            type: AdminTableCellTypeEnum.custom,
            value: t("Status"),
          },
          {
            type: AdminTableCellTypeEnum.custom,
            value: t("Last Activity"),
          },
        ]}
        data={users.map(
          ({ email, id, lastActivity, name, role, thumbnail, status }) => ({
            id,
            cols: [
              {
                type: AdminTableCellTypeEnum.checkbox,
              },
              {
                type: AdminTableCellTypeEnum.avatar,
                value: thumbnail,
              },
              {
                value: name,
              },
              {
                value: email,
              },
              {
                value: startCase(role),
              },
              {
                type: AdminTableCellTypeEnum.custom,
                custom: (
                  <Badge
                    className="flex justify-center"
                    cases={{ off: "inActive" }}
                    value={status}
                  >
                    {status}
                  </Badge>
                ),
              },
              {
                value: (() => {
                  const { timeUnit, value } = useDateDiff({
                    from: new Date(),
                    to: new Date(lastActivity),
                  }).getSince();

                  return `${value} ${timeUnit}`;
                })(),
              },
            ],
          })
        )}
        pagination={controls}
      />
    </section>
  );
};

export default Staff;
