import {
  Divider,
  Flex,
  FlexProps,
  HStack,
  Icon,
  Text,
  IconButton,
} from "@chakra-ui/react";
import React from "react";
import { BiEdit } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { ChatSearchInput, ChatUserCard, useNewMessage } from "ui";
import { ChatUserData } from "types";

const userCards: ChatUserData[] = [
  {
    id: "1",
    name: "wiaah",
    lastMsg:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, cupiditate placeat. Perferendis minus suscipit odit?",
    typing: true,
    profilePhoto: "/wiaah_logo.pngs",
    status: "online",
    lastMsgSentTime: new Date().toLocaleString(),
    unSeenMsgs: 0,
  },
  {
    id: "2",
    name: "wiaah",
    lastMsg:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, cupiditate placeat. Perferendis minus suscipit odit?",

    typing: false,
    profilePhoto: "./wiaah_logo.png",
    status: "offline",
    lastMsgSentTime: new Date().toLocaleString(),
    unSeenMsgs: 3,
  },
  {
    id: "3",
    name: "wiaah",
    lastMsg:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, cupiditate placeat. Perferendis minus suscipit odit?",

    typing: false,
    profilePhoto: "/shop-3.jpeg",
    status: "idle",
    lastMsgSentTime: new Date().toLocaleString(),
    unSeenMsgs: 5,
  },
  {
    id: "4",
    name: "wiaah",
    lastMsg:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, cupiditate placeat. Perferendis minus suscipit odit?",

    typing: true,
    profilePhoto: "/shop-2.jpeg",
    status: "online",
    lastMsgSentTime: new Date().toLocaleString(),
    unSeenMsgs: 0,
  },
  {
    id: "1",
    name: "wiaah",
    lastMsg:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, cupiditate placeat. Perferendis minus suscipit odit?",
    typing: true,
    profilePhoto: "/wiaah_logo.pngs",
    status: "online",
    lastMsgSentTime: new Date().toLocaleString(),
    unSeenMsgs: 0,
  },
  {
    id: "2",
    name: "wiaah",
    lastMsg:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, cupiditate placeat. Perferendis minus suscipit odit?",

    typing: false,
    profilePhoto: "./wiaah_logo.png",
    status: "offline",
    lastMsgSentTime: new Date().toLocaleString(),
    unSeenMsgs: 3,
  },
  {
    id: "3",
    name: "wiaah",
    lastMsg:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, cupiditate placeat. Perferendis minus suscipit odit?",

    typing: false,
    profilePhoto: "/shop-3.jpeg",
    status: "idle",
    lastMsgSentTime: new Date().toLocaleString(),
    unSeenMsgs: 5,
  },
  {
    id: "4",
    name: "wiaah",
    lastMsg:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, cupiditate placeat. Perferendis minus suscipit odit?",

    typing: true,
    profilePhoto: "/shop-2.jpeg",
    status: "online",
    lastMsgSentTime: new Date().toLocaleString(),
    unSeenMsgs: 0,
  },
  {
    id: "1",
    name: "wiaah",
    lastMsg:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, cupiditate placeat. Perferendis minus suscipit odit?",
    typing: true,
    profilePhoto: "/wiaah_logo.pngs",
    status: "online",
    lastMsgSentTime: new Date().toLocaleString(),
    unSeenMsgs: 0,
  },
  {
    id: "2",
    name: "wiaah",
    lastMsg:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, cupiditate placeat. Perferendis minus suscipit odit?",

    typing: false,
    profilePhoto: "./wiaah_logo.png",
    status: "offline",
    lastMsgSentTime: new Date().toLocaleString(),
    unSeenMsgs: 3,
  },
  {
    id: "3",
    name: "wiaah",
    lastMsg:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, cupiditate placeat. Perferendis minus suscipit odit?",

    typing: false,
    profilePhoto: "/shop-3.jpeg",
    status: "idle",
    lastMsgSentTime: new Date().toLocaleString(),
    unSeenMsgs: 5,
  },
  {
    id: "4",
    name: "wiaah",
    lastMsg:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, cupiditate placeat. Perferendis minus suscipit odit?",

    typing: true,
    profilePhoto: "/shop-2.jpeg",
    status: "online",
    lastMsgSentTime: new Date().toLocaleString(),
    unSeenMsgs: 0,
  },
];

export interface ChatMessagesSideBarProps {
  style?: FlexProps;
  onCardClick?: (cardId: string) => any;
}

export const ChatMessagesSideBar: React.FC<ChatMessagesSideBarProps> = ({
  style,
  onCardClick,
}) => {
  const { t } = useTranslation();
  const { openModal } = useNewMessage();
  return (
    <Flex direction={"column"} gap="1rem" shadow="md" w="100%" {...style}>
      <HStack
        fontWeight={"bold"}
        fontSize={"xx-large"}
        w="100%"
        justify={"space-between"}
        px="1rem"
      >
        <Text>{t("Messages", "Messages")}</Text>
        <IconButton
          aria-label={t("new_message", "new message")}
          color="primary.main"
          fontSize={"0.8em"}
          cursor="pointer"
          variant={"icon"}
          as={BiEdit}
          onClick={openModal}
        />
      </HStack>
      <ChatSearchInput innerProps={{ px: "1rem" }} />
      {/* <SearchInput style={{ px: "1rem" }} /> */}
      <Flex overflow={"scroll"} className="thinScroll" direction={"column"}>
        {userCards.map((cardData, i) => (
          <>
            <ChatUserCard
              innerProps={{
                onClick: () => onCardClick && onCardClick(cardData.id),
              }}
              {...cardData}
              key={cardData.id}
            />
            {i !== userCards.length - 1 && <Divider my="0px" />}
          </>
        ))}
      </Flex>
    </Flex>
  );
};
