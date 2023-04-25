import React from "react";
import {
  Divider,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  HStack,
  CameraFillIcon,
  useNewMessage,
  SmilingFaceEmoji,
  MicrophoneFillIcon,
  PaperPlaneIcon,
  SmilingFaceFillEmoji,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  emojiUnicodeList,
  convertEmojiToHtml,
} from "@UI";
import { BiMicrophone, BiPaperclip } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { IconList } from "types";
import { FiSend } from "react-icons/fi";
import { mapArray, useForm } from "@UI/../utils/src";

export interface ChatRoomInputProps {
  roomId: string;
}

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

export const ChatRoomInput: React.FC<ChatRoomInputProps> = ({ roomId }) => {
  const { form, inputProps, handleChange } = useForm<{}>({});

  const [msg, setMsg] = React.useState<string>("");
  const { t } = useTranslation();

  return (
    <HStack className="text-xl gap-4 text-primary">
      <CameraFillIcon className="min-w-fit" />
      <Input
        placeholder={t("Type message") + "....."}
        className="placeholder:text-sm border-none placeholder:-translate-y-1"
      />
      <Menu>
        <MenuButton>
          <SmilingFaceFillEmoji className="min-w-fit" />
        </MenuButton>
        <MenuList
          className="-translate-y-[100%] max-h-48 overflow-y-scroll thinScroll w-72 "
          origin="bottom right"
        >
          <div className="grid grid-cols-5">
            {mapArray(emojiUnicodeList["Smileys & People"], (v, i) => (
              <span
                // &#x1F44D;
                className="text-xs"
                dangerouslySetInnerHTML={{
                  __html: "",
                }}
              ></span>
            ))}
          </div>
        </MenuList>
      </Menu>
      <MicrophoneFillIcon className="min-w-fit" />
      <PaperPlaneIcon className="min-w-fit" />
    </HStack>
  );
};
