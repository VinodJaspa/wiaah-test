import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  ChatMessagesSideBar,
  ChatRoom,
  ChatRoomDrawer,
  NewMessageModal,
} from "ui";
import React from "react";
import { ChatRoomHeaderData } from "types";
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
    <Flex
      direction={{ base: "column", md: "row" }}
      gap="0.5rem"
      mx="auto"
      w={{ sm: "80%" }}
      pb="1rem"
      h="100%"
    >
      {/* messages sidebar  */}
      <ChatMessagesSideBar
        onCardClick={handleRouteChatRoom}
        style={{ maxW: "30rem" }}
      />
      {/* chatroom  */}
      {isMobile ? (
        <>
          <ChatRoomDrawer
            roomId={roomId}
            isOpen={!!roomId}
            onClose={handleCloseChatRoom}
          />
        </>
      ) : roomId ? (
        <ChatRoom roomId={roomId} innerProps={{ w: "100%", shadow: "md" }} />
      ) : (
        <Center minH={"15rem"} shadow={"md"} w="100%" h="100%">
          <VStack>
            <Text fontWeight={"semibold"} fontSize="1.5em">
              {t("your_messages", "Your Messages")}
            </Text>
            <Text textAlign={"center"} fontSize={"lg"}>
              {t(
                "default_chat_subHeader",
                "Dont miss a minute to talk to your contacts"
              )}
            </Text>
            <Button>{t("send_message", "Send Message")}</Button>
          </VStack>
        </Center>
      )}

      <NewMessageModal />
    </Flex>
  );
};
