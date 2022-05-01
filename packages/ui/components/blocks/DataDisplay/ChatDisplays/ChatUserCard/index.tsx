import { AvatarBadge, Center, Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { Avatar, EllipsisText } from "ui";
import { useRouter } from "next/router";
import { ChatUserData } from "types";
import { useTranslation } from "react-i18next";

export interface ChatUserCardProps extends ChatUserData {}

export const ChatUserCard: React.FC<ChatUserCardProps> = ({
  id,
  lastMsgSentTime,
  profilePhoto,
  status,
  typing,
  unSeenMsgs,
  name,
  lastMsg,
}) => {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <Flex
      px="1rem"
      py="0.5rem"
      cursor={"pointer"}
      _hover={{ bgColor: "gray.100" }}
      w="100%"
    >
      <HStack w="100%">
        <Avatar size={"lg"} name={name} photoSrc={profilePhoto}>
          <AvatarBadge
            boxSize={"0.8em"}
            bgColor={
              status === "online"
                ? "primary.main"
                : status === "idle"
                ? "yellow.400"
                : "gray"
            }
          />
        </Avatar>
        <Flex w="100%" direction={"column"}>
          <Text fontWeight={"bold"}>{name}</Text>
          {typing ? (
            <Text color="primary.main">{t("typing", "Typing")}</Text>
          ) : lastMsg ? (
            <EllipsisText ShowMore={false} content={lastMsg} maxLines={1} />
          ) : null}
        </Flex>
      </HStack>
      <Flex gap="0.5rem" fontSize={"xs"} align={"end"} direction={"column"}>
        {lastMsgSentTime && (
          <Text fontWeight="semibold" color="gray" whiteSpace={"nowrap"}>
            {new Date(lastMsgSentTime).toLocaleString(router.locale, {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </Text>
        )}
        {unSeenMsgs > 0 && (
          <Center
            w="1.5em"
            h="1.5em"
            color="white"
            rounded={"full"}
            p="0.25em"
            bg="red.600"
          >
            <Text>{unSeenMsgs}</Text>
          </Center>
        )}
      </Flex>
    </Flex>
  );
};
