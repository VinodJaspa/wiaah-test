import { Flex } from "@chakra-ui/react";
import { ChatMessagesSideBar, ChatRoom } from "ui";
import React from "react";

export const ChatView: React.FC = () => {
  return (
    <Flex>
      {/* messages sidebar  */}
      <ChatMessagesSideBar style={{ w: "30rem" }} />
      {/* chatroom  */}
      <ChatRoom messages={[]} />
    </Flex>
  );
};
