import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdOutlineReply, MdReply } from "react-icons/md";
import { PostComment } from "types/market/Social";
import { PostAttachment, Verified, EllipsisText } from "ui";
import { useCommentReportModal, useDateDiff, useLoginPopup } from "ui/Hooks";
import { HashTags } from "../HashTags";

export interface PostCommentCardProps extends PostComment {
  onReply?: (message: string) => void;
  onLike?: () => void;
  main?: boolean;
}

export const PostCommentCard: React.FC<PostCommentCardProps> = ({
  content,
  createdAt,
  likes,
  replies,
  attachment,
  user,
  hashTags,
  main,
  id,
}) => {
  const { openModalWithId } = useCommentReportModal();
  const { t } = useTranslation();
  const { getSince } = useDateDiff({
    from: new Date(createdAt),
    to: new Date(Date.now()),
  });
  const since = getSince();

  function handleMoreCommentOptions() {}
  const { OpenLoginPopup } = useLoginPopup();
  function handleOpenLogin() {
    OpenLoginPopup;
  }
  return (
    <Flex bg="white" w="100%" gap={"0.5rem"}>
      <Avatar bgColor="black" src={user.thumbnail} name={user.name} />
      <Flex w="100%" direction={"column"}>
        <Flex
          w="100%"
          px="0.5rem"
          rounded={"xl"}
          bg={main ? "white" : "primary.light"}
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
            <HStack>
              <Menu>
                <MenuButton>
                  {/* <Button
                    onClick={() => {
                      openModalWithId(id);
                    }}
                    size={"xs"}

                  >
                    {t("report", "Report")}
                  </Button> */}
                  <Icon
                    cursor={"pointer"}
                    onClick={handleMoreCommentOptions}
                    fontSize={"x-large"}
                    fill={"primary.main"}
                    as={HiDotsHorizontal}
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <Text onClick={() => openModalWithId(id)}>
                      {t("report_user", "Report User")}
                    </Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
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
          {attachment && (
            <PostAttachment
              src={attachment.src}
              type={attachment.type}
              alt={user.name}
            />
          )}
        </Flex>
        <Flex px="0.5rem" w="100%" align={"center"} justify={"space-between"}>
          {/* like,reply, and replies count */}
          {!main && (
            <HStack>
              <Text
                onClick={handleOpenLogin}
                textTransform={"capitalize"}
                color="primary.main"
              >
                {t("like", "like")}
              </Text>
              <Text onClick={handleOpenLogin} textTransform={"capitalize"}>
                {t("reply", "reply")}
              </Text>
              <Flex gap="0.2rem" h="100%" align={"end"}>
                <Icon fill="primary.main" fontSize={"lg"} as={MdOutlineReply} />
                <Text color="gray" textTransform={"capitalize"}>
                  {replies} {t("replies", "replies")}
                </Text>
              </Flex>
            </HStack>
          )}
          <HStack fontSize={"xs"} color="gray">
            {!main && (
              <>
                <Text>{likes}</Text>
                <Text textTransform={"capitalize"}>
                  {t("likes", "likes")}
                </Text>{" "}
              </>
            )}
            <Text>
              {!main && "|"} {since.value} {since.timeUnit} {t("ago", "ago")}
            </Text>
          </HStack>
        </Flex>
      </Flex>
    </Flex>
  );
};
