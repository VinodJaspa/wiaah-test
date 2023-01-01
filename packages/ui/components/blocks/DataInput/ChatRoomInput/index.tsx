import React from "react";
import { Divider, Button, Input, InputGroup, InputRightElement } from "@UI";
import { BiMicrophone, BiPaperclip } from "react-icons/bi";
import { useTranslation } from "react-i18next";
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
    <div className="px-8 py-4">
      <InputGroup>
        <InputRightElement>
          <div className="flex w-full px-2 gap-2">
            {inputIcons.map((icon, i) => (
              <div className="flex gap-2">
                {i === inputIcons.length - 1 && (
                  <Divider className="h-full border-l-[1px]" />
                )}
                <Button
                  colorScheme="white"
                  style={{
                    fill: icon.fillColor ? icon.fillColor : "gray",
                  }}
                >
                  {icon.icon({})}
                </Button>
              </div>
            ))}
          </div>
        </InputRightElement>
        <Input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder={t("your_messages", "Your messages")}
        />
      </InputGroup>
    </div>
  );
};
