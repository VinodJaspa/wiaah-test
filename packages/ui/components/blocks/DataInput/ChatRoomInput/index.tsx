import {
  Box,
  Divider,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";
import { BiMicrophone, BiClipboard, BiSend, BiPaperclip } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { IoSend } from "react-icons/io5";
import { IconList } from "types";
import { FiSend } from "react-icons/fi";

export interface ChatRoomInputProps {}

const inputIcons: IconList = [
  {
    iconLabel: {
      translationKey: "record_a_voice_message",
      fallbackText: "record a voice message",
    },
    icon: BiMicrophone,
    size: "0.8em",
  },
  {
    iconLabel: {
      translationKey: "record_a_voice_message",
      fallbackText: "record a voice message",
    },
    icon: BiPaperclip,
    size: "0.8em",
  },
  {
    iconLabel: {
      translationKey: "send_message",
      fallbackText: "send message",
    },
    icon: FiSend,
    size: "1.2em",
    fillColor: "primary.main",
  },
];

export const ChatRoomInput: React.FC<ChatRoomInputProps> = () => {
  const [msg, setMsg] = React.useState<string>("");
  const { t } = useTranslation();
  return (
    <Box px="2rem" py="1rem">
      <InputGroup>
        <InputRightElement w="6rem">
          <Flex w="100%" px="0.5rem" gap="0.5rem">
            {inputIcons.map((icon, i) => (
              <Flex gap="0.5rem">
                {i === inputIcons.length - 1 && (
                  <Divider borderColor={"gray"} orientation="vertical" />
                )}
                <IconButton
                  color={icon.fillColor ? icon.fillColor : "gray"}
                  variant={"icon"}
                  fontSize={icon.size}
                  bgColor="transparent"
                  aria-label={t(
                    icon.iconLabel.translationKey,
                    icon.iconLabel.fallbackText
                  )}
                  icon={<Icon as={icon.icon} />}
                />
              </Flex>
            ))}
          </Flex>
        </InputRightElement>
        <Input
          value={msg}
          bgColor="lightGray"
          border={"none"}
          onChange={(e) => setMsg(e.target.value)}
          placeholder={t("your_messages", "Your messages")}
        />
      </InputGroup>
    </Box>
  );
};
