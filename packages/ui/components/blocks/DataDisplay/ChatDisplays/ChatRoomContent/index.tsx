import { Box, Divider, Flex, HStack, Text } from "@chakra-ui/react";
import { t } from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";
import { ChatMessageType } from "types";
import { ChatMessage } from "ui";
const messages: ChatMessageType[] = [
  {
    id: "159",
    sendDate: Date.now(),
    username: "Wiaah",
    messageAttachments: [
      {
        src: "/shop-2.jpeg",
        type: "image",
      },
    ],
    messageContent:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis omnis voluptatem perferendis fuga cupiditate odit maiores sed nostrum. Deleniti earum tempora nisi eaque praesentium repellat quod sapiente molestiae quidem ullam.",
    userPhoto: "/wiaah_logo.png",
  },
  {
    id: "465",
    sendDate: Date.now(),
    username: "Wiaah",
    messageAttachments: [
      {
        src: "/video.mp4",
        type: "audio",
      },
    ],
    messageContent: "hi",
    userPhoto: "/wiaah_logo.png",
  },
  {
    id: "123",
    sendDate: Date.now(),
    username: "Wiaah",
    messageAttachments: [],
    messageContent: "hi, how are you?",
    userPhoto: "/shop.jpeg",
  },
  {
    id: "465",
    sendDate: Date.now(),
    username: "Wiaah",
    messageAttachments: [
      {
        src: "/video.mp4",
        type: "audio",
      },
    ],
    messageContent: "fine, how about you",
    userPhoto: "/wiaah_logo.png",
  },
  {
    id: "123",
    sendDate: Date.now(),
    username: "Wiaah",
    messageAttachments: [],
    messageContent: "all good",
    userPhoto: "/shop.jpeg",
  },
];

export interface ChatRoomContentProps {}

export const ChatRoomContent: React.FC<ChatRoomContentProps> = () => {
  const { t } = useTranslation();

  return (
    <Flex
      direction={"column"}
      h="100%"
      justify={"end"}
      className="thinScroll"
      overflowY={"scroll"}
      overflowX="hidden"
      bg="#fefefe"
      gap="1rem"
      w="100%"
      p="1rem"
    >
      <HStack>
        <Divider />
        <Text>{t("today", "Today")}</Text>
        <Divider />
      </HStack>
      {messages.map((msg, i) => (
        <ChatMessage messageData={msg} key={i} />
      ))}
    </Flex>
  );
};
