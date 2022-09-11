import { Button, Flex, Text, Box } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { HashTagCardInfo } from "types";
import { PostAttachment, PostCard } from "ui";

export interface HashTagCardProps extends HashTagCardInfo {
  onViewPost?: () => void;
}

export const HashTagCard: React.FC<HashTagCardProps> = ({
  title,
  postInfo,
  profileInfo,
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
        w="100%"
        h="25rem"
      >
        <PostCard postInfo={postInfo} profileInfo={profileInfo} />
      </Box>
    </Flex>
  );
};
