import React from "react";
import { useTranslation } from "react-i18next";
import {
  SelectPackageStep,
  SectionHeader,
  Divider,
  Table,
  Tr,
  Td,
  Th,
} from "ui";
export interface MembershipSectionProps {}

export const MembershipSection: React.FC<MembershipSectionProps> = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full flex flex-col">
      <SectionHeader sectionTitle={t("your_membership", "Your Membership")} />
      <div className="border-[1px] border-black border-opacity-10 shadow-md flex flex-col py-4">
        <Table
          ThProps={{
            className: "whitespace-nowrap",
          }}
          TdProps={{
            className: "first:text-primary text-gray-700",
          }}
        >
          <Tr>
            <Th></Th>
            <Th>{t("package_name", "Package Name")}</Th>
            <Th>{t("start_date", "Start Date")}</Th>
            <Th>{t("end_date", "End Date")}</Th>
            <Th>{t("status", "Status")}</Th>
          </Tr>
          <Tr>
            <Td>{t("your_subscription", "Your Subscription")}</Td>
            <Td>{membershipdata.packageName}</Td>
            <Td>
              {new Date(membershipdata.startDate).toLocaleString("en", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </Td>
            <Td>
              {new Date(membershipdata.endDaate).toLocaleString("en", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </Td>
            <Td>{membershipdata.status}</Td>
          </Tr>
        </Table>
      </div>
      <Divider className="my-2" />
      <SelectPackageStep />
    </div>
  );
};

const membershipdata = {
  packageName: "free plan",
  startDate: new Date(Date.now()).toISOString(),
  endDaate: new Date(Date.now() + 150000).toISOString(),
  status: "active",
};
