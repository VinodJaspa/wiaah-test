import { AdminListTable, AdminTableCellTypeEnum } from "@components";
import {
  Badge,
  Button,
  HStack,
  PriceDisplay,
  Select,
  SelectOption,
  ItemsPagination,
  Input,
  useAdminGetMembershipSubscriptionQuery,
  AdminGetMembershipSubscribersQuery,
  Pagination,
} from "ui";
import React from "react";
import { useTranslation } from "react-i18next";
import { mapArray, useForm } from "utils";
import { startCase } from "lodash";
import { usePaginationControls } from "@blocks";
import {
  CommissionType,
  MembershipRecurring,
  MembershipSubscriptionStatus,
} from "@features/API";
import Head from "next/head";

const History: React.FC = () => {
  const { t }: { t: (key: string, ...args: any[]) => string } =
    useTranslation();

  const { controls, pagination } = usePaginationControls();
  const { form, inputProps } = useForm<
    Parameters<typeof useAdminGetMembershipSubscriptionQuery>[0]
  >({ pagination }, { pagination });
  const { data: _subs } = useAdminGetMembershipSubscriptionQuery(form);
  const subs = FAKE_SUBS;

  return (
    <React.Fragment>
      <Head>
        <title>Admin | Subscription Plans History</title>
      </Head>
      <div className="flex flex-col gap-2 w-full">
        <HStack className="justify-between items-start">
          <HStack>
            <Select>
              <SelectOption value={"bulk"}>{t("Bulk Actions")}</SelectOption>
            </Select>
            <Button outline>{t("Apply")}</Button>
            <Button outline className="whitespace-nowrap">
              {t("Export CSV")}
            </Button>
          </HStack>
          <div className="flex flex-col gap-2">
            <HStack className="text-xs">
              <Input />
              <Button className="whitespace-nowrap" outline>
                {t("Search Order")}
              </Button>
            </HStack>
          </div>
        </HStack>
        <AdminListTable
          headers={[
            {
              type: AdminTableCellTypeEnum.checkbox,
            },
            {
              type: AdminTableCellTypeEnum.text,
              value: t("Subscription ID"),
            },
            {
              type: AdminTableCellTypeEnum.text,
              value: t("Parent Order ID"),
            },
            {
              type: AdminTableCellTypeEnum.text,
              value: t("Status"),
              props: <>{inputProps("status")}</>,
            },
            {
              type: AdminTableCellTypeEnum.text,
              value: t("Plan Name"),
              props: <>{inputProps("name")}</>,
            },
            {
              type: AdminTableCellTypeEnum.text,
              value: t("Recurring Amount"),
            },
            {
              type: AdminTableCellTypeEnum.text,
              value: t("User Name"),
              props: <>{inputProps("username")}</>,
            },
            {
              value: t("Next Payment Date"),
              type: AdminTableCellTypeEnum.text,
            },
            {
              value: t("Subscription Expiry Date"),
              type: AdminTableCellTypeEnum.text,
              props: <>{inputProps("expiryDate")}</>,
            },
          ]}
          data={mapArray(
            subs,
            ({ endAt, membership, usage, subscriber, userId, status }) => ({
              cols: [
                {
                  type: AdminTableCellTypeEnum.checkbox,
                },
                {
                  value: userId,
                },
                {
                  value: membership.id,
                },
                {
                  type: AdminTableCellTypeEnum.custom,
                  custom: (
                    <Badge
                      value={status}
                      cases={{
                        fail: MembershipSubscriptionStatus.Expired,
                        off: MembershipSubscriptionStatus.Pending,
                      }}
                      className="w-fit"
                    >
                      {startCase(status)}
                    </Badge>
                  ),
                },
                {
                  value: membership.name,
                },
                {
                  type: AdminTableCellTypeEnum.custom,
                  custom: (
                    <HStack>
                      <PriceDisplay
                        price={membership.turnover_rules
                          .filter((rule) => rule.usage > usage)
                          .sort((a, b) => a.usage - b.usage)
                          .map((rule) => rule.commission)
                          .find((commission) => commission !== undefined)}
                      />
                      /
                      <p>
                        {membership.recurring} {t("days")}
                      </p>
                    </HStack>
                  ),
                },
                {
                  value: `${subscriber?.firstName} ${subscriber?.lastName}`,
                },
                {
                  value: new Date(endAt).toDateString(),
                },
                {
                  value: new Date(endAt).toDateString(),
                },
              ],
              id: userId,
            }),
          )}
          title={t("Subscription List")}
          contain
        />
        <Pagination controls={controls} />
      </div>
    </React.Fragment>
  );
};

export default History;

const FAKE_SUBS: AdminGetMembershipSubscribersQuery["adminGetMembershipSubscriptions"] =
  [
    {
      __typename: "MembershipSubscription",
      endAt: "2024-12-31T23:59:59Z",
      membershipId: "1",
      startAt: "2024-01-01T00:00:00Z",
      userId: "123",
      usage: 2,
      status: MembershipSubscriptionStatus.Active,
      membership: {
        __typename: "Membership",
        name: "Gold Membership",
        recurring: MembershipRecurring.Day,
        sortOrder: 1,
        id: "1",
        turnover_rules: [
          {
            __typename: "MembershipTurnoverRule",
            commission: 10,
            commissionType: CommissionType.Fixed,
            id: "1",
            usage: 3,
          },
          {
            __typename: "MembershipTurnoverRule",
            commission: 20,
            commissionType: CommissionType.Fixed,
            id: "2",
            usage: 2,
          },
        ],
      },
      subscriber: {
        __typename: "Account",
        firstName: "John",
        lastName: "Doe",
      },
    },
    {
      __typename: "MembershipSubscription",
      endAt: "2025-12-31T23:59:59Z",
      membershipId: "2",
      startAt: "2025-01-01T00:00:00Z",
      userId: "456",
      usage: 2,
      status: MembershipSubscriptionStatus.Active,
      membership: {
        __typename: "Membership",
        name: "Silver Membership",
        recurring: MembershipRecurring.Day,
        sortOrder: 2,
        id: "2",
        turnover_rules: [
          {
            __typename: "MembershipTurnoverRule",
            commission: 15,
            commissionType: CommissionType.Fixed,
            id: "3",
            usage: 2,
          },
        ],
      },
      subscriber: {
        __typename: "Account",
        firstName: "Jane",
        lastName: "Smith",
      },
    },
  ];
