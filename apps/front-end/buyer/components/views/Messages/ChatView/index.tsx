import {
  Button,
  ChatMessagesSideBar,
  ChatRoom,
  ChatRoomDrawer,
  NewMessageModal,
  Text,
  VStack,
} from "ui";
import React from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { getParamFromAsPath } from "ui/components/helpers";
import { useResponsive } from "ui";

export const ChatView: React.FC = () => {
  const router = useRouter();
  const roomId = getParamFromAsPath(router.asPath, "roomId");
  const { t } = useTranslation();
  const { isMobile } = useResponsive();

  function handleRouteChatRoom(roomId: string) {
    router.push(router.pathname, { query: { roomId } }, { shallow: true });
  }

  function handleCloseChatRoom() {
    router.push(router.asPath.split("?")[0]);
  }

  return (
    <div className="flex flex-col md:flex-row gap-2 mx-auto sm:w-4/5 pb-4 h-full">
      {/* messages sidebar  */}
      <ChatMessagesSideBar
        onCardClick={handleRouteChatRoom}
        props={{
          style: {
            maxWidth: "30rem",
          },
        }}
      />
      {/* chatroom  */}
      {isMobile ? (
        <>
          <ChatRoomDrawer
            spaceBottom="2rem"
            roomId={roomId}
            isOpen={!!roomId}
            onClose={handleCloseChatRoom}
          />
        </>
      ) : roomId ? (
        <ChatRoom roomId={roomId} />
      ) : (
        <div className="flex justify-center items-center min-h-[15rem] shadow-md w-full h-full">
          <VStack>
            <Text className="font-semibold text-2xl">{t("Your Messages")}</Text>
            <Text className="text-center text-lg">
              {t("Dont miss a minute to talk to your contacts")}
            </Text>
            <Button>{t("Send Message")}</Button>
          </VStack>
        </div>
      )}

      <NewMessageModal />
    </div>
  );
};
