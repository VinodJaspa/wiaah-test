import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { ChatMessageType } from "types";
import { useUserData, DisplayDate, useLocale, Avatar } from "ui";
import { ChatMessageAttachment } from "ui";

export interface ChatMessageProps {
  messageData: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ messageData }) => {
  if (!messageData) return null;
  const { locale } = useLocale();
  const { user } = useUserData();
  const { t } = useTranslation();

  const {
    id,
    sendDate,
    username,
    messageAttachments,
    messageContent,
    userPhoto,
  } = messageData;
  const isUser = user && user.id === id;

  const justifyPos = isUser ? "end" : "start";

  const alignPos = isUser ? "end" : "start";

  const justifyDir = isUser ? "row" : "row-reverse";

  const name = isUser ? t("you", "You") : username;

  const msgBgColor = isUser ? "primary.main" : "lightGray";
  const msgTextColor = isUser ? "white" : "black";
  const msgRadius = isUser ? "0.5em 0em 0.5em 0.5em" : "0em 0.5em 0.5em 0.5em";
  return (
    <Flex w="100%" justify={justifyPos}>
      <Flex gap="0.5rem" flexDirection={justifyDir} justify={justifyPos}>
        <VStack align={alignPos}>
          <Flex align={"end"} gap={"0.5rem"} flexDirection={justifyDir}>
            <DisplayDate
              innerProps={{ fontSize: "xs", color: "gray" }}
              date={sendDate}
              hours12
              locale={locale}
            />
            <Text fontWeight={"bold"}>{name}</Text>
          </Flex>
          {messageContent && (
            <Text
              w="fit-content"
              py="0.25rem"
              px="0.5rem"
              color={msgTextColor}
              bgColor={msgBgColor}
              borderRadius={msgRadius}
            >
              {messageContent}
            </Text>
          )}
          {Array.isArray(messageAttachments) &&
            messageAttachments.map((attachment, i) => (
              <Box
                py="0.25rem"
                px="0.5rem"
                maxW={"min(100%,20rem)"}
                bgColor={msgBgColor}
                borderRadius={msgRadius}
                key={i}
              >
                <ChatMessageAttachment attachment={attachment} />
              </Box>
            ))}
        </VStack>
        <Avatar name={username} size={"md"} photoSrc={userPhoto} />
      </Flex>
    </Flex>
  );
};
