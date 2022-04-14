import { Flex, Avatar, Button, Text } from "@chakra-ui/react";
import { t } from "i18next";
import React from "react";
import { SubscribersUserInfo } from "types/market/Social";

export interface SubscriberCardProps extends SubscribersUserInfo {
  onFollow?: () => any;
  onProfileClick?: (profileUrl: string) => any;
}

export const SubscriberCard: React.FC<SubscriberCardProps> = ({
  avatar,
  id,
  name,
  profileUrl,
  children,
  onFollow,
  onProfileClick,
}) => {
  return (
    <Flex gap="1rem" w="100%" justify={"space-between"}>
      <Flex
        onClick={() => onProfileClick && onProfileClick(profileUrl)}
        gap="0.5rem"
      >
        <Avatar name={name} src={avatar} />
        <Text fontWeight={"semibold"}>{name}</Text>
      </Flex>
      <Button
        rounded={"full"}
        color={"white"}
        onClick={() => onFollow && onFollow()}
        _hover={{ backgroundColor: "primary.hover" }}
        _focus={{ ring: "0" }}
        backgroundColor={"primary.main"}
      >
        {t("follow", "Follow")}
      </Button>
    </Flex>
  );
};
