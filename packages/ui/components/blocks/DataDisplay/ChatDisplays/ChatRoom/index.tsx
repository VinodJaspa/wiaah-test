import { Flex, FlexProps } from "@chakra-ui/react";
import React from "react";
import { ChatMessage } from "types";
import { ChatRoomHeader } from "ui";

export interface ChatRoomProps {
  messages: ChatMessage[];
  style: FlexProps;
}

export const ChatRoom: React.FC<ChatRoomProps> = ({ messages, style }) => {
  return (
    <Flex {...style} direction={"column"}>
      <ChatRoomHeader />
    </Flex>
  );
};
