import { BiChevronLeft } from "react-icons/bi";
import React from "react";
import { useTranslation } from "react-i18next";
import { BiPhone, BiVideo } from "react-icons/bi";
import { HiDotsHorizontal } from "react-icons/hi";
import { ChatRoomHeaderData, IconList } from "types";
import { useResponsive, Avatar } from "ui";
import { useRouter } from "next/router";
import { Icon, IconButton } from "@chakra-ui/react";
export interface ChatRoomHeaderProps {
  roomData: ChatRoomHeaderData;
  onCloseRoom?: () => any;
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

export const ChatRoomHeader: React.FC<ChatRoomHeaderProps> = ({
  roomData,
  onCloseRoom,
}) => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();
  const router = useRouter();
  function handleCloseRoom() {
    router.push(router.asPath.split("?")[0]);
  }
  return (
    <div className="flex items-center gap-2 p-2 border-t-2 border-gray-200 justify-between">
      <div className="flex items-center gap-2">
        {isMobile && (
          <BiChevronLeft
            className="cursor-pointer text-6xl text-black"
            onClick={handleCloseRoom}
          />
        )}
        {!isMobile && (
          <Avatar name={roomData.roomName} src={roomData.roomImage} />
        )}
        <div className="flex flex-col justify-between">
          <span className="text-xl font-bold">{roomData.roomName}</span>
          {!isMobile && (
            <div className="flex items-center gap-2 text-base text-gray-500">
              <span>
                {roomData.roomMembers} {t("member", "member")},
              </span>

              <span>
                {roomData.onlineMembers} {t("online", "online")}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {rightIcons.map(
          (icon, i) => icon.icon({})
          // <IconButton
          //   key={i}
          //   aria-label={t(
          //     icon.iconLabel.translationKey,
          //     icon.iconLabel.fallbackText
          //   )}
          //   icon={<Icon as={icon.icon} />}
          //   colorScheme={"gray"}
          //   h="1.5em"
          //   w="1.5em"
          //   variant="icon"
          //   color="gray"
          // />
        )}
      </div>
    </div>
  );
};
