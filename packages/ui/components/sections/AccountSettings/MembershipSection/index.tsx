import React from "react";
import { useTranslation } from "react-i18next";
import { useResponsive } from "hooks";
import {
  SelectPackageStep,
  SectionHeader,
  Divider,
  Table,
  Tr,
  Td,
  Th,
  TableContainer,
  Tabs,
  TabTitle,
  TabsHeader,
  TabList,
  SubscriptionPlanCard,
  HStack,
  ArrowLeftIcon,
} from "@UI";
import {
  useGetMembershipsQuery,
  useGetMyMembershipQuery,
} from "@features/Membership";
import { mapArray } from "utils";
import { CommissionOn, MembershipTurnoverRuleType } from "@features/API";
import { startCase } from "lodash";
import { useRouting } from "@UI/../routing";

function getObjectByAmount<
  TObj extends Record<string, any>,
  Tkey extends keyof TObj,
>(arr: TObj[], currentAmount: number, key: Tkey) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (currentAmount >= arr[i][key] && currentAmount < arr[i + 1][key]) {
      return arr[i];
    }
  }

  // If current amount is higher than the highest amount in the array, return the last object
  return arr[arr.length - 1];
}

export interface MembershipSectionProps {}

type FormatedMembershipExpense = {
  name: string;
  usage: number;
  usageType: string;
  price: number;
  key: string;
};

export const MembershipSection: React.FC<MembershipSectionProps> = () => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const { isMobile } = useResponsive();
  const { back } = useRouting();
  const { data } = useGetMembershipsQuery();
  const { data: myMembership } = useGetMyMembershipQuery();

  const formatedExpenses = myMembership?.membership.turnover_rules.reduce(
    (acc, curr, i) => {
      const filtered = acc.filter(
        (v) => v.key !== curr.key,
      ) as FormatedMembershipExpense[];
      const target = acc.find(
        (v) => v.key === curr.key,
      ) as FormatedMembershipExpense;

      const currentTier = getObjectByAmount(
        myMembership.membership.turnover_rules
          .filter((v) => v.key === curr.key)
          .sort((a, b) => a.usage! - b.usage!),
        myMembership.usage,
        "usage",
      );

      return filtered.concat(
        target
          ? [
              {
                ...target,
                price: currentTier.commission,
              } as FormatedMembershipExpense,
            ]
          : [
              {
                name: myMembership.membership.name,
                key: curr.key,
                price: curr.commission,
                usage:
                  curr.type === MembershipTurnoverRuleType.Flat
                    ? 1
                    : myMembership.usage,
                usageType: startCase(curr.commission.toString()),
              },
            ],
      );
    },
    [] as FormatedMembershipExpense[],
  );

  return isMobile ? (
    <div className="flex flex-col gap-4 p-2">
      <HStack className="relative justify-center">
        <p className="text-lg font-semibold">{t("Your Membership")}</p>
        <button
          className="absolute top-1/2 -translate-y-1/2 left-1"
          onClick={() => back()}
        >
          <ArrowLeftIcon className="text-lg" />
        </button>
      </HStack>

      <Table
        TdProps={{ align: "center" }}
        ThProps={{ className: "font-semibold text-sm" }}
      >
        <Tr>
          <Th>{t("Package Name")}</Th>
          <Th>{t("End Date")}</Th>
          <Th>{t("Price")}</Th>
        </Tr>
        {mapArray(formatedExpenses, (v:any, i) => (
          <Tr>
            <Td className="text-primary">{v.name}</Td>
            <Td>{new Date(myMembership?.endAt || "").toDateString()}</Td>
            <Td>{v?.price}</Td>
          </Tr>
        ))}
      </Table>

      <div className="flex flex-col gap-4">
        <p className="text-lg font-medium">{t("Select a plan")}</p>
        <SelectPackageStep shopType={""} onChange={() => {}} value="" />
      </div>
    </div>
  ) : (
    <div className="w-full flex flex-col">
      <SectionHeader sectionTitle={t("Your Membership")} />
      <div className="border-[1px] border-black border-opacity-10 shadow-md flex flex-col py-4">
        <TableContainer>
          <Table
            ThProps={{
              className: "whitespace-nowrap",
            }}
            TdProps={{
              className: "first:text-primary text-gray-700",
            }}
          >
            <Tr>
              <Th>{t("Package Name")}</Th>
              <Th>{t("Usage")}</Th>
              <Th>{t("Commission on")}</Th>
              <Th>{t("Price")}</Th>
              <Th>{t("End Date")}</Th>
            </Tr>
            {mapArray(formatedExpenses, (v:any, i) => (
              <Tr>
                <Td>{v?.name}</Td>
                <Td>{v?.usage}</Td>
                <Td>{v?.usageType}</Td>
                <Td>{v?.price}</Td>
                <Td>{new Date(myMembership?.endAt || "").toDateString()}</Td>
              </Tr>
            ))}
          </Table>
        </TableContainer>
      </div>
      <Divider className="my-2" />

      <SelectPackageStep shopType={""} onChange={() => {}} value="" />
    </div>
  );
};
