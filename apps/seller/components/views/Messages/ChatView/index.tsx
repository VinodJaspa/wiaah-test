import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ChatMessagesSideBar, ChatRoom, NewMessageModal } from "ui";
import React from "react";
import { ChatRoomHeaderData } from "types";
import { useRouter } from "next/router";
import { FiSend } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { getParamFromAsPath } from "ui/components/helpers";

const ChatRoomHeaderDataPlaceHolder: ChatRoomHeaderData = {
  onlineMembers: 5,
  roomId: "1456",
  roomImage: "/shop.jpeg",
  roomMembers: 12,
  roomName: "Wiaah",
};

export const ChatView: React.FC = () => {
  const router = useRouter();
  const roomId = getParamFromAsPath(router.asPath, "roomId");
  console.log(router, roomId);
  const { t } = useTranslation();
  function handleRouteChatRoom(roomId: string) {
    router.push(router.pathname, { query: { roomId } }, { shallow: true });
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
      {roomId ? (
        <ChatRoom
          roomHeaderData={ChatRoomHeaderDataPlaceHolder}
          style={{ w: "100%", shadow: "md" }}
          messages={[]}
        />
      ) : (
        <Center minH={"15rem"} shadow={"md"} w="100%" h="100%">
          <VStack>
            {/* <Flex
              justify={"center"}
              align="center"
              h="7rem"
              w="7rem"
              position={"relative"}
            >
              <Box
                position={"absolute"}
                borderWidth="0.25em"
                rounded={"full"}
                w="full"
                h="full"
                borderColor="black"
              />
              <Icon fontSize={"7xl"} pr="0.5rem" as={FiSend} />
            </Flex> */}
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
