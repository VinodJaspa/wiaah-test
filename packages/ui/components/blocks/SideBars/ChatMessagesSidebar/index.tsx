import React from "react";
import { BiEdit } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import {
  ChatSearchInput,
  ChatUserCard,
  useNewMessage,
  ArrowLeftIcon,
  Button,
  EditIcon,
  Divider,
} from "@UI";
import { ChatUserData, HtmlDivProps } from "types";
import { useResponsive } from "@UI";
import { useRouting } from "routing";

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
        {userCards.map((cardData, i) => (
          <>
            <ChatUserCard
              onClick={() => onCardClick && onCardClick(cardData.id)}
              {...cardData}
              key={cardData.id + i}
            />
            {i !== userCards.length - 1 && <Divider />}
          </>
        ))}
      </div>
    </div>
  );
};

export const userCards: ChatUserData[] = [
  {
    id: "1",
    name: "wiaah",
    lastMsg:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, cupiditate placeat. Perferendis minus suscipit odit?",
    typing: true,
    profilePhoto: "/wiaah_logo.png",
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
    profilePhoto: "/wiaah_logo.png",
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
    profilePhoto: "/wiaah_logo.png",
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
