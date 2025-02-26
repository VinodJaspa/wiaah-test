import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { HtmlDivProps } from "types";
import { isDate, mapArray } from "utils";
import { useResponsive } from "../../../../src/Hooks";
import {
  ChatUserActiveStatusIndicator,
  ChatUserCard,
} from "../../../blocks/DataDisplay";
import { ChatSearchInput } from "../../../blocks/DataInput";
import { useSocialControls } from "../../../blocks/Layout";
import { usePaginationControls } from "../../../blocks/Navigating";
import { ActiveStatus } from "../../../features/API";
import { useUserProfile } from "../../../features/Auth";
import { useGetMyChatRoomsQuery } from "../../../features/Chat";
import { useGetRecentStories } from "../../../features/Social";
import {
  ArrowLeftAlt1Icon,
  ArrowLeftIcon,
  Avatar,
  Button,
  CheckmarkCircleFillIcon,
  Divider,
  EditAltIcon,
  EditIcon,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  PlusIcon,
  ScrollPaginationWrapper,
  SearchIcon,
} from "../../../partials";

export interface ChatMessagesSideBarProps {
  props: HtmlDivProps;
  onCardClick?: (cardId: string) => any;
}

export const ChatMessagesSideBar: React.FC<ChatMessagesSideBarProps> = ({
  props: { className, ...rest },
  onCardClick,
}) => {
  const { t } = useTranslation();
  const { visit, back } = useRouting();
  const { chatWith, msgNewUser, viewUserStory, createAction } =
    useSocialControls();
  const { isMobile } = useResponsive();

  const { data } = useUserProfile();

  function handleSendHome() {
    visit((r) => r.addPath("/"));
  }

  const { controls, pagination } = usePaginationControls();
  const { data: stories } = useGetRecentStories({ pagination });

  const { data: rooms } = useGetMyChatRoomsQuery();

  const { data: profile } = useUserProfile();

  return isMobile ? (
    <div className="flex flex-col gap-4 p-4">
      <HStack className="justify-between">
        <HStack>
          <ArrowLeftAlt1Icon onClick={() => back()} className="m-2" />
          <p className="text-[1.375rem] font-semibold">
            {data?.username || t("My Chat")}
          </p>
        </HStack>
        <EditAltIcon className="text-primary text-2xl" />
      </HStack>
      <InputGroup className="border-0  bg-[#F6F6F6] rounded-lg">
        <InputLeftElement>
          <SearchIcon />
        </InputLeftElement>
        <Input className="bg-[#F6F6F6]" />
      </InputGroup>

      <div className="flex flex-col gap-3">
        <p className="text-lg font-semibold">{t("Friends stories")}</p>
        <ScrollPaginationWrapper axis="x" controls={controls}>
          <div className="flex items-start gap-2 w-full overflow-x-scroll noScroll">
            <ChatStory
              onClick={() => createAction({})}
              userId={profile?.ownerId || ""}
              name={profile?.username || t("Me")}
              newStory={true}
              photo={profile?.photo || ""}
              isLive={false}
            />
            {mapArray(stories, (v, i) => (
              <ChatStory
                onClick={() => viewUserStory(v.userId)}
                userId={v.userId}
                isLive={false}
                key={i}
                name={v?.user?.profile?.username || ""}
                newStory={v?.newStory}
                photo={v?.user?.profile?.photo || ""}
              />
            ))}
          </div>
        </ScrollPaginationWrapper>
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-lg font-semibold">{t("Messages")}</p>
        <ScrollPaginationWrapper controls={controls}>
          <div className="flex flex-col gap-4">
            {mapArray(rooms, (v, i) => {
              const member = v.members
                .filter((v) => v.profile?.ownerId !== profile?.ownerId)
                ?.at(0);

              const lastMsg = v.messages.at(0);
              const memberSeen = lastMsg?.seenBy.find(
                (v) => v.userId === member?.profile?.ownerId,
              );

              const date: string =
                v.unSeenMessages > 0
                  ? lastMsg?.createdAt
                  : !!memberSeen
                    ? memberSeen.seenAt
                    : lastMsg?.createdAt || "";

              const displayDate: boolean = isDate(date);

              return (
                <HStack
                  onClick={() => chatWith(v.id)}
                  key={i}
                  className="justify-between hover:bg-gray-100 bg-white cursor-pointer gap-4"
                >
                  <HStack className="gap-4">
                    <Avatar
                      className="min-w-[3.25rem] overflow-visible"
                      src={member?.profile?.photo}
                    >
                      <div className="absolute bottom-[0.125rem] border-2 border-white rounded-full right-[0.125rem] ">
                        <ChatUserActiveStatusIndicator
                          status={
                            member?.profile?.activeStatus ||
                            ActiveStatus.InActive
                          }
                        />
                      </div>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                      <p className="text-[1.063rem] font-semibold">
                        {member?.profile?.username}
                      </p>
                      <HStack
                        className={`text-[0.813rem] ${
                          v.unSeenMessages > 0 ? "font-bold" : ""
                        }`}
                      >
                        <p>
                          {v.unSeenMessages > 0
                            ? `${v.unSeenMessages} ${t("Unread messages")}`
                            : !!memberSeen
                              ? `${t("Message seen")}`
                              : lastMsg?.userId === profile?.ownerId
                                ? t("Message sent")
                                : null}
                        </p>
                        {displayDate ? (
                          <HStack className="gap-1">
                            <div className="h-2 w-2 rounded-full bg-black" />
                            <p>
                              {new Date(date).toLocaleTimeString("en-us", {
                                hour: "numeric",
                                hour12: true,
                                minute: "2-digit",
                              })}
                            </p>
                          </HStack>
                        ) : null}
                      </HStack>
                    </div>
                  </HStack>
                  {!!memberSeen ? (
                    <Avatar
                      className="min-w-[0.875rem]"
                      src={member?.profile?.photo}
                      name={member?.profile?.username}
                      alt={member?.profile?.username}
                    />
                  ) : (
                    <CheckmarkCircleFillIcon className="text-black" />
                  )}
                </HStack>
              );
            })}
          </div>
        </ScrollPaginationWrapper>
      </div>
    </div>
  ) : (
    <div className={`${className} flex flex-col gap-4 shadow w-full`} {...rest}>
      <div className="flex items-center gap-2 font-bold text-3xl w-full justify-between px-2">
        <div className="flex items-center gap-2">
          <ArrowLeftIcon
            className="cursor-pointer text-3xl text-black"
            onClick={handleSendHome}
          />
          <p>{t("Messages")}</p>
        </div>
        <Button aria-label={t("new message")} onClick={() => msgNewUser()}>
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

export const ChatStory: React.FC<{
  name: string;
  userId: string;
  photo: string;
  newStory: boolean;
  isLive: boolean;
  onClick: () => any;
}> = ({ name, newStory, photo, isLive, userId, onClick }) => {
  const { data } = useUserProfile();
  const { t } = useTranslation();
  return (
    <div
      onClick={() => onClick && onClick()}
      className="flex flex-col cursor-pointer w-[3.875rem] justify-center items-center gap-1"
    >
      <div
        className={`relative w-[3.375rem] h-[3.5rem] rounded-[1.375rem] ${
          newStory ? "bg-primary" : "bg-[#E7E7E7]"
        }`}
      >
        <div className="h-[3.25rem] w-[3.175rem] bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[1.25rem]" />
        <Image
          className="h-[3.125rem] object-cover w-12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[1.25rem]"
          src={photo}
          alt={name}
        />

        {data?.ownerId === userId ? (
          <div className="object-cover absolute bottom-0 left-1/2 -translate-x-1/2 text-[0.375rem] translate-y-1/2 text-white bg-black h-4 w-4 flex justify-center items-center border-2 border-white rounded-md">
            <PlusIcon />
          </div>
        ) : isLive ? (
          <div className="object-cover absolute bottom-0 left-1/2 -translate-x-1/2 px-1 translate-y-1/2 text-white bg-red-500 text-[0.5rem] border-2 border-white rounded-md">
            {t("LIVE")}
          </div>
        ) : null}
      </div>
      <p className="text-[0.813rem] text-center font-medium">{name || ""}</p>
    </div>
  );
};
