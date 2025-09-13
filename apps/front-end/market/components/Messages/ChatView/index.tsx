import ChatMessagesSection from "@blocks/SideBars/ChatMessagesSidebar";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  Button,

  ChatRoom,
  Container,
  Divider,
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

  function handleCloseChatRoom() { }

  const { data } = useGetChatRoomQuery(roomId);
  const { user } = useUserData();

  return (
    <Container className="py-10">

      {/* messages sidebar  */}
      <ChatMessagesSection/>
      <NewMessageModal />
    </Container>
  );
};
