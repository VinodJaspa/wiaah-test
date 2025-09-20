import ChatMessagesSection from "@blocks/SideBars/ChatMessagesSidebar";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  Button,

  ChatRoom,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  NewMessageModal,
  Text,
  VStack,
  useGetChatRoomQuery,
  useResponsive,
  useUserData,
} from "ui";

export const ChatView: React.FC = () => {
  const { visit, getParam, getCurrentPath, getQuery } = useRouting();
  const roomId = getParam("roomId");
const { t } = useTranslation();
  const { isMobile } = useResponsive();

  function handleRouteChatRoom(roomId: string) {
    visit((r) => r.addQuery({ roomId }));
  }

  function handleCloseChatRoom() {}

  const { data } = useGetChatRoomQuery(roomId);
  const { user } = useUserData();

  return (
    <div className="w-full">
      {/* messages sidebar  */}
      <ChatMessagesSection
        // onCardClick={handleRouteChatRoom}
        // props={{ className: "max-w-[30rem]" }}
      />
      {/* chatroom  */}
      {/* {isMobile ? (
        <>
          <Drawer
            spaceBottom="2.5rem"
            onClose={() => handleCloseChatRoom()}
            onOpen={() => {}}
            isOpen={!!roomId}
            full
            position="bottom"
          >
            <DrawerOverlay />
            <DrawerContent>
              <ChatRoom roomId={roomId} />
            </DrawerContent>
          </Drawer>
        </>
      ) : roomId ? (
        <>
          <ChatRoom roomId={roomId} />
        </>
      ) : (
        <div className="flex justify-center items-center min-h-[15rem] shadow-md w-full h-full">
          <VStack>
            <Text className="font-semibold text-2xl">{t("Your Messages")}</Text>
            <Text className="text-center text-lg">
              {t(
                "default_chat_subHeader",
                "Dont miss a minute to talk to your contacts",
              )}
            </Text>
            <Button>{t("Send Message")}</Button>
          </VStack>
        </div>
      )} */}

      <NewMessageModal />
    </div>
  );
};
