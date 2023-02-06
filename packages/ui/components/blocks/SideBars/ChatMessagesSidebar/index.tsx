import React from "react";
import { useTranslation } from "react-i18next";
import {
  ChatSearchInput,
  ChatUserCard,
  useNewMessage,
  ArrowLeftIcon,
  Button,
  EditIcon,
  Divider,
  useGetMyChatRoomsQuery,
} from "@UI";
import { ChatUserData, HtmlDivProps } from "types";
import { useResponsive } from "@UI";
import { useRouting } from "routing";
import { mapArray } from "utils";
import { ActiveStatus } from "@features/API";

export interface ChatMessagesSideBarProps {
  props: HtmlDivProps;
  onCardClick?: (cardId: string) => any;
}

export const ChatMessagesSideBar: React.FC<ChatMessagesSideBarProps> = ({
  props: { className, ...rest },
  onCardClick,
}) => {
  const { t } = useTranslation();
  const { visit } = useRouting();
  const { openModal } = useNewMessage();
  const { isMobile } = useResponsive();

  function handleSendHome() {
    visit((r) => r.addPath("/"));
  }

  const { data: rooms } = useGetMyChatRoomsQuery();

  return (
    <div className={`${className} flex flex-col gap-4 shadow w-full`} {...rest}>
      <div className="flex items-center gap-2 font-bold text-3xl w-full justify-between px-2">
        <div className="flex items-center gap-2">
          <ArrowLeftIcon
            className="cursor-pointer text-3xl text-black"
            onClick={handleSendHome}
          />
          <p>{t("Messages")}</p>
        </div>
        <Button aria-label={t("new message")} onClick={openModal}>
          <EditIcon className="text-[0.8em] text-white " />
        </Button>
      </div>
      <ChatSearchInput className="px-2" />
      <div className="noScroll flex flex-col overflow-scroll">
        {mapArray(rooms, (v, i) => {
          const member = v.members.at(0);
          return (
            <>
              <ChatUserCard
                onClick={() => onCardClick && onCardClick(v.id)}
                id={v.id}
                name={member?.profile?.username || ""}
                profilePhoto={member?.profile?.photo || ""}
                status={
                  member?.profile?.activeStatus === ActiveStatus.Active
                    ? "online"
                    : member?.profile?.activeStatus === ActiveStatus.Idle
                    ? "idle"
                    : "offline"
                }
                unSeenMsgs={v.unSeenMessages}
                lastMsg={v.messages.at(0)?.content}
                key={v.id + i}
              />
              {i !== rooms?.length || (0 - 1 && <Divider />)}
            </>
          );
        })}
      </div>
    </div>
  );
};
