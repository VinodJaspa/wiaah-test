import { Divider, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { SelectPackageStep } from "ui";
export interface MembershipSectionProps {}

export const MembershipSection: React.FC<MembershipSectionProps> = () => {
  const { t } = useTranslation();
  return (
    <Flex w="100%" direction={"column"}>
      <Text fontSize={"xx-large"} fontWeight="bold">
        {t("your_membership", "Your Membership")}
      </Text>
      <Divider
        my="0.5rem"
        borderBottomWidth={"2px"}
        borderColor={"primary.main"}
      />
      <Flex
        borderWidth={"1px"}
        borderColor="blackAlpha.100"
        shadow="md"
        direction={"column"}
        py="1rem"
      >
        <SimpleGrid columns={5}>
          <Text fontSize={"md"} fontWeight="bold" px="1rem"></Text>
          <Text fontSize={"md"} fontWeight="bold" px="1rem">
            {t("package_name", "Package Name")}
          </Text>
          <Text fontSize={"md"} fontWeight="bold" px="1rem">
            {t("start_date", "Start Date")}
          </Text>
          <Text fontSize={"md"} fontWeight="bold" px="1rem">
            {t("end_date", "End Date")}
          </Text>
          <Text fontSize={"md"} fontWeight="bold" px="1rem">
            {t("status", "Status")}
          </Text>
        </SimpleGrid>
        <Divider my="0.5rem" />
        <SimpleGrid columns={5}>
          <Text color="primary.main" px="1rem" fontSize={"xs"}>
            {t("your_subscription", "Your Subscription")}
          </Text>
          <Text px="1rem" fontSize={"xs"} color="gray">
            {membershipdata.packageName}
          </Text>
          <Text px="1rem" fontSize={"xs"} color="gray">
            {new Date(membershipdata.startDate).toLocaleString("en", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </Text>
          <Text px="1rem" fontSize={"xs"} color="gray">
            {new Date(membershipdata.endDaate).toLocaleString("en", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </Text>
          <Text px="1rem" fontSize={"xs"} color="gray">
            {membershipdata.status}
          </Text>
        </SimpleGrid>
      </Flex>
      <Divider my="0.5rem" />
      <SelectPackageStep />
    </Flex>
  );
};

const membershipdata = {
  packageName: "free plan",
  startDate: new Date(Date.now()).toISOString(),
  endDaate: new Date(Date.now() + 150000).toISOString(),
  status: "active",
};
