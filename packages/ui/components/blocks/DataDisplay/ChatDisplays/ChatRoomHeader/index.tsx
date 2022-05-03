import {
  Avatar,
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { BiCamera, BiPhone, BiVideo } from "react-icons/bi";
import { HiDotsHorizontal } from "react-icons/hi";
import { ChatRoomHeaderData, IconList } from "types";
export interface ChatRoomHeaderProps {
  roomData: ChatRoomHeaderData;
}

const rightIcons: IconList = [
  {
    iconLabel: {
      fallbackText: "start a video call",
      translationKey: "start_a_video_call",
    },
    icon: BiVideo,
  },
  {
    iconLabel: {
      fallbackText: "start a voice call",
      translationKey: "start_a_voice_call",
    },
    icon: BiPhone,
  },
  {
    iconLabel: {
      fallbackText: "more options",
      translationKey: "more_options",
    },
    icon: HiDotsHorizontal,
  },
];

export const ChatRoomHeader: React.FC<ChatRoomHeaderProps> = ({ roomData }) => {
  const { t } = useTranslation();
  return (
    <HStack
      px="1rem"
      py="0.5rem"
      borderTopWidth={"1px"}
      borderColor="lightGray"
      justify={"space-between"}
    >
      <HStack>
        <Avatar size="md" name={roomData.roomName} src={roomData.roomImage} />
        <Flex direction={"column"} justify={"space-between"}>
          <Text fontSize={"lg"} fontWeight="bold">
            {roomData.roomName}
          </Text>
          <HStack fontSize={"sm"} color="gray">
            <Text>
              {roomData.roomMembers} {t("member", "member")},
            </Text>

            <Text>
              {roomData.onlineMembers} {t("online", "online")}
            </Text>
          </HStack>
        </Flex>
      </HStack>
      <HStack>
        {rightIcons.map((icon, i) => (
          <IconButton
            key={i}
            aria-label={t(
              icon.iconLabel.translationKey,
              icon.iconLabel.fallbackText
            )}
            icon={<Icon as={icon.icon} />}
            colorScheme={"gray"}
            h="1.5em"
            w="1.5em"
            variant="icon"
            color="gray"
          />
        ))}
      </HStack>
    </HStack>
  );
};
