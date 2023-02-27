import { AdminListTable, AdminTableCellTypeEnum } from "../../components";
import {
  Badge,
  Button,
  Pagination,
  Select,
  SelectOption,
  useAdminAcceptWithdrawalRequestMutation,
  useAdminGetWithdrawalsQuery,
  usePaginationControls,
} from "ui";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { mapArray, setTestid, useForm } from "utils";
import { startCase } from "lodash";
import { ImCheckmark } from "react-icons/im";
import { WithdrawalStatus } from "@features/API";

const withdrawal: NextPage = () => {
  const { t } = useTranslation();

  const { pagination, controls } = usePaginationControls();
  const { form } = useForm<Parameters<typeof useAdminGetWithdrawalsQuery>[0]>(
    { pagination },
    { pagination }
  );
  const { data: requests } = useAdminGetWithdrawalsQuery(form);

  const { mutate } = useAdminAcceptWithdrawalRequestMutation();

  return (
    <section>
      <AdminListTable
        {...setTestid("withdrawal-table")}
        title={t("Withdrawals List")}
        props={{ TrProps: { className: "border-b border-b-gray-300" } }}
        data={mapArray(
          requests,
          ({ amount, user, id, processedAt, status, requestedAt, userId }) => ({
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
                value: user?.shop?.name,
              },
              {
                type: AdminTableCellTypeEnum.text,
                value: user?.profile?.username,
              },
              {
                type: AdminTableCellTypeEnum.text,
                value: user?.email,
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
                      off: WithdrawalStatus.Pending,
                      fail: WithdrawalStatus.Refused,
                    }}
                    value={status}
                    className="flex justify-center"
                  >
                    {startCase(status)}
                  </Badge>
                ),
              },
              {
                type: AdminTableCellTypeEnum.action,
                actionBtns:
                  status === "pending"
                    ? [
                        <Button
                          {...setTestid("withdrawal-accept-btn")}
                          onClick={() => mutate(id)}
                          center
                          className="w-8 h-8"
                        >
                          <ImCheckmark />
                        </Button>,
                      ]
                    : [],
                value: amount.toString(),
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
                {mapArray(Object.values(WithdrawalStatus), (s, i) => (
                  <SelectOption value={s} key={i}>
                    {startCase(s)}
                  </SelectOption>
                ))}
              </Select>
            ),
          },
          {
            type: AdminTableCellTypeEnum.action,
            value: t("Actiom"),
          },
        ]}
        pagination={controls}
      />
    </section>
  );
};

export default withdrawal;
