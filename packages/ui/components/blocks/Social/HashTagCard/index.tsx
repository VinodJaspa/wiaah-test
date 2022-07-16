import { Button, Flex, Text, Box } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { HashTagCardInfo } from "types";
import { PostAttachment } from "ui";

export interface HashTagCardProps extends HashTagCardInfo {
  onViewPost?: () => void;
}

export const HashTagCard: React.FC<HashTagCardProps> = ({
  title,
  attachment,
  onViewPost,
}) => {
  const { t } = useTranslation();
  function handleViewPostClick() {
    onViewPost && onViewPost();
  }

  return (
    <Flex
      gap="0.5rem"
      p="0.5rem"
      boxShadow={"main"}
      rounded="lg"
      //   h="30rem"
      bg="white"
      align={"center"}
      direction={"column"}
    >
      <Text
        data-testid="CardTitle"
        textTransform={"capitalize"}
        fontWeight={"semibold"}
      >
        {title}
      </Text>
      <Box
        display={"flex"}
        justifyContent="center"
        alignItems={"center"}
        bg="black"
        w="100%"
        h="25rem"
        overflow={"hidden"}
      >
        <PostAttachment
          data-testid="PostAttachment"
          fixedSize
          {...attachment}
          alt={title}
        />
      </Box>
      <Button
        data-testid="ViewPostBtn"
        onClick={handleViewPostClick}
        w="100%"
        textTransform={"capitalize"}
      >
        {t("view_post", "view post")}
      </Button>
    </Flex>
  );
};
