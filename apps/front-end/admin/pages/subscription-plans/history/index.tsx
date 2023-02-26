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
} from "ui";
import React from "react";
import { useTranslation } from "react-i18next";
import { mapArray, useForm } from "utils";
import { startCase } from "lodash";
import { usePaginationControls } from "@blocks";
import { MembershipSubscriptionStatus } from "@features/API";

const History: React.FC = () => {
  const { t } = useTranslation();

  const { controls, pagination } = usePaginationControls();
  const { form, inputProps } = useForm<
    Parameters<typeof useAdminGetMembershipSubscriptionQuery>[0]
  >({ pagination }, { pagination });
  const { data: subs } = useAdminGetMembershipSubscriptionQuery(form);

  return (
    <div className="flex flex-col gap-2 w-full">
      <HStack className="justify-between items-start">
        <HStack>
          <Select>
            <SelectOption value={"bulk"}>{t("Bulk Actions")}</SelectOption>
          </Select>
          <Button outline>{t("Apply")}</Button>
          <Button outline>{t("Export CSV")}</Button>
        </HStack>
        <div className="flex flex-col gap-2">
          <HStack className="text-xs">
            <Input />
            <Button className="whitespace-nowrap" outline>
              {t("Search Order")}
            </Button>
          </HStack>
          <ItemsPagination controls={controls} />
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
            props: inputProps("status"),
          },
          {
            type: AdminTableCellTypeEnum.text,
            value: t("Plan Name"),
            props: inputProps("name"),
          },
          {
            type: AdminTableCellTypeEnum.text,
            value: t("Recurring Amount"),
          },
          {
            type: AdminTableCellTypeEnum.text,
            value: t("User Name"),
            props: inputProps("username"),
          },
          {
            value: t("Next Payment Date"),
            type: AdminTableCellTypeEnum.text,
          },
          {
            value: t("Subscription Expiry Date"),
            type: AdminTableCellTypeEnum.text,
            props: inputProps("expiryDate"),
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
                      price={
                        membership.turnover_rules
                          .sort((a, b) => a.usage - b.usage)
                          .find((v) => v.usage > usage).commission
                      }
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
          })
        )}
        title={t("Subscription List")}
        contain
      />
      <ItemsPagination controls={controls} />
    </div>
  );
};

export default History;
