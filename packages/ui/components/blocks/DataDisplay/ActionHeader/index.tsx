import { Flex, HStack, Button, Text, FlexProps } from "@chakra-ui/react";
import React from "react";
import { Avatar, EllipsisText, HashTags } from "ui";
import { useTranslation } from "react-i18next";

export interface ActionHeaderProps extends FlexProps {
  userName: string;
  userThumbnail: string;
  actionTitle: string;
  actionHashtags: string[];
}

export const ActionHeader: React.FC<ActionHeaderProps> = ({
  actionHashtags,
  actionTitle,
  userName,
  userThumbnail,
  ...props
}) => {
  const { t } = useTranslation();
  return (
    <Flex {...props} gap="0rem" w="100%" direction={"column"}>
      <HStack w="100%" justify={"space-between"}>
        <HStack>
          <Avatar size="md" name={userName} photoSrc={userThumbnail} />
          <Text>Wiaah</Text>
        </HStack>
        <Button size={"sm"} textTransform={"capitalize"}>
          {t("follow", "follow")}
        </Button>
      </HStack>
      <EllipsisText maxLines={2} content={actionTitle} />
      <HashTags tags={actionHashtags || []} />
    </Flex>
  );
};
