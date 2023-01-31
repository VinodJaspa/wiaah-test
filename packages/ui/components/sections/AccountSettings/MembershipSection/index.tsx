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
  PriceDisplay,
} from "@UI";
import { PriceType } from "types";
import {
  CommissionType,
  useGetMembershipsQuery,
  useGetMyMembershipQuery,
} from "@features/Membership";
import { mapArray } from "utils";

export interface MembershipSectionProps {}

export const MembershipSection: React.FC<MembershipSectionProps> = () => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();
  const { data } = useGetMembershipsQuery();
  const { data: myMembership } = useGetMyMembershipQuery();

  return (
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
              <Th>{t("End Date")}</Th>
              <Th>{t("price")}</Th>
            </Tr>
            <Tr>
              <Td>{myMembership?.membership.name}</Td>
              <Td>
                {myMembership?.endAt
                  ? new Date(myMembership?.endAt).toLocaleString("en", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : null}
              </Td>
              <Td>
                {myMembership?.membership.turnover_rules.at(0)
                  ?.commissionType === CommissionType.Fixed ? (
                  <PriceDisplay
                    price={
                      myMembership.membership.turnover_rules.at(0)
                        ?.commission || 0
                    }
                  />
                ) : (
                  <>
                    %
                    {myMembership?.membership.turnover_rules.at(0)
                      ?.commission || 0}
                  </>
                )}
              </Td>
            </Tr>
          </Table>
        </TableContainer>
      </div>
      <Divider className="my-2" />
      {isMobile ? (
        <Tabs>
          {({ currentTabIdx, setCurrentTabIdx }) => (
            <>
              <TabsHeader>
                <TabTitle
                  className={`${
                    currentTabIdx === 0 ? "text-black" : "text-gray-400"
                  }`}
                  onClick={() => setCurrentTabIdx(0)}
                >
                  {t("Free Plan")}
                </TabTitle>
                <TabTitle
                  className={`${
                    currentTabIdx === 1 ? "text-black" : "text-gray-400"
                  }`}
                  onClick={() => setCurrentTabIdx(1)}
                >
                  {t("Paid plan")}
                </TabTitle>
              </TabsHeader>
              <TabList>
                {mapArray(data, (data) => (
                  <SubscriptionPlanCard
                    price={data.turnover_rules[0].commission}
                    benifits={data.includings.map((data) => data.title)}
                  />
                ))}
              </TabList>
            </>
          )}
        </Tabs>
      ) : (
        <SelectPackageStep value="" onChange={() => {}} shopType="" />
      )}
    </div>
  );
};

const membershipdata: {
  packageName: string;
  endDate: string;
  price: PriceType;
} = {
  packageName: "free plan",
  endDate: new Date(Date.now() + 150000).toISOString(),
  price: {
    amount: 16,
    currency: "CHF",
  },
};
