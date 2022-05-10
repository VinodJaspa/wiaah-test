import { Divider, Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { ChatMessageType } from "types";
import { ChatMessage } from "ui";
export interface ChatRoomContentProps {
  messages: ChatMessageType[];
}

export const ChatRoomContent: React.FC<ChatRoomContentProps> = ({
  messages,
}) => {
  const { t } = useTranslation();

  return (
    <Flex
      direction={"column"}
      h="100%"
      justify={"end"}
      className="thinScroll"
      overflowY={"scroll"}
      overflowX={"hidden"}
      bg="#fefefe"
      gap="1rem"
      w="100%"
      p="1rem"
    >
      <HStack>
        <Divider />
        <Text>{t("today", "Today")}</Text>
        <Divider />
      </HStack>
      {messages.map((msg, i) => (
        <ChatMessage messageData={msg} key={i} />
      ))}
    </Flex>
  );
};
