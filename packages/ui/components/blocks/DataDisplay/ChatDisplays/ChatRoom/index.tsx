import React from "react";
import {
  ChatRoomHeader,
  ChatRoomContent,
  ChatRoomInput,
  SpinnerFallback,
  useGetChatRoomQuery,
  useGetChatRoomMessagesQuery,
  useSubscribeToMyRoomsUpdates,
  useUserData,
  useSocialControls,
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

  const { user } = useUserData();

  const member = data
    ? data.members.filter((v) => v.id !== user?.id).at(0)
    : null;

  const { closeChat } = useSocialControls();

  return (
    <div className="flex justify-between h-full p-2 pt-4 flex-col">
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        {data && (
          <>
            <ChatRoomHeader
              onCloseRoom={() => closeChat()}
              data={{
                activeStatus:
                  member?.profile?.activeStatus || ActiveStatus.InActive,
                lastActive: member?.profile?.lastActive,
                id: data.id,
                name: member?.profile?.username || "",
                thumbnail: member?.profile?.photo || "",
                userId: member?.id || "",
                verified: member?.profile?.verified || false,
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
                      userId: v.user.id,
                      sendDate: v.createdAt,
                      username: v.user.profile?.username || "",
                      userPhoto: v.user.profile?.photo || "",
                      messageAttachments: v.attachments,
                      messageContent: v.content,
                    }))}
                />
              ) : null}
            </SpinnerFallback>
            <div className="px-2">
              <ChatRoomInput roomId={roomId} />
            </div>
          </>
        )}
      </SpinnerFallback>
    </div>
  );
};
