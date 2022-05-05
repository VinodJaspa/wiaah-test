import {
  Flex,
  Avatar,
  HStack,
  Icon,
  Box,
  Text,
  Divider,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdOutlineReply } from "react-icons/md";
import { CommentData } from "types";
import {
  useDateDiff,
  useLoginPopup,
  EllipsisText,
  Verified,
  HashTags,
  PostAttachment,
} from "ui";

export interface CommentAltProps extends CommentData {
  main?: boolean;
}

export const CommentAlt: React.FC<CommentAltProps> = ({
  content,
  createdAt,
  hashTags,
  user,
  description,
  main,
}) => {
  const { t } = useTranslation();
  const { getSince } = useDateDiff({
    from: new Date(createdAt),
    to: new Date(Date.now()),
  });
  const since = getSince();

  function handleMoreCommentOptions() {}

  return (
    <Flex w="100%" gap={"1rem"}>
      <Avatar bgColor="black" src={user.thumbnail} name={user.name} />
      <Flex w="100%" direction={"column"}>
        <Flex
          w="100%"
          // px="0.5rem"
          rounded={"xl"}
          bg={main ? "white" : "primary.light"}
          p="0.5rem"
          pb="0.5rem"
          direction={"column"}
        >
          <HStack justify={"space-between"}>
            <HStack>
              <Text fontSize={"lg"} fontWeight={"bold"}>
                {user.name}
              </Text>
              {user.verifed && <Icon as={Verified} />}
            </HStack>
            <Icon
              cursor={"pointer"}
              onClick={handleMoreCommentOptions}
              fontSize={"x-large"}
              fill={"primary.main"}
              as={HiDotsHorizontal}
            />
          </HStack>
          <Box py="0.5rem">
            <EllipsisText
              showMoreColor={main ? "white" : undefined}
              content={content}
              maxLines={4}
            />
          </Box>

          {hashTags && (
            <HashTags
              style={{ mb: "0.5rem" }}
              color="primary.main"
              tags={hashTags}
            />
          )}
        </Flex>
        <Text>
          {since.value} {since.timeUnit} {t("ago", "ago")}
        </Text>
      </Flex>
    </Flex>
  );
};
