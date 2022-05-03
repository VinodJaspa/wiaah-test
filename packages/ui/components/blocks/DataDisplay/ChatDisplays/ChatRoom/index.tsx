import { Flex, FlexProps } from "@chakra-ui/react";
import React from "react";
import { ChatMessageType } from "types";
import { ChatRoomHeader, ChatRoomContent, ChatRoomInput } from "ui";
import { ChatRoomHeaderData } from "types";
export interface ChatRoomProps {
  messages: ChatMessageType[];
  roomHeaderData: ChatRoomHeaderData;
  style: FlexProps;
}

export const ChatRoom: React.FC<ChatRoomProps> = ({
  messages,
  roomHeaderData,
  style,
}) => {
  return (
    <Flex {...style} justify="space-between" direction={"column"}>
      <ChatRoomHeader roomData={roomHeaderData} />
      <ChatRoomContent />
      <ChatRoomInput />
    </Flex>
  );
};
