import { Flex, FlexProps } from "@chakra-ui/react";
import React from "react";
import {
  ChatRoomHeader,
  ChatRoomContent,
  ChatRoomInput,
  useGetChatRoomData,
  SpinnerFallback,
} from "ui";
export interface ChatRoomProps {
  roomId: string;
  innerProps?: FlexProps;
}

export const ChatRoom: React.FC<ChatRoomProps> = ({ innerProps, roomId }) => {
  const { data, isLoading, isError } = useGetChatRoomData(roomId);
  return (
    //@ts-ignore
    <Flex {...innerProps} justify="space-between" h="100%" direction={"column"}>
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        {data && (
          <>
            <ChatRoomHeader roomData={data.roomHeaderData} />
            <ChatRoomContent messages={data.roomMessages} />
            <ChatRoomInput />
          </>
        )}
      </SpinnerFallback>
    </Flex>
  );
};
