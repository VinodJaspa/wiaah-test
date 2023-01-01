import { Flex, Button, Text } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { SubscribersUserInfo } from "types/market/Social";
import { Avatar } from "@UI";

export interface SubscriberCardProps extends SubscribersUserInfo {
  onFollow?: () => any;
  onProfileClick?: (profileUrl: string) => any;
}

export const SubscriberCard: React.FC<SubscriberCardProps> = ({
  avatar,
  name,
  profileUrl,
  children,
  onFollow,
  onProfileClick,
}) => {
  const { t } = useTranslation();
  return (
    <Flex gap="1rem" w="100%" justify={"space-between"}>
      <Flex
        data-testid="UserInfo"
        onClick={() => onProfileClick && onProfileClick(profileUrl)}
        gap="0.5rem"
      >
        <Avatar data-testid="UserPhoto" name={name} photoSrc={avatar} />
        <Text data-testid="Username" fontWeight={"semibold"}>
          {name}
        </Text>
      </Flex>
      <Button
        data-testid="FollowBtn"
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
