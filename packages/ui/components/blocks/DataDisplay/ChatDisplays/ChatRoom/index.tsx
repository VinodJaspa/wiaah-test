import React from "react";
import {
  ChatRoomHeader,
  ChatRoomContent,
  ChatRoomInput,
  SpinnerFallback,
  useGetChatRoomQuery,
  useGetChatRoomMessagesQuery,
  useSubscribeToMyRoomsUpdates,
} from "@UI";
import { ActiveStatus } from "@features/API";
export interface ChatRoomProps {
  roomId: string;
}

export const ChatRoom: React.FC<ChatRoomProps> = ({ roomId }) => {
  const { data, isLoading, isError } = useGetChatRoomQuery(roomId);

  const { data: messages } = useGetChatRoomMessagesQuery({
    roomId,
    pagination: {
      take: 10,
    },
  });

  useSubscribeToMyRoomsUpdates();

  return (
    <div className="flex justify-between h-full p-4 flex-col">
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        {data && (
          <>
            <ChatRoomHeader
              roomData={{
                roomId,
                onlineMembers: data.members.filter(
                  (v) => v.profile?.activeStatus === ActiveStatus.Active
                ).length,
                roomMembers: data.members.length,
                roomName: data.members.at(0)?.profile?.username || "",
                roomImage: data.members.at(0)?.profile?.photo || "",
              }}
            />
            <SpinnerFallback isLoading={isLoading} isError={isError}>
              {messages ? (
                <ChatRoomContent
                  messages={messages.pages
                    .reduce((acc, curr) => {
                      return [...acc, ...curr];
                    }, [])
                    .map((v) => ({
                      id: v.id,
                      sendDate: v.createdAt,
                      username: v.user.profile?.username || "",
                      userPhoto: v.user.profile?.photo || "",
                      messageAttachments: v.attachments,
                      messageContent: v.content,
                    }))}
                />
              ) : null}
            </SpinnerFallback>
            <ChatRoomInput />
          </>
        )}
      </SpinnerFallback>
    </div>
  );
};
