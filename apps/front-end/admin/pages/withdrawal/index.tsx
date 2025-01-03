import { AdminListTable, AdminTableCellTypeEnum } from "../../components";
import {
  AdminGetWithdrawalsQuery,
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
import { AccountType, WithdrawalStatus } from "@features/API";
import Head from "next/head";

const Withdrawal: NextPage = () => {
  const { t } = useTranslation();

  const { pagination, controls } = usePaginationControls();
  const { form, selectProps, inputProps, dateInputProps } = useForm<
    Parameters<typeof useAdminGetWithdrawalsQuery>[0]
  >({ pagination }, { pagination });
  const { data: _requests } = useAdminGetWithdrawalsQuery(form);
  const requests = FAKE_REQUESTS;

  const { mutate } = useAdminAcceptWithdrawalRequestMutation();

  return (
    <React.Fragment>
      <Head>
        <title>Admin | Withdrawls</title>
      </Head>
      <section>
        <AdminListTable
          {...setTestid("withdrawal-table")}
          title={t("Withdrawals List")}
          props={{ TrProps: { className: "border-b border-b-gray-300" } }}
          data={mapArray(
            requests,
            ({
              amount,
              user,
              id,
              processedAt,
              status,
              requestedAt,
              userId,
            }) => ({
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
                  value: user?.accountType,
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
                          key={id}
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
            }),
          )}
          headers={[
            {
              type: AdminTableCellTypeEnum.text,
              value: t("Withdrawal ID"),
              inputProps: inputProps("id"),
            },
            {
              type: AdminTableCellTypeEnum.date,
              value: t("Requested Date"),
              inputProps: dateInputProps("requestedAt"),
            },
            {
              type: AdminTableCellTypeEnum.date,
              value: t("Processed Date"),
              inputProps: dateInputProps("processedAt"),
            },
            {
              type: AdminTableCellTypeEnum.text,
              value: t("Shop"),
              inputProps: inputProps("shop"),
            },
            {
              type: AdminTableCellTypeEnum.custom,
              value: t("user type"),
              custom: (
                <Select {...selectProps("accountType")}>
                  <SelectOption value={AccountType.Seller}>
                    {AccountType.Seller}
                  </SelectOption>
                  <SelectOption value={AccountType.Buyer}>
                    {AccountType.Buyer}
                  </SelectOption>
                </Select>
              ),
            },
            {
              type: AdminTableCellTypeEnum.text,
              value: t("user Name"),
              inputProps: inputProps("name"),
            },
            {
              type: AdminTableCellTypeEnum.text,
              value: t("Email"),
              inputProps: inputProps("email"),
            },
            {
              type: AdminTableCellTypeEnum.number,
              value: t("Amount"),
              inputProps: inputProps("amount"),
            },
            {
              type: AdminTableCellTypeEnum.custom,
              value: t("Status"),
              custom: (
                <Select {...selectProps("status")}>
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
    </React.Fragment>
  );
};

export default Withdrawal;

const FAKE_REQUESTS: AdminGetWithdrawalsQuery["getWithdrawalRequests"] = [
  {
    __typename: "WithdrawalRequest",
    amount: 1000,
    id: "wr1",
    processedAt: "2023-01-01T00:00:00Z",
    status: WithdrawalStatus.Processed,
    userId: "user1",
    requestedAt: "2022-12-01T00:00:00Z",
    user: {
      __typename: "Account",
      email: "user1@example.com",
      accountType: AccountType.Admin,
      shop: {
        __typename: "Shop",
        name: "Shop 1",
      },
      profile: {
        __typename: "Profile",
        username: "user1",
      },
    },
  },
  {
    __typename: "WithdrawalRequest",
    amount: 500,
    id: "wr2",
    processedAt: null,
    status: WithdrawalStatus.Processed,
    userId: "user2",
    requestedAt: "2023-02-01T00:00:00Z",
    user: {
      __typename: "Account",
      email: "user2@example.com",
      accountType: AccountType.Seller,
      shop: {
        __typename: "Shop",
        name: "Shop 2",
      },
      profile: null,
    },
  },
  {
    __typename: "WithdrawalRequest",
    amount: 1500,
    id: "wr3",
    processedAt: "2023-03-01T00:00:00Z",
    status: WithdrawalStatus.Pending,
    userId: "user3",
    requestedAt: "2023-01-15T00:00:00Z",
    user: {
      __typename: "Account",
      email: "user3@example.com",
      accountType: AccountType.Admin,
      shop: {
        __typename: "Shop",
        name: "Shop 3",
      },
      profile: {
        __typename: "Profile",
        username: "user3",
      },
    },
  },
];
