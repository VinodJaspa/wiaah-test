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
export interface MembershipSectionProps {}

export const MembershipSection: React.FC<MembershipSectionProps> = () => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();
  return (
    <div className="w-full flex flex-col">
      <SectionHeader sectionTitle={t("your_membership", "Your Membership")} />
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
              <Th>{t("package_name", "Package Name")}</Th>
              <Th>{t("end_date", "End Date")}</Th>
              <Th>{t("price", "price")}</Th>
            </Tr>
            <Tr>
              <Td>{membershipdata.packageName}</Td>
              <Td>
                {new Date(membershipdata.endDate).toLocaleString("en", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </Td>
              <Td>
                <PriceDisplay priceObject={membershipdata.price} />
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
                  {t("free_plan", "Free Plan")}
                </TabTitle>
                <TabTitle
                  className={`${
                    currentTabIdx === 1 ? "text-black" : "text-gray-400"
                  }`}
                  onClick={() => setCurrentTabIdx(1)}
                >
                  {t("paid_plan", "Paid plan")}
                </TabTitle>
              </TabsHeader>
              <TabList>
                <SubscriptionPlanCard
                  price={{
                    amount: 0,
                    currency: "CHF",
                  }}
                  benifits={[
                    `$0 / ${t("no_limit", "No limit")}`,
                    `20% ${t(
                      "commission_on_each_sale",
                      "Commission on each sale"
                    )}`,
                  ]}
                />
                <SubscriptionPlanCard
                  price={{
                    amount: 500,
                    currency: "CHF",
                  }}
                  benifits={[
                    `$500 / ${t("no_limit", "No limit")}`,
                    `${t(
                      "no_commission_on_each_sale",
                      "No commission on each sale"
                    )}`,
                  ]}
                />
              </TabList>
            </>
          )}
        </Tabs>
      ) : (
        <SelectPackageStep />
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
