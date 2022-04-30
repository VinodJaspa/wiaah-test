import { Flex, HStack, Button, Text, FlexProps, Icon } from "@chakra-ui/react";
import React from "react";
import { Avatar, EllipsisText, HashTags } from "ui";
import { useTranslation } from "react-i18next";
import { HiLocationMarker } from "react-icons/hi";
import { HiUser } from "react-icons/hi";

export interface ActionHeaderProps extends FlexProps {
  userName: string;
  subName?: string;
  userThumbnail: string;
  actionTitle?: string;
  actionHashtags: string[];
  actionLocation?: string;
  onLocationClick?: (location: string) => any;
  onProfileClick?: (name: string) => any;
  onTitleClick?: (title: string) => any;
}

export const ActionHeader: React.FC<ActionHeaderProps> = ({
  actionHashtags,
  actionTitle,
  userName,
  userThumbnail,
  actionLocation,
  subName,
  onLocationClick,
  onTitleClick,
  onProfileClick,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <Flex {...props} gap="0.25rem" w="100%" direction={"column"}>
      <HStack w="100%" justify={"space-between"}>
        <HStack>
          <Avatar
            cursor={"pointer"}
            onClick={() => onProfileClick && onProfileClick(userName)}
            size="md"
            name={userName}
            photoSrc={userThumbnail}
          />
          <Flex direction={"column"}>
            <Text>{userName}</Text>

            {subName && (
              <Text
                cursor={"pointer"}
                onClick={() => onTitleClick && onTitleClick(subName)}
              >
                {subName}
              </Text>
            )}
          </Flex>
        </HStack>
        <Button size={"sm"} textTransform={"capitalize"}>
          {t("follow", "follow")}
        </Button>
      </HStack>
      {actionTitle && <EllipsisText maxLines={2} content={actionTitle} />}
      <HashTags tags={actionHashtags || []} />
      <HStack fontSize={"x-large"}>
        {actionLocation && (
          <HStack
            cursor={"pointer"}
            onClick={() => onLocationClick && onLocationClick(actionLocation)}
          >
            <Icon as={HiLocationMarker} />
            <Text fontSize={"md"}>{actionLocation}</Text>
          </HStack>
        )}
        {userName && (
          <HStack
            cursor={"pointer"}
            onClick={() => onProfileClick && onProfileClick(userName)}
          >
            <Icon as={HiUser} />
            <Text fontSize={"md"}>{userName}</Text>
          </HStack>
        )}
      </HStack>
    </Flex>
  );
};
