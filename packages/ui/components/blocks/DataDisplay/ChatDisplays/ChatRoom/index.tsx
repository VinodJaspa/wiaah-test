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
}

export const ChatRoom: React.FC<ChatRoomProps> = ({ roomId }) => {
  const { data, isLoading, isError } = useGetChatRoomData(roomId);
  return (
    <div className="flex justify-between h-full p-4 flex-col">
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        {data && (
          <>
            <ChatRoomHeader roomData={data.roomHeaderData} />
            <ChatRoomContent messages={data.roomMessages} />
            <ChatRoomInput />
          </>
        )}
      </SpinnerFallback>
    </div>
  );
};
