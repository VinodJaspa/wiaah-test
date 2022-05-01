import {
  Box,
  Divider,
  Flex,
  FlexProps,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { BiEdit } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { SearchInput, StackWithTitle, ChatUserCard } from "ui";
import { BsPinAngleFill } from "react-icons/bs";
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
    profilePhoto: "/wiaah_logo.png",
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
    profilePhoto: "/wiaah_logo.png",
    status: "online",
    lastMsgSentTime: new Date().toLocaleString(),
    unSeenMsgs: 0,
  },
];

export interface ChatMessagesSideBarProps {
  style?: FlexProps;
}

export const ChatMessagesSideBar: React.FC<ChatMessagesSideBarProps> = ({
  style,
}) => {
  const { t } = useTranslation();

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
        <Icon
          color="primary.main"
          fontSize={"0.8em"}
          cursor="pointer"
          as={BiEdit}
        />
      </HStack>
      <SearchInput style={{ px: "1rem" }} />
      <StackWithTitle
        titleStyle={{
          px: "1rem",
        }}
        titleIcon={BsPinAngleFill}
        title={{ fallbackText: "pinned", translationKey: "pinned" }}
      >
        {userCards.map((cardData, i) => (
          <>
            <ChatUserCard {...cardData} key={cardData.id} />
            {i !== userCards.length - 1 && <Divider my="0px" />}
          </>
        ))}
      </StackWithTitle>
    </Flex>
  );
};
