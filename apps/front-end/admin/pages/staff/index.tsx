import { AdminListTable, AdminTableCellTypeEnum } from "../../components";
import {
  Badge,
  Button,
  PlusIcon,
  Select,
  SelectOption,
  uesAdminGetStaffAccountsQuery,
  usePaginationControls,
} from "ui";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { mapArray, randomNum, useForm } from "utils";
import { startCase } from "lodash";
import { useDateDiff } from "hooks";
import { useRouting } from "routing";
import { AccountStatus, StaffAccountType } from "@features/API";

const Staff: NextPage = () => {
  const { t } = useTranslation();
  const { controls, pagination } = usePaginationControls();
  const { visit, getCurrentPath } = useRouting();

  const { form, inputProps, selectProps, dateInputProps } = useForm<
    Parameters<typeof uesAdminGetStaffAccountsQuery>[0]
  >({ pagination }, { pagination });
  const { data } = uesAdminGetStaffAccountsQuery(form);

  const TimeDiff = (lastActiveAt: string) => {
    const { timeUnit, value } = useDateDiff({
      from: new Date(),
      to: new Date(lastActiveAt),
    }).getSince();
    return `${value} ${timeUnit} `;
  };

  return (
    <section>
      <div className="flex justify-end">
        <Button
          onClick={() =>
            visit((r) =>
              r.addPath(getCurrentPath()).addPath("form").addPath("new")
            )
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
            inputProps: inputProps("name"),
          },
          {
            type: AdminTableCellTypeEnum.text,
            value: t("Email"),
            inputProps: inputProps("email"),
          },
          {
            type: AdminTableCellTypeEnum.custom,
            value: t("Role"),
            custom: (
              <Select {...selectProps("role")}>
                <SelectOption value={StaffAccountType.Admin}>
                  {t("Admin")}
                </SelectOption>
                <SelectOption value={StaffAccountType.Moderator}>
                  {t("Moderator")}
                </SelectOption>
              </Select>
            ),
          },
          {
            type: AdminTableCellTypeEnum.custom,
            value: t("Status"),
            custom: (
              <Select {...selectProps("status")}>
                {Object.values(AccountStatus).map((v, i) => (
                  <SelectOption key={i} value={v}>
                    {v}
                  </SelectOption>
                ))}
              </Select>
            ),
          },
          {
            type: AdminTableCellTypeEnum.date,
            value: t("Last Activity"),
            inputProps: dateInputProps("lastActivity"),
          },
        ]}
        data={mapArray(
          data,
          ({
            email,
            id,
            status,
            firstName,
            lastActiveAt,
            lastName,
            accountType,
            photo,
          }) => ({
            id,
            cols: [
              {
                type: AdminTableCellTypeEnum.checkbox,
              },
              {
                type: AdminTableCellTypeEnum.avatar,
                value: photo,
              },
              {
                value: `${firstName} ${lastName}`,
              },
              {
                value: email,
              },
              {
                value: startCase(accountType as string),
              },
              {
                type: AdminTableCellTypeEnum.custom,
                custom: (
                  <Badge
                    className="flex justify-center"
                    cases={{ off: AccountStatus.InActive }}
                    value={status}
                  >
                    {status}
                  </Badge>
                ),
              },
              {
                value: (() => {
                  TimeDiff(lastActiveAt);
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
